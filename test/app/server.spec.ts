import request from 'supertest';
import {ServerApp}  from "../../src/app/server";

const server = new ServerApp().getApp();

describe('Get /task', () =>{

  

    test('should response a code 200', async()=>{
        const resp = await request(server).get('/task').send();
        expect(resp.status).toBe(200);
    });

    test('should response a Array', async() =>{
        const response = await request(server).get('/task').send();
        expect(response.body).toBeInstanceOf(Object);
    });

    test('The object should response the content "Hola erickson"', async ()=>{
        const response = await request(server).get('/task').send();
        expect(response.body).toEqual({task: ['Hola', 'erickson']});
    });
});

describe('Post /task', () => {

    describe('all data are sent', () =>{

        const newTask = {
            title: "test task",
            description: "test description",
        }

        test('should response with a 201 status code', async () => {
            const response = await request(server).post('/task').send(newTask);
            expect(response.statusCode).toBe(201);
        });
    
        test('should have a content-type: application/json in header', async() =>{
            const response = await request(server).post('/task').send(newTask);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });
    
        test('should respond with an task ID',async () => {
            const response = await request(server).post('/task').send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe('some data is not sent', () =>{

        test('should respond with a 400 status code',async () => {
            const fields = [
                {},
                {title: 'task title'},
                {desciption: 'task description'}
            ]

            for (const body of fields){
                const response = await request(server).post('/task').send(body);
                expect(response.status).toBe(400);
            }
           
        });

        
    });


});

