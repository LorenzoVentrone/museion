const request = require('supertest');
const app = require('../index');
const knex = require('../db');

const generateRandomEmail = () => {
    return `testuser${Date.now()}@example.com`;
  };

describe('Users Endpoints', () => {

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: generateRandomEmail(),
        pw: "secret",
        first_name: "Test",
        last_name: "User"
      };

      const res = await request(app)
        .post('/users')
        .send(userData);

      console.log("User creation response:", res.body);

      expect(res.statusCode).toEqual(201);
      // Controlla che i dati principali siano presenti
      expect(res.body).toHaveProperty('email', userData.email);
      expect(res.body).toHaveProperty('first_name', userData.first_name);
      expect(res.body).toHaveProperty('last_name', userData.last_name);
      // Assicurati che la password non venga ritornata in chiaro
      expect(res.body).not.toHaveProperty('pw');
      expect(res.body).toHaveProperty('pw_hash');
    });

    it('should not create a user with missing fields', async () => {
      const incompleteUserData = {
        mail: "incomplete@example.com",
        pw: "secret"
      };

      const res = await request(app)
        .post('/users')
        .send(incompleteUserData);

      console.log("User creation error response:", res.body);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      // Assicurati che ci sia almeno un utente nel DB (ad esempio creato nel test precedente)
      const res = await request(app).get('/users');
      console.log("GET /users response:", res.body);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  afterAll(async () => {
    await knex.destroy();
  });
});