import { dbUtility } from "utils/database";

let sqlPath = __dirname + "/";

export const bookSQL = {
    getBooks: dbUtility.getSQL(sqlPath + 'get.book.sql'),
    getBooksById: dbUtility.getSQL(sqlPath + 'get.book.id.sql'),
    deleteBooks: dbUtility.getSQL(sqlPath + 'delete.book.id.sql'),
    loginCustomer:dbUtility.getSQL(sqlPath+'login.customer.sql')
}