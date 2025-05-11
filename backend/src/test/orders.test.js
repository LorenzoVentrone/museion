const request = require('supertest');
const app = require('../index');
const knex = require('../db');

describe('POST /orders', () => {
  

  it('should create a new order', async () => {
    const orderData = {
      user_id: 5,
      ticket_id: 11,
      quantity: 16  // Supponiamo di voler acquistare 2 biglietti
    };

    const res = await request(app).post('/orders').send(orderData);
    console.log('Risposta createOrder:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('order_id');
    expect(res.body.quantity).toEqual(2);
    // Controlliamo che il totale pagato sia 2 * 14.99
    expect(Number(res.body.total_paid)).toEqual(2 * 14.99);
  });
});