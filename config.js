/**
 * dependencies
 */
import dotenv from 'dotenv';
dotenv.config();

//common configurations for all the environments
let commonConfig = {
    enableClusterMode: false
};

let config = {};

switch(process.env.NODE_ENV) {
    case 'development' : {
        config = {
            DIALECT:'postgres',
            DATABASE_URL:'postgres://jriibhmj:CECzKgUbukh46px_aq5eRkTPFnzNYAwp@chunee.db.elephantsql.com/jriibhmj',
            FORCE_SCHEMA_DROP: false,
            PORT:3000
        };
        break;
    }
    case 'production' : {
        config = {
            DIALECT:'postgres',
            DATABASE_URL:'postgres://jriibhmj:CECzKgUbukh46px_aq5eRkTPFnzNYAwp@chunee.db.elephantsql.com/jriibhmj',
            FORCE_SCHEMA_DROP: false,
            PORT:3000
        };
        break;
    }
    case 'test' : {
        config = {
            DIALECT:'postgres',
            DATABASE_URL:'postgres://jriibhmj:CECzKgUbukh46px_aq5eRkTPFnzNYAwp@chunee.db.elephantsql.com/jriibhmj',
            FORCE_SCHEMA_DROP: false,
            PORT:3000
        };
        break;
    }
    default : {
        config = {
            DIALECT:'postgres',
            DATABASE_URL:'postgres://jriibhmj:CECzKgUbukh46px_aq5eRkTPFnzNYAwp@chunee.db.elephantsql.com/jriibhmj',
            FORCE_SCHEMA_DROP: false,
            PORT:3000
        };
    }
}

//Copy the common configurations to the export variable
Object.assign(config, commonConfig);

export default config;
