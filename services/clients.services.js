import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from "../models/client.model.js";
import AppError from "../utils/app.error.class.js";
import { sendEmail } from '../utils/email.util.js';
import { toObjectId } from '../utils/mongoose.utils.js';
import { JWT_ACCESS_SECRET } from "../config/config.js";

export default class clientServices {

  createClient = async (req) => {
    try {
      const { name, email, phone, company, location, status, projects } = req.body;

      // Check if email or phone number exist
      if(!email)  throw new AppError({ message: "Email required", status: 401 });
      if(!phone)  throw new AppError({ message: "Contact number required", status: 401 });

      // Check if email already exists
      const existingClientEmail = await Client.findOne({ email });
      if (existingClientEmail) {
        throw new AppError({ message: "Email already in use", status: 400 });
      }

      // Check if phone number exists
      const existingClientPhone = await Client.findOne({ phone });
      if (existingClientPhone) {
        throw new AppError({ message: "Contact number already in use", status: 400 });
      }

      // Generate unique 6-digit PIN as a string, zero-padded if needed
      const generatePin = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };

      const pin = generatePin();

      // Encrypt the PIN with bcrypt (10 salt rounds)
      const hashedPin = await bcrypt.hash(pin, 10);

      const newClient = await Client.create({
        name,
        email,
        phone,
        company,
        location,
        status,
        projects,
        pin: hashedPin,
      });

      if (!newClient) throw new AppError({ message: "Client not created", status: 500 });
      await sendEmail({to:email, subject:'Profile created', templateName:'welcome', variables:{name,email,phone,pin}})

      return { client: newClient };
    } catch (error) {
      throw error;
    }
  };

  loginClient = async (req) => {
    try {
      const { email, pin } = req.body;

      if (!email || !pin) {
        throw new AppError({ message: "Email and pin are required", status: 400 });
      }

      // Find client by email
      const client = await Client.findOne({ email }).select('+pin');
      if (!client) {
        throw new AppError({ message: "Invalid email or pin", status: 401 });
      }

      // Compare pin with hashed pin
      const isPinValid = await bcrypt.compare(pin, client.pin);
      if (!isPinValid) {
        throw new AppError({ message: "Invalid email or pin", status: 401 });
      }

      // Generate JWT access token
      const accessToken = jwt.sign(
      {
        userId: client._id,
        role: client.role
      },
      JWT_ACCESS_SECRET,
      { expiresIn: '1h' }
    );

      return { 
        accessToken, 
        client:{
          _id: client._id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          company: client.company,
          location: client.location,
          createdAt: client.createdAt,
          projects: client.projects,
          role: client.role
        } 
      };
    } catch (error) {
      throw error;
    }
  };

  getClient = async (req) => {
    try {
      const id = toObjectId(req.params.id);
      
      const fields = req.query.fields ? req.query.fields.split(',').join(' ') : null;

      const query = Client.findById(id).populate("projects");

      if (fields) {
        // Prevent returning the pin hash
        if (fields.includes('pin')) {
          throw new AppError({ message: "Access to 'pin' field is forbidden.", status: 403 });
        }
        query.select(fields);
      }

      const foundClient = await query.exec();

      if (!foundClient) throw new AppError({ message: "Client not found", status: 404 });

      return foundClient;
    } catch (error) {
      throw error;
    }
  };

  getAllClients = async (req) => {
    try {
      const fields = req.query.fields ? req.query.fields.split(',').join(' ') : null;

      const query = Client.find().populate("projects");
      if (fields) {
        if (fields.includes('pin')) {
          throw new AppError({ message: "Access to 'pin' field is forbidden.", status: 403 });
        }

        query.select(fields);
      }

      const clients = await query.exec();

      return clients;
    } catch (error) {
      throw error;
    }
  };

  updateClient = async (req) => {
    try {
      const id = req.params.id;

      const client = await Client.findById(id);
      if (!client) throw new AppError({message: "Client not found", status: 404});

      const { name, email, phone, company, location, status, projects } = req.body;

      // Check if client already exists
      if(email){
        const existingClientEmail = client.email;
        if (existingClientEmail) {
          throw new AppError({ message: "Email already in use", status: 400 });
        }
      }
      
      // Check if phone number exists
      if(phone){
        const existingClientPhone = client.phone;
        if (existingClientPhone) {
          throw new AppError({ message: "Contact number already in use", status: 400 });
        }
      }
      
      if (name !== undefined) client.name = name;
      if (email !== undefined) client.email = email;
      if (phone !== undefined) client.phone = phone;
      if (company !== undefined) client.company = company;
      if (location !== undefined) client.location = location;
      if (status !== undefined) client.status = status;
      if (projects !== undefined) client.projects = projects;

      await client.save();
      return client;
    } catch (error) {
      throw error;
    }
  };

  updateClientStatus = async (req) => {
    try {
      const id = toObjectId(req.params.id);
      const { status } = req.query.status;

      // Validate status
      if (!['pending', 'active'].includes(status)) {
        throw new AppError({ message: "Invalid status. Must be 'pending' or 'active'.", status: 400 });
      }

      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedClient) throw new AppError({ message: "Client not found", status: 404 });

      return updatedClient;
    } catch (error) {
      throw error;
    }
  };

  addProjectsToClient = async (req) => {
    try {
      const id = toObjectId(req.params.id);
      let { projects } = req.body.projects;

      if (!projects) {
        throw new AppError({ message: "No project(s) provided in request body.", status: 400 });
      }

      // Normalize projects to an array
      if (!Array.isArray(projects)) {
        projects = [projects];
      }

      const client = await Client.findById(id);

      if (!client) throw new AppError({ message: "Client not found", status: 404 });

      if (client.status !== 'active') {
        throw new AppError({ message: "Cannot add projects to clients that are not active.", status: 400 });
      }

      // Add unique project IDs to projects array (avoid duplicates)
      const existingProjects = client.projects.map(p => p.toString());
      projects.forEach(projId => {
        if (!existingProjects.includes(projId)) {
          client.projects.push(projId);
        }
      });

      await client.save();

      return client;
    } catch (error) {
      throw error;
    }
  };

  deleteClient = async (req) => {
    try {
      const id = req.params.id;

      const client = await Client.findById(id);
      if (!client) throw new AppError({message: "Client not found", status: 404});

      await Client.findByIdAndDelete(id);

      return { success: true, message: "Client deleted successfully" };
    } catch (error) {
      throw error;
    }
  };

  getClientsByProjectIds = async (req) => {
    try {
      const { projectIds, fields } = req.query;
      if (!projectIds) throw new AppError({ message: "Project IDs are required", status: 400 });

      const idsArray = [...new Set(projectIds.split(',').map(id => toObjectId(id.trim())))];

      const clients = await Client.find({ projects: { $in: idsArray } })
        .select(fields || '') // only return selected fields if provided
        .populate("projects");

      return clients;
    } catch (error) {
      throw error;
    }
  };
}
