import {Router} from 'express';
import adminController from '../controllers/admin.controller.js';
import {  validateAdminUpdate, validateRegister, validateUpdatePassword } from '../validations/admin.validation.js';
import { authenticate, authorizeRole } from '../middleware/auth.middleware.js';

const adminRouter = Router();
const adminControll = new adminController;

adminRouter.post('/register', validateRegister, authenticate, authorizeRole('admin'), adminControll.registerAdmin);

adminRouter.put('/password/', validateUpdatePassword, authenticate, authorizeRole('admin'), adminControll.updatePassword);

adminRouter.get('/', authenticate, authorizeRole('admin'), adminControll.getAdmin);

adminRouter.delete('/', authenticate, authorizeRole('admin'), adminControll.delete);

adminRouter.put('/', validateAdminUpdate, authenticate, authorizeRole('admin'), adminControll.update);

export default adminRouter;