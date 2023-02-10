import * as express from 'express';
import { bookRouter } from '../modules/books/books.router';


class baseRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    public config(): void {

        this.router.use("/books", bookRouter);

    }
}

export const baseRouter = new baseRouterClass().router;