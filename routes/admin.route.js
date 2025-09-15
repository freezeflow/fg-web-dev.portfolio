import {Router} from 'express';
import adminController from '../controllers/admin.controller.js';
import authenticate from "../middleware/auth.middleware.js";
import { validateAdminId, validateAdminUpdate, validateRegister } from '../validations/admin.validation.js';

const adminRouter = Router();
const adminControll = new adminController;

adminRouter.post('/register', validateRegister, authenticate, adminControll.registerAdmin);

adminRouter.get('/', authenticate, adminControll.getAllAdmins);

adminRouter.get('/:id', validateAdminId, authenticate, adminControll.getAdmin);

adminRouter.delete('/:id', validateAdminId, authenticate, adminControll.delete);

adminRouter.put('/:id', validateAdminUpdate, authenticate, adminControll.update);

export default adminRouter;