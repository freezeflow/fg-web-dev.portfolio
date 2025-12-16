import Featured from "../models/featured.model.js";
import AppError from "../utils/app.error.class.js";
import { v2 as cloudinary } from "cloudinary";

export default class featuredServices {
    createFeatured = async (req) => {
        try {
            // Prevent more than 5 featured projects
            const count = await Featured.countDocuments();
            if (count >= 5) {
                throw new AppError({ message: "Maximum of 5 featured projects allowed", status: 400 });
            }

            const { title } = req.body;

            if (!title) {
                throw new AppError({ message: "Title is required", status: 400 });
            }

            // Create as draft with minimal fields
            const newFeatured = await Featured.create({
                title,
                status: "draft",
            });

            return newFeatured;

        } catch (error) {
            throw error;
        }
    };

    updateFeatured = async (req) => {
        try {
            const { id } = req.params;

            const {
                title,
                description,
                company,
                scope,
                link,
                challenges,
                solution,
                deliveredFeats,
                tags,
                status,
                feedback // expected object: { feedback: "" }
            } = req.body;

            const featured = await Featured.findById(id);
            if (!featured) {
                throw new AppError({ message: "Featured project not found", status: 404 });
            }

            // ------------------------------------------
            // BASIC FIELDS
            // ------------------------------------------
            if (title !== undefined) featured.title = title;
            if (description !== undefined) featured.description = description;
            if (company !== undefined) featured.company = company;
            if (scope !== undefined) featured.scope = scope;
            if (link !== undefined) featured.link = link;

            if (challenges !== undefined) featured.challenges = challenges;
            if (solution !== undefined) featured.solution = solution;

            if (status !== undefined) featured.status = status;


            // ------------------------------------------
            // ARRAY FIELDS
            // ------------------------------------------
            if (deliveredFeats !== undefined) {
                featured.deliveredFeats = Array.isArray(deliveredFeats)
                    ? deliveredFeats
                    : deliveredFeats.split(",").map(f => f.trim());
            }

            if (tags !== undefined) {
                featured.tags = Array.isArray(tags)
                    ? tags
                    : tags.split(",").map(t => t.trim());
            }


            // ------------------------------------------
            // HANDLE FEATURED PROJECT VIDEO REPLACEMENT
            // req.files.video => [{ path, filename }]
            // ------------------------------------------
            if (req.files?.video?.length > 0) {
                const newVideo = req.files.video[0];

                // Delete old video if exists
                if (featured.file?.fileName) {
                    await cloudinary.uploader.destroy(
                        featured.file.fileName,
                        { resource_type: "video" }
                    );
                }

                featured.file = {
                    filePath: newVideo.path,
                    fileName: newVideo.filename
                };
            }

            // ------------------------------------------
            // HANDLE TESTIMONIAL UPDATE
            // ------------------------------------------
            if (!featured.testimonial)
                featured.testimonial = {};

            // 1. Update feedback text
            if (feedback !== undefined) {
                featured.testimonial.feedback = feedback;
            }

            // 2. Update pictureUrl if picture uploaded
            if (req.files?.picture?.length > 0) {
                const newPic = req.files.picture[0];

                // delete previous testimonial pic if exists
                if (featured.testimonial.pictureUrl) {
                    await cloudinary.uploader.destroy(
                        featured.testimonial.pictureUrl,
                        { resource_type: "image" }
                    );
                }

                featured.testimonial.pictureUrl = newPic.path;
            }


            // ------------------------------------------
            // SAVE AND RETURN
            // ------------------------------------------
            await featured.save();
            return featured;

        } catch (error) {
            throw error;
        }
    };


    deleteFeatured = async (req) => {
        try {
            // Extract data
            const { id } = req.params;

            // Check if document exists
            const existing = await Featured.findById(id);
            if (!existing) throw new AppError({ message: "Featured project not found", status: 404 });

            // Delete file from Cloudinary
            const cloudRes = await cloudinary.uploader.destroy(
                existing.file.fileName,
                { resource_type: 'video' }
            );

            if (cloudRes.result === "ok") {
                await Featured.findByIdAndDelete(id);
            } 
            else if (cloudRes.result === "not found") {
                throw new AppError({ message: "File not found", status: 404 });
            }
            else {
                throw new AppError({ message: "File could not be deleted", status: 500 });
            }

            return "Featured project deleted successfully";

        } catch (error) {
            throw error;
        }
    };

    getAllFeatured = async (req) => {
        try {
            const { status } = req.query;

            let filter = {};

            // If status is provided, validate & filter
            if (status) {
                const allowed = ["draft", "published"];

                if (!allowed.includes(status)) {
                    throw new AppError({
                        message: `Invalid status. Allowed values: ${allowed.join(", ")}`,
                        status: 400
                    });
                }

                filter.status = status;
            }

            const featuredList = await Featured.find(filter).sort({ createdAt: -1 });

            if (featuredList.length === 0) {
                throw new AppError({
                    message: "No featured projects found",
                    status: 404
                });
            }

            return featuredList;

        } catch (error) {
            throw error;
        }
    };

    getFeatured = async (req) => {
        try {
            const { id } = req.params;

            const featuredProject = await Featured.findById(id);
            if (!featuredProject) {
                throw AppError({ message: "Featured project not found", status: 404 });
            }

            return featuredProject;
        } 
        catch (error) {
            throw error;
        }
    };

}