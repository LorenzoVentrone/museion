/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION update_ticket_availability_on_order()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE ticket_availability
        SET
          ticket_available = ticket_available - NEW.quantity,
          ticket_sold = ticket_sold + NEW.quantity
        WHERE ticket_id = NEW.ticket_id;
  
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  
      CREATE TRIGGER trg_update_ticket_availability
      AFTER INSERT ON orders
      FOR EACH ROW
      EXECUTE FUNCTION update_ticket_availability_on_order();
    `);
  };
  
  exports.down = function(knex) {
    return knex.raw(`
      DROP TRIGGER IF EXISTS trg_update_ticket_availability ON orders;
      DROP FUNCTION IF EXISTS update_ticket_availability_on_order;
    `);
  };
  
