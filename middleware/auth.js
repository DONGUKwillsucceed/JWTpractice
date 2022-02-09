import jwt from 'jsonwebtoken';
const JWT_SECRET = 'qlfjldajvi32'

export async function isAuth(req, res, next){
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json('WHO ARE YOU');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (error, decoded)=>{
        if(error){
            res.sendStatus(401);
        }
        else{
        console.log(decoded);
        const UserID = decoded.UserID;
        req.UserID = UserID;
        req.token = token;
        next();
        }
    })

    
}