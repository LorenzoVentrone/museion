const knex = require('../db');
const bcrypt = require('bcrypt');
const bcryptSalt = process.env.SALT


exports.signup = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(pw, bcryptSalt);

    // Inserimento del nuovo utente
    const [newUser] = await knex('users')
      .insert({
        email,
        pw_hash: hashedPassword,  // Salviamo l'hash della password
        first_name,
        last_name,
      })
      .returning('*');
    
    res.status(201).json({
      status:"success",
      data:{
        "first_name":first_name,
        "last_name" : last_name,
        "email" : email
      },
      message:"signup successful"
    });
    
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    res.status(500).json({ error: 'Errore durante la creazione dell\'utente' });
  }
}


exports.login = async(req,res) => {
  const { email, pw} = req.body;

  if (!email || !pw){
    res.status(400).json("Dati inseriti non validi");
  }

  const existingUser = await knex('users')
  .select('email')
  .where('email', email);

  if (existingUser<1){
    res.status(400).json("Mail non valida");
  }
  else{
    const password = await knex('users')
    .select('pw').where('email',email);
    if (bcrypt.compare(password,pw)){
      res.status(201).json({
        status:"success",
        message:"Welcome back"
      });
    }
    else{
      res.status(400).json("Credenziali non valide")
    }
    //!TODO! aggiungere con token i cookies -> anche il logout
  }
}

exports.logout = async (req,res) =>{
  //!!TODO!!
}