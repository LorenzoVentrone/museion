const request = require('supertest');
const app = require('../index');
const knex = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

// Test suite for POST /orders/createOrders endpoint
describe('POST /orders/createOrders', () => {
  let token;

  // Generate a fake JWT token for a test user before running the tests
  beforeAll(() => {
    token = jwt.sign({ user_id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
  });

  // Test: should create a new order with valid items and dates
  it('should create a new order with valid items and dates', async () => {
    const orderData = {
      items: [
        { ticket_id: 1, quantity: 2, date: '2025-06-01' },
        { ticket_id: 2, quantity: 1, date: '2025-06-01' }
      ]
    };

    // Send POST request to create a new order
    const res = await request(app)
      .post('/orders/createOrders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);

    /* console.log('createOrder response:', res.body); */

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('order_id');
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await knex.destroy();
  });
});