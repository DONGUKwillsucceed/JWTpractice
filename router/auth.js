import express from 'express';
import { getAuth, getAuthbyID, login, me, signup } from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const route = express.Router();

route.get('/me', isAuth , me);
route.get('/', getAuth);
route.get('/:id', getAuthbyID);

route.post('/signup', signup);
route.post('/login', login);




export default route;