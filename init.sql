-- per ogni ticket_id da 1 a 4, con availability = 100 per tutto il mese di giugno

DO $$
DECLARE
  ticket_id INT;
  d DATE := DATE '2025-06-01';
BEGIN
  FOR ticket_id IN 1..4 LOOP
    FOR i IN 1..29 LOOP
      INSERT INTO availability (ticket_id, date, availability)
      VALUES (ticket_id, d + i, 100);
    END LOOP;
  END LOOP;
END $$;
