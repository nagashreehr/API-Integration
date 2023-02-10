import { db, dbUtility } from "utils/database";
import { bookSQL } from "./sql/_book.sql";

class bookRepositoryClass {

    public addBooks(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {
            requestJSON.configSQL.table = 'book';
            let dbSQL = dbUtility.insertSQL(requestJSON.book, requestJSON.configSQL);

            db.one(dbSQL, requestJSON.configSQL).then((bookId) => {
                resolve(bookId);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }
    public updateBooks(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {
            requestJSON.configSQL.table = 'book';
            let dbSQL = dbUtility.updateSQL(requestJSON.book, requestJSON.configSQL, requestJSON.id);
            db.one(dbSQL, requestJSON.configSQL).then((bookId) => {
                resolve(bookId);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }
    public getBooks(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {

            requestJSON.configSQL.table = 'book';
            let dbSQL = bookSQL.getBooks;
            requestJSON.configSQL.book_name = requestJSON.params.book_name;
            requestJSON.configSQL.book_genre = requestJSON.params.book_genre;

            db.any(dbSQL, requestJSON.configSQL).then((books) => {
                resolve(books);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }
    public getBooksById(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {

            requestJSON.configSQL.table = 'book';
            let dbSQL = bookSQL.getBooksById;
            requestJSON.configSQL.id = requestJSON.id;

            db.one(dbSQL, requestJSON.configSQL).then((books) => {
                resolve(books);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }
    public deleteBooks(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {

            requestJSON.configSQL.table = 'book';
            let dbSQL = bookSQL.deleteBooks;
            requestJSON.configSQL.id = requestJSON.id;

            db.any(dbSQL, requestJSON.configSQL).then((books) => {
                resolve(books);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }

    public loginCustomer(requestJSON) {
        const dbPromise = new Promise((resolve, reject) => {

            requestJSON.configSQL.table = 'book';
            let dbSQL = bookSQL.loginCustomer;
            requestJSON.configSQL.username = requestJSON.customer.username;
            requestJSON.configSQL.password = requestJSON.customer.password;

            db.any(dbSQL, requestJSON.configSQL).then((books) => {
                resolve(books);
            }).catch((error) => {
                reject(error);
            })
        });
        return dbPromise;
    }

   

}

export const bookRepository = new bookRepositoryClass();