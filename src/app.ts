import 'dotenv/config'
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import './passport/passport.config';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger/swaggeroption';
import ErrorHandler from './common/ErrorHandler';
import { authRouter } from './api/auth/auth.router';
import { userRouter } from './api/user/user.router';
import { articleRouter } from './api/article/article.router';
import NotFoundHandler from './common/NotFoundHandler';

const app = express();
const router = express.Router();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());

// Router
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/articles', articleRouter);
router.use(NotFoundHandler);
router.use(ErrorHandler);

// Prefix
app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`Swagger is running on http://localhost:${process.env.PORT}/api-docs`);
});

export default app;