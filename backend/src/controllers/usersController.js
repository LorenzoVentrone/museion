const knex = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUsers = async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (error) {
    console.error('Errore durante il recupero degli utenti:', error);
    res.status(500).json({ error: 'Errore durante il recupero degli utenti' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, pw, first_name, last_name } = req.body;

    // Validazione dei dati
    if (!email || !pw || !first_name || !last_name) {
      return res.status(400).json({
        error: 'Dati mancanti. Assicurati di inviare mail, password, first_name e last_name.'
      });
    }

    // Verifica se la mail è già presente (ricorda che knex restituisce un array)
    const existingUser = await knex('users')
      .select('email')
      .where('email', email);
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Mail già presente nel DB' });
    }
    
    // Hash della password
    const hashedPassword = await bcrypt.hash(pw, saltRounds);

    // Inserimento del nuovo utente
    const [newUser] = await knex('users')
      .insert({
        email,
        pw_hash: hashedPassword,  // Salviamo l'hash della password
        first_name,
        last_name,
      })
      .returning('*');
    
    res.status(201).json(newUser);
    
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante la creazione dell\'utente' });
  }
};