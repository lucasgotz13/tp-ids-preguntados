const express = require("express");
const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "preguntados",
});

const app = express();

const port = 3030;

app.use(express.json());

app.get("/api/preguntas/", async (req, res) => {
    const response = await dbClient.query("SELECT * FROM preguntas");
    res.status(200).json(response.rows);
});

app.get("/api/preguntas/:id", async (req, res) => {
    const id = req.params.id;
    const response = await dbClient.query(
        "SELECT * FROM preguntas WHERE id = $1",
        [id]
    );
    if (response.rows.length == 0) {
        return res.status(404).json("La pregunta no fue encontrada");
    }
    return res.status(200).json(response.rows);
});

app.get("/api/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const response = await dbClient.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );
    if (response.rows.length == 0) {
        return res.status(404).json("El usuario no fue encontrado");
    }
    return res.status(200).json(response.rows);
});

app.listen(port, () => {
    console.log("Listening on port", port);
});
