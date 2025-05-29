-- Insert availability = 100 for all item_id's for june/2025

TRUNCATE TABLE orders, availability;

DO $$
DECLARE
  item RECORD;
  d DATE := DATE '2025-06-01';
BEGIN
  FOR item IN SELECT item_id FROM items LOOP
    FOR i IN 0..29 LOOP
      INSERT INTO availability (item_id, date, availability)
      VALUES (item.item_id, d + i, 100)
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
END $$;