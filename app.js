import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './router/auth.js';
import { sequalize } from './db/database.js';
const app = express();
const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus:200,
}

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(helmet());

app.use('/auth', authRouter);


app.use('/',(req, res)=>{
    res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

sequalize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('Activated!');
    })
})
