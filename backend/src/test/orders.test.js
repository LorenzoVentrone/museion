const request = require('supertest');
const app = require('../index');
const knex = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersegreto';

describe('POST /orders/createOrders', () => {
  let token;

  beforeAll(() => {
    // Genera un token JWT fittizio per un utente di test
    token = jwt.sign({ user_id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
  });

  it('should create a new order with valid items and dates', async () => {
    const orderData = {
      items: [
        { ticket_id: 1, quantity: 2, date: '2025-06-01' },
        { ticket_id: 2, quantity: 1, date: '2025-06-01' }
      ]
    };

    const res = await request(app)
      .post('/orders/createOrders')
      .set('Authorization', `Bearer ${token}`) // Auth header
      .send(orderData);

    console.log('Risposta createOrder:', res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('order_id');
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
