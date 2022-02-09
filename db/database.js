import SQ from 'sequelize';
import { config } from '../config.js';

export const sequalize = new SQ.Sequelize(
    config.db.name, 
    config.db.user,
    config.db.password,
    {
    host: config.db.host,
    dialect: config.db.dialect,
});
