const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
//const session = require("express-session");

const app = express();

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sam"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySQL conectado");
});

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Home
app.get("/", (req, res) => {
  res.send("Home");
});

//Selecionar todos os usuários
app.get("/usuarios", (req, res) => {
  //let sql = "SELECT * FROM pessoa";
  let sql =
    "SELECT u.*, c.* FROM pessoa as u, contato as c WHERE u.contato_id_contato = c.id_contato";

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Selecionar um usuário
app.get("/usuario/:id", (req, res) => {
  //let sql = `SELECT * FROM pessoa WHERE id_pessoa = ${req.params.id}`;

  let sql = `SELECT u.*, c.* FROM pessoa as u, contato as c WHERE u.id_pessoa = ${req.params.id} AND u.contato_id_contato = c.id_contato limit 1`;

  let query = db.query(sql, (err, resultado) => {
    if (err) throw err;

    res.json(resultado);
  });
});

//Selecionar todos os agendamentos
app.get("/agenda", (req, res) => {
  //let sql = "SELECT * FROM agendamento";

  let sql =
    "SELECT a.*, p.*, l.*, e.tipo_especialidade FROM agendamento as a, pessoa as p, local as l, especialidade as e WHERE a.local_id_local = l.id_local AND a.especialidade_id_especialidade = e.id_especialidade AND a.pessoa_id_pessoa = p.id_pessoa";

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Selecionar um agendamento
app.get("/agenda/:id", (req, res) => {
  //let sql = `SELECT * FROM agendamento WHERE id_agendamento = ${req.params.id}`;

  let sql = `SELECT a.*, p.*, l.*, e.tipo_especialidade FROM agendamento as a, pessoa as p, local as l, especialidade as e WHERE a.local_id_local = l.id_local AND a.especialidade_id_especialidade = e.id_especialidade AND a.pessoa_id_pessoa = p.id_pessoa AND id_agendamento = ${req.params.id} AND a.status = "Agendado"`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Selecionar os agendamentos de um usuário
app.get("/agenda/usuario/:id", (req, res) => {
  //let sql = `SELECT * FROM agendamento WHERE id_agendamento = ${req.params.id}`;

  let sql = `SELECT a.*, p.*, l.*, e.tipo_especialidade FROM agendamento as a, pessoa as p, local as l, especialidade as e WHERE a.local_id_local = l.id_local AND a.especialidade_id_especialidade = e.id_especialidade AND a.pessoa_id_pessoa = p.id_pessoa AND a.pessoa_id_pessoa = ${req.params.id} AND a.status = "Agendado"`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Cria novo agendamento
app.post("/agendamento", (req, res) => {
  let sql = `INSERT INTO agendamento (pessoa_id_pessoa, local_id_local, especialidade_id_especialidade, dataHora, status) VALUES (${req.body.idPessoa}, ${req.body.local}, ${req.body.especialidade}, '${req.body.dataHora}', "Agendado")`;

  let sqlVerificacao = `SELECT dataHora, local_id_local, especialidade_id_especialidade FROM agendamento WHERE dataHora = '${req.body.dataHora}' AND local_id_local = ${req.body.local} AND especialidade_id_especialidade = ${req.body.especialidade}`;

  let queryVerificacao = db.query(sqlVerificacao, (err, resultados) => {
    if (err) throw err;
    if (resultados.length > 0) {
      console.log("Este horário está indisponível");
      return;
    } else {
      let query = db.query(sql, (err, resultados) => {
        if (err) throw err;

        res.json(resultados);
      });
    }
  });
});

//Selecionar todos os eventos
app.get("/evento", (req, res) => {
  //let sql = "SELECT * FROM evento";

  let sql =
    "SELECT e.*, l.* FROM evento as e, local as l WHERE e.local_id_local = l.id_local";

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Selecionar um agendamento
app.get("/evento/:id", (req, res) => {
  //let sql = `SELECT * FROM evento WHERE id_evento = ${req.params.id}`;

  let sql = `SELECT e.*, l.* FROM evento as e, local as l WHERE e.local_id_local = l.id_local AND id_evento = ${req.params.id}`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Listar Especialidades
app.get("/especialidades", (req, res) => {
  let sql = `SELECT * from especialidade`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Listar Locais
app.get("/local", (req, res) => {
  let sql = `SELECT * from local`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

//Listar Horários
app.get("/horarios", (req, res) => {
  const data = new Date(req.query.data);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const dataInicial = `${ano}-${mes}-${dia} 00:00:00`;
  const dataFinal = `${ano}-${mes}-${dia} 23:59:59`;

  let sql = `SELECT * from horario WHERE hora NOT IN (SELECT TIME_FORMAT(dataHora, "%H:%i") FROM agendamento WHERE dataHora BETWEEN "${dataInicial}" AND "${dataFinal}")`;

  let query = db.query(sql, (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

app.patch("/cancelamento/:id", (req, res) => {
  let sql = `UPDATE agendamento SET status = 'Cancelado' WHERE id_agendamento = ?`;

  let query = db.query(sql, [req.params.id], (err, resultados) => {
    if (err) throw err;

    res.json(resultados);
  });
});

app.post("/login", (req, res) => {
  let usuario = req.body.usuario;
  let senha = req.body.senha;

  //let sql = "SELECT * FROM login WHERE usuario = ? AND senha = ?";
  let sql =
    "SELECT id_pessoa, nome from pessoa WHERE login_id_login = (SELECT id_login from login WHERE usuario = ? AND senha = ?)";

  let query = db.query(sql, [usuario, senha], (err, resultados) => {
    if (resultados.length > 0) {
      if (err) throw err;
      res.json(resultados);
      console.log(resultados);
    } else {
      res.json("Usuário ou senha incorretos!");
    }
  });
});

// app.post("/logout", (req, res) => {
//   req.session.destroy(err => {
//     if (err) throw err;
//     else console.log("Logout");
//   });
//   res.end();
// });

app.listen("3000", () => {
  console.log("Servidor online...");
});
