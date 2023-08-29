import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRouter from './api/products/router.products';
import usersRouter from './api/users/router.users';

const port = 8200;
const app = express();

app.use(express.json()); 
app.use(morgan('dev'));

const corsOptions: cors.CorsOptions = {
    origin: 'https://example-store.netlify.app',
    methods: 'GET,HEAD,PUT,patch,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/', (_req, res) => {
    res.send('API Deployed 🚀');
});

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
