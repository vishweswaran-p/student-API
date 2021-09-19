/** dependencies */
import {Sequelize} from 'sequelize';
import config from 'config';
import studentModel from 'model/student';

class dbService {

    constructor() {
        this.sequelize = new Sequelize(config.DATABASE_URL,{
            dialect: config.DIALECT,
            logging: false
        });
        this.sequelize.authenticate()
        .then(() => {
            console.log('Done.');
            studentModel.defineSchema();
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err);
        });
    }
}

export default new dbService();

