// Import required modules
const request = require('supertest');
const app = require('../index');
const knex = require('../db');

// Test suite for user-related endpoints
describe('Users Endpoints', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'TestPass123',
    first_name: 'Mario',
    last_name: 'Rossi'
  };

  let token; // Will store JWT token after login

  // Clean up: delete the test user and close the DB connection after all tests
  afterAll(async () => {
    await knex('users').where({ email: testUser.email }).del();
    await knex.destroy();
  });

  // Test: User registration
  it('POST /users/signup → should create a new user', async () => {
    const res = await request(app).post('/users/signup').send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  // Test: User login and token retrieval
  it('POST /users/login → should login and return a token', async () => {
    const res = await request(app).post('/users/login').send({
      email: testUser.email,
      password: testUser.password
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // Test: Logout endpoint (stateless, just returns a message)
  it('POST /users/logout → should simulate logout', async () => {
    const res = await request(app).post('/users/logout');
    expect(res.statusCode).toBe(200);
    // Adjusted message to match English version from your controller
    expect(res.body).toHaveProperty('message', 'Logout performed (client side)');
  });

  // Test: Access to a protected route without a token should be denied
  it('Protected route test → should deny access without token', async () => {
    const res = await request(app).get('/orders/getOrders');
    expect(res.statusCode).toBe(401);
  });
});