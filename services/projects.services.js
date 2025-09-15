import Project from "../models/project.model.js";
import AppError from "../utils/app.error.class.js";
import { toObjectId } from "../utils/mongoose.utils.js";
import { sendEmail } from "../utils/email.util.js";

export default class projectServices{
    createProjects = async (req) => {
        try {
            // Get project fields from request body
            const {title, description, summary, tech, type, isClientProject} = req.body;

            // Create new project doc in db
            const newProject = await Project.create({
                title: title,
                description: description,
                summary: summary,
                tech: tech,
                type: type
            });

            // Send error if project was not created
            if(!newProject) throw new AppError({message: "Project not created", status: 500})

            // Send new project Id if project is a client project
            if(isClientProject) return {projectsId:newProject._id, project: newProject};

            // Send new project
            return newProject;
        } catch(error){
            throw error
        }
    };

    getProject = async (req) => {
        try {
            const id = toObjectId(req.params.id);

            // Extract fields from query, convert to space-separated string for Mongoose .select()
            let fields = req.query.fields ? req.query.fields.split(',').map(f => f.trim()) : null;

            if (fields && !fields.includes('_id')) {
            fields.push('_id'); // Always include _id
            }

            // Build base query
            const query = Project.findById(id);

            if (fields) {
            query.select(fields.join(' '));
            }

            const foundProject = await query.exec();

            if (!foundProject) {
            throw new AppError({ message: "Project not found", status: 404 });
            }

            return foundProject;
        } catch (error) {
            throw error;
        }
    };

    updateProject = async (req) => {
        try {
            // Get project id from request params
            const id = req.params.id;

            // Check if project exists
            const project = await Project.findById(id);
            if (!project) throw new AppError("Project not found", 404);

            // Get updated fields from request body
            const { title, summary, description, link, tech, type, featured, complete, dateCompleted } = req.body;

            // Update fields if provided
            if (title !== undefined) project.title = title;
            if (summary !== undefined) project.summary = summary;
            if (description !== undefined) project.description = description;
            if (link !== undefined) project.link = link;
            if (tech !== undefined) project.tech = tech;
            if (type !== undefined) project.type = type;
            if (featured !== undefined) project.featured = featured;
            if (complete !== undefined) project.isCompleted = complete;
            if (dateCompleted !== undefined) project.dateCompleted = dateCompleted;

            // Save updated project
            await project.save();
            return project;
        } catch (error) {
            throw error;
        }
    };

    toggleFeaturedProject = async (req) => {
        // Extract project id first
        const projectId = req.params.id

        // Find the project
        const project = await Project.findById(projectId);
        if (!project) throw new AppError("Project not found", 404);

        // If setting to true, check the limit
        if (!project.featured) {
            const featuredCount = await Project.countDocuments({ featured: true });
            if (featuredCount >= 5) {
                throw new AppError("Maximum of 5 featured projects allowed", 400);
            }
            project.featured = true;
        } else {
            project.featured = false;
        }

        await project.save();
        return project;
    };

    deleteProject = async (req) => {
        try {
            // Get project id from request params
            const id = req.params.id;

            // Check if project exists
            const project = await Project.findById(id);
            if (!project) throw new AppError("Project not found", 404);

            // Delete project from database
            await Project.findByIdAndDelete(id);

            // Return a success message
            return { success: true, message: "Project deleted successfully" };
        } catch (error) {
            throw error;
        }
    };

    getAllProjects = async (req) => {
        try {
            // Extract fields from query, convert to space-separated string for Mongoose .select()
            let fields = req.query.fields ? req.query.fields.split(',').map(f => f.trim()) : null;

            if (fields && !fields.includes('_id')) {
            fields.push('_id'); // Always include _id
            }

            // Build base query
            const query = Project.find();

            if (fields) {
            query.select(fields.join(' '));
            }

            const Projects = await query.exec();

            if (!Projects) {
            throw new AppError({ message: "Project not found", status: 404 });
            }

            return Projects;
        } catch (error) {
            throw error;
        }
    };

    getFeaturedProjects = async (req) => {
        try {
            // Extract fields from query, convert to space-separated string for Mongoose .select()
            let fields = req.query.fields ? req.query.fields.split(',').map(f => f.trim()) : null;

            if (fields && !fields.includes('_id')) {
            fields.push('_id'); // Always include _id
            }

            // Build base query
            const query = Project.find({featured: true});

            if (fields) {
            query.select(fields.join(' '));
            }

            const Projects = await query.exec();

            if (!Projects) {
            throw new AppError({ message: "No featured projects found", status: 404 });
            }

            return Projects;
        } catch (error) {
            throw error
        }
    };

    sendEmail = async (req) =>{
        const {email, title, name} = req.body
        try {
            await sendEmail({to:email, subject:'Website is live', templateName:'Launch', variables:{name,email,title}})

            return {success: true}
        } catch (error) {
            throw error
        }
    }
}