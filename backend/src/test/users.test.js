const request = require('supertest');
const app = require('../index');
const knex = require('../db');

describe('Users Endpoints', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'TestPass123',
    first_name: 'Mario',
    last_name: 'Rossi'
  };

  let token;

  afterAll(async () => {
    await knex('users').where({ email: testUser.email }).del();
    await knex.destroy();
  });

  it('POST /users/signup → should create a new user', async () => {
    const res = await request(app).post('/users/signup').send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  it('POST /users/login → should login and return a token', async () => {
    const res = await request(app).post('/users/login').send({
      email: testUser.email,
      password: testUser.password
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /users/logout → should simulate logout', async () => {
    const res = await request(app).post('/users/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logout effettuato (client side)');
  });

  it('Protected route test → should deny access without token', async () => {
    const res = await request(app).get('/orders/getOrders');
    expect(res.statusCode).toBe(401);
  });
});
