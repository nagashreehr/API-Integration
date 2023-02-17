import * as express from 'express';
import { httpUtility } from './../../utils/http';
import { bookController } from './controller/book.controller';
const multer  = require('multer')



class bookRouterClass {
    upload;
    public router: express.Router = express.Router();

    constructor() {

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'add-product/')
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              console.log(file)
              cb(null, file.originalname)
            }
          })
          
           this.upload = multer({ storage: storage })
           this.config();

    }

    public config(): void {
        this.router.get("/:id", (req, res, next) => { httpUtility.action(req, res, next, bookController.getBooksById) });
        this.router.get("/", (req, res, next) => { httpUtility.action(req, res, next, bookController.getBooks) });
        this.router.post("/", this.upload.single('book_image'),(req, res, next) => { httpUtility.action(req, res, next, bookController.addBooks) });
        this.router.put("/:id",this.upload.single('book_image'), (req, res, next) => { httpUtility.action(req, res, next, bookController.updateBooks) });
        this.router.delete("/:id", (req, res, next) => { httpUtility.action(req, res, next, bookController.deleteBooks) });
        this.router.post("/login",(req, res, next) => { httpUtility.action(req, res, next, bookController.loginCustomer) });
        this.router.post("/signUp",(req, res, next) => { httpUtility.action(req, res, next, bookController.addCustomer) });
    }
}

export const bookRouter = new bookRouterClass().router;