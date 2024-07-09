import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger/swaggeroption';
import ErrorHandler from './common/ErrorHandler';
import { authRouter } from './api/auth/auth.router';
import { userRouter } from './api/user/user.router';
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

// Router
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use(NotFoundHandler);
router.use(ErrorHandler);

// Prefix
app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`Swagger is running on http://localhost:${process.env.PORT}/api-docs`);
});

export default app;