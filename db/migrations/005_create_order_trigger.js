exports.up = function(knex) {
  return knex.raw(`
    -- Crea o sostituisci la funzione trigger
    CREATE OR REPLACE FUNCTION update_availability_func() RETURNS TRIGGER AS $$
    BEGIN
      UPDATE availability
      SET availability = availability - NEW.quantity
      WHERE item_id = NEW.item_id
        AND date = NEW.date;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Crea il trigger che richiama la funzione dopo ogni inserimento in orders
    CREATE TRIGGER orders_update_availability
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_availability_func();
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    DROP TRIGGER IF EXISTS orders_update_availability ON orders;
    DROP FUNCTION IF EXISTS update_availability_func();
  `);
};