const request = require('supertest');
const app = require('../index');
const knex = require('../db');

describe('POST /orders/createOrders', () => { //!!TODO RIVEDI LE ROUTE!!
  

  it('should create a new order', async () => {
    const orderData = {
      user_id: 15,
      ticket_id: 22,
      quantity: 2  // Supponiamo di voler acquistare 2 biglietti
    };

    const res = await request(app).post('/orders').send(orderData);
    console.log('Risposta createOrder:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('order_id');
    expect(res.body.quantity).toEqual(2);
  });

  // Chiudi la connessione al database dopo i test
  afterAll(async () => {
    await knex.destroy();
  });
});