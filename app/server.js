const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');

module.exports = class Application{
    #express = require('express');
    #app = express();
    constructor(PORT,DB_URL){
        this.confidDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.confidRoutes();
        this.errorHnadler();
    }
    configApplication(){
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use(this.#express.static(path.join(__dirname, ".." , 'public')));
    }
    createServer(PORT){
        const server = http.createServer(this.#app);
        server.listen(PORT , () => {
            console.log(`server run on http://localhost:${PORT}`);
        })
    }
    confidDatabase(DB_URL){
        mongoose.connect(DB_URL , (error) => {
            if(error) throw error
            return console.log('connected to mongodb');
        })
    }
    errorHnadler(){
        this.#app.use((req,res,next)=>{
            return res.status(404).json({
                status : 404,
                success:false,
                message : 'not found page'
            })
        })
        this.#app.use((err,req,res,next)=>{
            const status = err?.status || 500;
            const message = err?.message;
            return res.status(status).json({
                status,
                success:false,
                message
            }) 
        })
    }
    confidRoutes(){
        this.#app.get('/' , (req,res,next) => {
            res.json({
                message : 'this is a new application'
            })
        })
    }
}