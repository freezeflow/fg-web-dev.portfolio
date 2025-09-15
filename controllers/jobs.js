import AggregateService from "../services/weekly.aggregate.services.js";
import { DB_URI } from '../config/config.js';
import Agenda from 'agenda';

const aggregateService = new AggregateService();

const agenda = new Agenda({ db: { address: DB_URI } });

// --- Weekly summary job ---
agenda.define("weekly summary", async (job) => {
  const now = new Date();
  const weekStart = new Date();
  weekStart.setDate(now.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0); // start of week
  const weekEnd = new Date();
  weekEnd.setHours(23, 59, 59, 999); // end of week

  console.log(`Generating weekly aggregate: ${weekStart} - ${weekEnd}`);

  try {
    // Run both aggregations in parallel
    const [uptime, lighthouse] = await Promise.all([
      aggregateService.aggregateUptime(weekStart, weekEnd),
      aggregateService.aggregateLighthouseScore(weekStart, weekEnd)
    ]);

    await aggregateService.createWeeklyLog(weekStart, weekEnd, uptime, lighthouse);

    console.log("✅ Weekly aggregate saved.");
  } catch (err) {
    console.error("❌ Weekly summary failed:", err);
  }
});

// --- Daily Lighthouse audit ---
agenda.define('daily lighthouse audit', async () => {
  try {
    console.log("Starting daily Lighthouse audit...");
    await aggregateService.runWeeklyLighthouseAudit();
    console.log("✅ Daily Lighthouse audit complete.");
  } catch (err) {
    console.error("❌ Lighthouse audit failed:", err);
  }
});

// --- Daily uptime check ---
agenda.define('uptime check', async () => {
  try {
    console.log("Running daily uptime check...");
    await aggregateService.checkSite();
    console.log("✅ Daily uptime check complete.");
  } catch (err) {
    console.error("❌ Uptime check failed:", err);
  }
});

// --- Start Agenda and schedule jobs ---
export async function startAgenda() {
  await agenda.start();

  // Weekly summary: every Sunday at midnight
  await agenda.every("0 0 * * 0", "weekly summary");

  // Daily Lighthouse audit: every day at 2 AM
  await agenda.every("0 2 * * *", "daily lighthouse audit");

  // Daily uptime check: every day at 00:10 AM
  await agenda.every("*/60 * * * *", "uptime check");
}

export default agenda;