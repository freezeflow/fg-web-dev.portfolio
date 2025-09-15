import UptimeLog from "../models/uptime.model.js";
import LighthouseLog from "../models/lighthouse.scores.model.js";
import weeklyAggregateModel from "../models/weekly.aggregate.model.js";
import AppError from '../utils/app.error.class.js'
import { FRONTEND_URL } from "../config/config.js";
import lighthouse from 'lighthouse'
import { launch } from "chrome-launcher";

export default class aggregateClass{
    checkSite = async () => {
        const start = Date.now();

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const res = await fetch('http://localhost:8080/', {
            method: "GET",
            signal: controller.signal
            });

            clearTimeout(timeout);

            const responseTime = Date.now() - start;

            if (!res.ok) {
            // treat non-200 as "down"
            await UptimeLog.create({
                status: "down",
                responseTime
            });
            return;
            }

            await UptimeLog.create({
            status: "up",
            responseTime
            });

        } catch (err) {
            const responseTime = Date.now() - start;

            await UptimeLog.create({
            status: "down",
            responseTime
            });
        }
    }

    runWeeklyLighthouseAudit = async () => {
        // Launch headless Chrome
        const chrome = await launch({ chromeFlags: ['--headless'] });

        try {
            const options = {
            logLevel: 'info',
            output: 'json',
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
            port: chrome.port,
            };

            const runnerResult = await lighthouse(FRONTEND_URL, options);

            const reportJson = JSON.parse(runnerResult.report);

            // Extract scores (0-100)
            const scores = {
            performance: reportJson.categories.performance.score * 100,
            accessibility: reportJson.categories.accessibility.score * 100,
            bestPractices: reportJson.categories['best-practices'].score * 100,
            seo: reportJson.categories.seo.score * 100,
            };

            // Save to MongoDB
            await LighthouseLog.create({
                scores: scores
            });

            console.log('✅ Lighthouse audit saved:', scores);

        } catch (err) {
            console.error('❌ Lighthouse audit failed:', err);
        } finally {
            chrome.kill();
        }
    }

    aggregateUptime = async (weekStart, weekEnd) => {
        try {
            const result = await UptimeLog.aggregate([
                { $match: { createdAt: { $gte: weekStart, $lte: weekEnd } } },
                {
                    $group: {
                        _id: { weekday: { $dayOfWeek: "$createdAt" } },
                        avgUptime: {
                        $avg: { $cond: [{ $eq: ["$status", "up"] }, 100, 0] }
                        }
                    }
                }
            ]);

            // Map MongoDB weekdays (1=Sunday…7=Saturday) to labels
            const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
            const uptime = {};
            days.forEach(d => uptime[d] = null);

            result.forEach(r => {
                const day = days[r._id.weekday - 1];
                uptime[day] = r.avgUptime;
            });

            return uptime;
        } catch (error) {
            throw error
        }
        
    }

    aggregateLighthouseScore = async (weekStart, weekEnd) => {
        try {
            const result = await LighthouseLog.aggregate([
                { $match: {createdAt: {$gte: weekStart, $lte: weekEnd}}},
                {
                    $group: {
                        _id: {weekday: { $dayOfWeek: "$createdAt" }},
                        performance: {$avg: "$scores.performance"},
                        accessibility: {$avg: "$scores.accessibility"},
                        seo: { $avg: "$scores.seo" },
                        bestPractices: { $avg: "$scores.bestPractices" }
                    }
                }
            ])

            const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
            const lighthouse = {};
            days.forEach(d => lighthouse[d] = {
                performance: null,
                accessibility: null,
                seo: null,
                bestPractices: null
            });

            result.forEach(r => {
                const day = days[r._id.weekday - 1];
                lighthouse[day] = {
                performance: r.performance,
                accessibility: r.accessibility,
                seo: r.seo,
                bestPractices: r.bestPractices
                };
            });

            return lighthouse;
        } catch (error) {
            throw error
        }
        
    }

    createWeeklyLog = async (weekStart, weekEnd, uptime, lighthouse) =>{
        try {
            const result = await weeklyAggregateModel.create({
                weekStart,
                weekEnd,
                uptime,
                lighthouse
            });

            if(!result) throw new AppError({message: 'Something went wrong', status: 500})
            
            return result
        } catch (error) {
            throw error
        }
    }

    getWeeklyLogs = async (weekStart, weekEnd) => {
        try {
            const result = await weeklyAggregateModel.aggregate([
                { $match: {createdAt: {$gte: weekStart, $lte: weekEnd}}}
            ]);

            if(!result) throw AppError({message: 'No metrics found', status: 404})

            return result
        } catch (error) {
            throw error
        }
    }
}
