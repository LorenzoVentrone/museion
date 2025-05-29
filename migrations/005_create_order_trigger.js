// Migration to create a trigger that updates availability after an order is inserted
exports.up = function(knex) {
  return knex.raw(`
    -- Create or replace the trigger function to update availability
    CREATE OR REPLACE FUNCTION update_availability_func() RETURNS TRIGGER AS $$
    BEGIN
      UPDATE availability
      SET availability = availability - NEW.quantity
      WHERE item_id = NEW.item_id
        AND date = NEW.date;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Create the trigger that calls the function after each insert on orders
    CREATE TRIGGER orders_update_availability
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_availability_func();
  `);
};

// Migration to drop the trigger and function (rollback)
exports.down = function(knex) {
  return knex.raw(`
    DROP TRIGGER IF EXISTS orders_update_availability ON orders;
    DROP FUNCTION IF EXISTS update_availability_func();
  `);
};