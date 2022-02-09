import dotenv from 'dotenv';

dotenv.config();

function getENV(key){
    const env = process.env[key];
    if(!env){
        throw new Error('Wrong key');
    }

    return env;
}


export const config = {
    jwt: {
        secret_key : getENV('JWT_SECRET'),
        expiretime : parseInt(getENV('JWT_EXPIRE')),
    },
    hash: {
        hashNum : parseInt(getENV('SALT_ROUND')),
    },
    db:{
        name : getENV('DB_NAME'),
        user : getENV('DB_USER_NAME'),
        password : getENV('DB_USER_PASSWORD'),
        host : getENV('DB_HOST'),
        dialect : getENV('DB_DIALECT'),
    }
}