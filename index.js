import express from 'express';
import { fileURLToPath } from "url";
import path from 'path' 

import authRouter from './routes/auth.route.js';
import projectRoutes from './routes/projects.route.js';
import refreshRouter from './routes/refresh.token.route.js';
import adminRouter from './routes/admin.route.js';
import taskRouter from './routes/task.route.js';
import projectFileRoutes from './routes/project.files.route.js'
import clientRouter from './routes/client.route.js';
import clientFileRoutes from './routes/client.files.route.js';
import clientAuthRouter from './routes/client-routes/client.auth.route.js';
import featuredRouter from './routes/featured.route.js';
import loggedClientRouter from './routes/client-routes/client.routes.js';

import errorHandler from './middleware/error.middleware.js';
import appMiddlewares from './middleware/app.middlewares.js';
import { uploadsCors } from './middleware/app.middlewares.js';

import db  from './database/db.js';
import { PORT } from './config/config.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(appMiddlewares);
app.use('/uploads', uploadsCors, express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/project/files', projectFileRoutes);
app.use('/api/featured', featuredRouter);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRouter);
app.use('/api/client', clientRouter);
app.use('/api/client/files', clientFileRoutes);
app.use('/api/client/auth', clientAuthRouter);
app.use('/api/client/client', loggedClientRouter);

app.use(errorHandler);

process.on('uncaughtException', (err) =>{
    console.log("Uncaught Exception:", err.message)
    process.exit(1)
});

process.on('unhandledRejection', (err) =>{
    console.log("Unhandled Promise rejection", err.message)
    process.exit(1)
});

app.get('/', (req, res) => {
    console.log('App started on port 8080')
    res.send('Node server running on port 8080');
});

db().then(() =>{
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
    });
}).catch((err) =>{
    console.log("Failed to connect to database");
    process.exit(1);
});