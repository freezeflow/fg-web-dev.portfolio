// routes/client.route.js
import express from "express";
import clientsController from "../controllers/client.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import {
  validateCreateClient,
  validateUpdateClient,
  validateClientLogin,
  validateGetClient,
  validateGetClientsByProjectIds,
  validateUpdateClientStatus,
  validateAddProjectsToClient,
  validateDeleteClient,
  validateGetAllClients
} from "../validations/client.validation.js";

const clientRouter = express.Router();
const clientCtrl = new clientsController();

// Create client
clientRouter.post("/", validateCreateClient, authenticate, clientCtrl.createClient);

// Log client in
clientRouter.post("/sign-in", validateClientLogin, clientCtrl.loginClient);

// Get clients by one or more project IDs
clientRouter.get("/by-project", validateGetClientsByProjectIds, authenticate, clientCtrl.getClientsByProjectIds);

// Get a single client by ID
clientRouter.get("/:id", validateGetClient, authenticate, clientCtrl.getClient);

// Update a client status
clientRouter.patch("/status/:id", validateUpdateClientStatus, authenticate, clientCtrl.updateClientStatus);

// Add a project to client
clientRouter.patch("/projects/:id", validateAddProjectsToClient, authenticate, clientCtrl.addProjectsToClient);

// Update a client by ID
clientRouter.patch("/:id", validateUpdateClient, authenticate, clientCtrl.updateClient);

// Delete a client by ID
clientRouter.delete("/:id", validateDeleteClient, authenticate, clientCtrl.deleteClient);

// Get all clients
clientRouter.get("/", validateGetAllClients, authenticate, clientCtrl.getAllClients);

export default clientRouter;