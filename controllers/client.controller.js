import clientServices from "../services/clients.services.js";
import { COOKIE_SAMESITE, COOKIE_SECURE } from "../config/config.js";
const clientServ = new clientServices();

export default class clientsController {
  // CREATE
  createClient = async (req, res, next) => {
    try {
      const newClient = await clientServ.createClient(req);
      res.status(201).json({ success: true, client: newClient });
    } catch (error) {
      next(error);
    }
  };

  // LOGIN CLIENT
  loginClient = async (req, res, next) => {
    try {
      const {accessToken, client} = await clientServ.loginClient(req);

      res.cookie('client_jwt', accessToken, {
        httpOnly: true,
        sameSite: COOKIE_SAMESITE, 
        secure: COOKIE_SECURE === 'true',
        maxAge: 1000 * 60 * 60 // 1 hour
      });

      res.status(201).json({ success: true, client: client });
    } catch (error) {
      next(error);
    }
  };

  // LOGOUT CLIENT
  logoutClient = async (req, res, next) => {
    try {
      res.clearCookie('client_jwt', {
        httpOnly: true, 
        sameSite: COOKIE_SAMESITE, 
        secure: COOKIE_SECURE === 'true',
      });
      res.status(200)
    } catch (error) {
      next(error)
    }
  };

  // READ - SINGLE
  getClient = async (req, res, next) => {
    try {
      const foundClient = await clientServ.getClient(req);
      res.status(200).json({ success: true, client: foundClient });
    } catch (error) {
      next(error);
    }
  };

  // READ - ALL
  getAllClients = async (req, res, next) => {
    try {
      const clients = await clientServ.getAllClients(req);
      res.status(200).json({ success: true, clients });
    } catch (error) {
      next(error);
    }
  };

  // READ - FIND CLIENTS BY PROJECT ID(S)
  getClientsByProjectIds = async (req, res, next) => {
    try {
      const clients = await clientServ.getClientsByProjectIds(req);
      res.status(200).json({ success: true, clients });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE
  updateClient = async (req, res, next) => {
    try {
      const updatedClient = await clientServ.updateClient(req);
      res.status(200).json({ success: true, client: updatedClient });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE CLIENT STATUS
  updateClientStatus = async (req, res, next) => {
    try {
      const updatedClient = await clientServ.updateClientStatus(req);
      res.status(200).json({ success: true, client: updatedClient });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE CLIENT PROJECTS ARRAY
  addProjectsToClient = async (req, res, next) => {
    try {
      const client = await clientServ.addProjectsToClient(req);
      res.status(200).json({ success: true, client: client });
    } catch (error) {
      next(error);
    }
  };

  // DELETE
  deleteClient = async (req, res, next) => {
    try {
      const result = await clientServ.deleteClient(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
