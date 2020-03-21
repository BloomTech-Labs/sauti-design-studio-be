const request = require("supertest");
const server = require("../server.js");

const db = require('../database/dbConfig')

describe('project-router ', () => {
  let createdProjectID;

  describe('POST /', () => {
    let resType = "";
    it('should return 200', async () => {
          const res = await request(server).post('/projects')
          .send({
            project_title: "a title",
            graph_json: {"key":"value"},
            user_id: 1,
            initial_node_id: "a string"
          })
          resType = res.type;
          createdProjectID = res.body[0];
          expect(res.status).toBe(201)
    });

    it('should return json', async () => {
      expect(resType).toBe('application/json')
    })

  })
  
  describe('POST nothing to /projects/publish/:id', () => {
    let resType = "";
    it('should return 500', async () => {
          const res = await request(server).post(`/projects/publish/${createdProjectID}`)
          .send({
          })
          resType = res.type;
          expect(res.status).toBe(500)
    });

    it('should return json', async () => {
      expect(resType).toBe('application/json')
    })

  })

  describe('GET /', () => {
    it('should return 200', async () => {
          const res = await request(server).get('/projects');
          expect(res.status).toBe(200);
    });

    it('should return json', async () =>{
      const res = await request(server).get('/projects');
      expect(res.type).toBe('application/json')
    })

  })

  describe('GET /:id', () => {
    it('should return 200', async () => {
          const res = await request(server).get(`/projects/${createdProjectID}`);
          expect(res.status).toBe(200);
    });

    it('should return json', async () =>{
      const res = await request(server).get(`/projects/${createdProjectID}`);
      expect(res.type).toBe('application/json')
    })

  })

  describe('GET /user/:id', () => {
    it('should return 200', async () => {
          const res = await request(server).get(`/projects/user/${createdProjectID}`);
          expect(res.status).toBe(200);
    });

    it('should return json', async () =>{
      const res = await request(server).get(`/projects/user/${createdProjectID}`);
      expect(res.type).toBe('application/json')
    })

  })
    

  describe('put /:id', () => {
    let resType = "";
    it('should return 200', async () => {
          const res = await request(server).put(`/projects/${createdProjectID}`)
          .send({
            id: 1,
            project_title: "a title",
            graph_json: {"key":"value"},
            user_id: 1,
            initial_node_id: "a string"
          })
          resType = res.type;
          expect(res.status).toBe(200)
    });

    it('should return json', async () => {
      expect(resType).toBe('application/json')
    })

  })

  describe('delete /:id', () => {
    let resType = "";
    it('should return 200', async () => {
          const res = await request(server).delete(`/projects/${createdProjectID}`)
          resType = res.type;
          expect(res.status).toBe(200)
    });

    it('should return json', async () => {
      expect(resType).toBe('application/json')
    })

  })

  describe('delete /projects/user/:id', () => {
    // create a project to delete
    it('should return 200', async () => {
      const res = await request(server).post('/projects')
      .send({
        project_title: "a title",
        graph_json: {"key":"value"},
        user_id: 1,
        initial_node_id: "a string"
      })
      createdProjectID = res.body[0];
    });

    it('should return 200', async () => {
          const res = await request(server).delete(`/projects/user/1`)
          resType = res.type;
          expect(res.status).toBe(200)
    });

    it('should return json', async () => {
      expect(resType).toBe('application/json')
    })

  })

});