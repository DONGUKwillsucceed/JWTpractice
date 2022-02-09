import { checkAccount, getAll, getbyID, postAccount } from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config.js'

function tokenGenerater(UserID){
    return jwt.sign({
        UserID,
        isAdmin : false,
    },
    config.jwt.secret_key,
    {
        expiresIn: config.jwt.expiretime
    }
    )

}

export async function getAuth(req, res){
    const data = await getAll();
    res.status(200).json(data);
}

export async function getAuthbyID(req, res){
    const id = req.params.id;
    const data = await getbyID(id);
    if(!data){
        res.sendStatus(404);
    }
    res.status(200).json(data);
}

export async function signup(req, res){
    const body = req.body;
    const data = await postAccount(body);
    res.status(201).json(data);
}

export async function login(req, res){
    const body = req.body;
    const {UserID, password} = body;
    const data = await checkAccount(UserID);
    if(!data){
        res.status(401).send('Wrong ID!');
    }
    else{
        bcrypt.compare(password, data.hashed)
        .then((result)=>{
            if(result){
                const token = tokenGenerater(UserID);
                res.status(200).json({token, UserID});
            }
            else{
                res.status(401).send('Wrong password!!');
            }
        })
    }
}

export async function me(req, res){
    const UserID = req.UserID;
    console.log(UserID);
    const me = await checkAccount(UserID);
    if(!me){
        res.status(404).send('NOT FOUND!');
    }
    else{
        res.json({token: req.token , UserID});
    }
}