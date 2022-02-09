import bcrypt from 'bcrypt';
import {config} from '../config.js';
import { sequalize } from '../db/database.js';
import sq from 'sequelize';

const datatype = sq.DataTypes;
const Users = sequalize.define('users', {
    id : {
        type: datatype.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    UserID: {
        type: datatype.STRING,
        allowNull: false,
    },
    hashed: {
        type: datatype.STRING,
        allowNull: false,
    }
}, {timestamps: false});

export async function getAll(){
    return Users.findAll();
}

export async function getbyID(id){
    return Users.findOne({where : {id : id}});
}

export async function postAccount(body){
    const {id, UserID, password} = body;
    const salt = await bcrypt.genSalt(config.hash.hashNum);
    const hashed = await bcrypt.hash(password, salt);
    const user = {
        id,
        UserID,
        hashed,
    };
    return Users.create(user).then(()=>getAll());
}

export async function checkAccount(UserID){
    return Users.findOne({where : {UserID: UserID}});
}