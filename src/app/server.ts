import express, { Application, Request, Response }  from 'express';
import cors from 'cors';

export class ServerApp{
    private app:Application;

    constructor(){
        this.app = express();

        this.middlewares();
        this.routes();
    }

    private routes():void{
        this.app.get('/ping',(req:Request, res:Response) =>{
            res.status(200).json({
                msg: "pong"
            });
        });

        this.app.get('/task', (req:Request, res:Response) => {
            res.status(200).json({
                task: ['Hola','erickson']
            });
        });

        this.app.post('/task',(req:Request, res:Response) => {
            const { title, description } = req.body;

            if(!title || !description){
                res.status(400).json({msg:'Faltan datos'})
            }

            res.status(201).json({
                title,
                description,
                id: "123"
            });
        });
    }

    private middlewares():void{
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    async start():Promise<void>{
        await this.app.listen(8080,()=>{
            console.log(`Server online on the port: 8080`)
        });
    }

    getApp(): Application{
        return this.app;
    }
}