import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger/swaggeroption';
import ErrorHandler from './common/ErrorHandler';
import { authController } from './auth/auth.controller';
import { userController } from './user/user.controller';
import NotFoundHandler from './common/NotFoundHandler';

const app = express();
const router = express.Router();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Controller (Routes)
router.use('/auth', authController);
router.use('/user', userController);
router.use(NotFoundHandler);
router.use(ErrorHandler);

// Prefix
app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`Swagger is running on http://localhost:${process.env.PORT}/api-docs`);
});

export default app;