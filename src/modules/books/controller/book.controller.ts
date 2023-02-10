
import { httpUtility } from '../../../utils/http';
import { bookRepository } from '../repository/book.repository';
var fs = require("fs")

class bookControllerClass {

    public async addBooks(httpStack, requestJSON): Promise<any> {
        // var path=require('path');
        // console.log('http://127.0.0.1:2022/add-product/'+httpStack.req.file.originalname);
        


        requestJSON.book = JSON.parse(httpStack.req.body.payload);
      requestJSON.book.book_image = `http://127.0.0.1:2022/add-product/${httpStack.req.file.originalname}`;
      
        bookRepository.addBooks(requestJSON).then((bookId) => {
            httpUtility.sendSuccess(httpStack, bookId);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })
    }

    public async updateBooks(httpStack, requestJSON): Promise<any> {

        requestJSON.book = JSON.parse(httpStack.req.body.payload);
        requestJSON.book.book_image = `http://127.0.0.1:2022/add-product/${httpStack.req.file.originalname}`;
        requestJSON.id = httpStack.req.params.id;
        
        bookRepository.updateBooks(requestJSON).then((bookId) => {
            httpUtility.sendSuccess(httpStack, bookId);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })

    }

    public async getBooks(httpStack, requestJSON): Promise<any> {

        

        requestJSON.params = httpStack.req.query;
        bookRepository.getBooks(requestJSON).then((books) => {
                 httpUtility.sendSuccess(httpStack, books);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })

    }

    public async getBooksById(httpStack, requestJSON): Promise<any> {


        requestJSON.id = httpStack.req.params.id;
        bookRepository.getBooksById(requestJSON).then((books) => {
            httpUtility.sendSuccess(httpStack, books);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })

    }

    public async deleteBooks(httpStack, requestJSON): Promise<any> {

        requestJSON.id = httpStack.req.params.id;
        bookRepository.deleteBooks(requestJSON).then((books) => {
            httpUtility.sendSuccess(httpStack, books);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })

    }
     public async loginCustomer(httpStack, requestJSON): Promise<any> {

        requestJSON.customer = httpStack.req.body;
        bookRepository.loginCustomer(requestJSON).then((customers:any) => {
            // if(customers.length>0){
            //     generateToken
            // }else{
            //     let response={message:'Invalid username or password'}
  
            // }
              httpUtility.sendSuccess(httpStack, customers);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)
        })

    }
    

}

export const bookController = new bookControllerClass();