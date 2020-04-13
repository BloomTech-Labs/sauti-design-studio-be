const request = require("supertest");

// These are unit tests, so we don't need to test our middleware,
//  so use a fresh new Express server.
const express = require("express");
const server = express();

// This is the module being tested
const UsersRouter = require('../controllers/users-router');
server.use('/users', UsersRouter);

// Mock up the model that this route uses
jest.mock('../models/user-models');

// This is now mocked up and under our control
const Users = require('../models/user-models');

describe('user router endpoints', () =>{
    describe('GET /users', () =>{
        it('should call Users.find()', async () => {
            const res = await request(server).get('/users')

            expect(Users.find.mock.calls).toHaveLength(1)
        })

        it('should an empty list when no users were returned from Users.find()', async () =>{
            Users.find = () => {return []}

            const res = await request(server).get('/users')

            expect(res.body).toEqual([])
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
        })

        it('should the exact same list returned by Users.find()', async () =>{
            const dummyList = ["user1", "user2"]
            Users.find = () => {return dummyList}

            const res = await request(server).get('/users')

            expect(res.body).toEqual(dummyList)
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
        })

        it('should return 500 error when Users.find() throws an exception', async () =>{
            Users.find = () => {throw new Error()}

            const res = await request(server).get('/users')

            expect(res.body).toEqual({})
            expect(res.status).toBe(500)
            expect(res.type).toBe('application/json')
        })
    })

    describe('GET /users/:id', () =>{
        it('should call Users.getById()', async () => {
            const res = await request(server).get('/users/1')

            expect(Users.getById.mock.calls).toHaveLength(1)
        })

        it('should return a 404 if the user does not exist', async () => {
            const res = await request(server).get('/users/1')

            expect(res.status).toBe(404)
            expect(res.type).toBe('application/json')
        })

        it('should return 200 if a user with the id exists', async () => {
            dummyUser = {id: 1}
            Users.getById = () => {return dummyUser}

            const res = await request(server).get('/users/1')

            expect(res.status).toBe(200)
            expect(res.body).toEqual(dummyUser)
            expect(res.type).toBe('application/json')
        })

        it('should return a 500 if there is an error', async () => {
            Users.getById = () => {throw new Error("Error Message")}

            const res = await request(server).get('/users/1')

            expect(res.status).toBe(500)
            expect(res.body).toEqual({
                message: "The reason you're getting an error: Error: Error Message"
            })
            expect(res.type).toBe('application/json')
        })
    })
})