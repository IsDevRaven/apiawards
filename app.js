const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.set('port', process.env.PORT || 3000);

// Conecta a la base de datos SQLite
const db = new sqlite3.Database('/Users/wylder/DataGripProjects/Simem/awards.sqlite');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Puedes especificar el origen permitido en lugar de '*' si es necesario.
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/getAward/:code', (req, res) => {
  const code = req.params.code;

  // Realiza una consulta a la base de datos
  db.get('SELECT * FROM premios WHERE id = ?', [code], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ codigo: row });
  });
});


app.get('/api/premios', (req, res) => {
  db.all('SELECT * FROM premios', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log(`API en ejecución en port:${app.get('port')}`);
});
