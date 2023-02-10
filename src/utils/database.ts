import { QueryFile } from "pg-promise";

const Promise = require('bluebird');
const initOptions = {
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message);
        }
    },
    query: function (e) {
        console.clear();
        console.log(e.query);
        if (e.params) {
            console.log('PARAMS:', e.params);
        }
    },
    promiseLib: Promise,
    capSQL: true
};

const pgp = require('pg-promise')(initOptions);

class dbUtilityClass {
    connect() {
        const dbConnection = {
            host: process.env.API_DB_HOST,
            port: process.env.API_DB_PORT,
            database: process.env.API_DB_NAME,
            user: process.env.API_DB_USER,
            password: process.env.API_DB_PASSWORD

        }
        const db = pgp(dbConnection);
        return db;
    }

    insertSQL(row, configSQL) {
        const coloumn = Object.keys(row);
        const query = pgp.helpers.insert(row, coloumn, { schema: configSQL.schema, table: configSQL.table }) + 'returning id';
        return query;
    }

    insertmanySQL(rows, configSQL) {
        const coloumn = Object.keys(rows[0]);
        const query = pgp.helpers.insert(rows, coloumn, { schema: configSQL.schema, table: configSQL.table }) + ' returning id';
        return query;
    }
    updateSQL(row, configSQL, id) {
        const coloumn = Object.keys(row);
        const query = pgp.helpers.update(row, coloumn, { schema: configSQL.schema, table: configSQL.table }) + ` where id=${id} returning id;`;
        return query;
    }
    getSQL(filepath) {
        let query = new QueryFile(filepath, { minify: true });
        return query;
    }

}
export const dbUtility = new dbUtilityClass();
export const db = new dbUtilityClass().connect();
