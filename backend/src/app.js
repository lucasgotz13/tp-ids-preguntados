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

// Obtener todas las preguntas
app.get("/api/preguntas/", async (req, res) => {
    const response = await dbClient.query("SELECT * FROM preguntas");
    if (response.rowCount == 0) {
        return res.status(404).json("No hay preguntas");
    }
    res.status(200).json(response.rows);
});

// Obtener una pregunta (usando el id)
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

// Crear una pregunta
app.post("/api/preguntas/", async (req, res) => {
    const pregunta = req.body.pregunta;
    const dificultad = req.body.dificultad;
    const categoria = req.body.categoria;
    const puntos = req.body.puntos;

    if (pregunta == null) {
        return res.status(400).send("No pusiste el nombre de la pregunta");
    }
    if (dificultad == null) {
        return res.status(400).send("No pusiste la dificultad de la pregunta");
    }
    if (categoria == null) {
        return res.status(400).send("No pusiste la categoria de la pregunta");
    }
    if (categoria == null) {
        return res.status(400).send("No pusiste los puntos de la pregunta");
    }

    try {
        await dbClient.query(
            "INSERT INTO preguntas (pregunta, dificultad, categoria, puntos) VALUES ($1, $2, $3, $4)",
            [pregunta, dificultad, categoria, puntos]
        );
        return res.status(201).json({
            status: true,
            mensaje: "Pregunta creada exitosamente",
        });
    } catch {
        return res
            .status(400)
            .json({ status: true, mensaje: "No se pudo crear la pregunta" });
    }
});

// Modificar la pregunta
app.put("/api/preguntas/:id", async (req, res) => {
    const id = req.params.id;
    const pregunta = req.body.pregunta;
    const dificultad = req.body.dificultad;
    const categoria = req.body.categoria;
    const puntos = req.body.puntos;

    if (pregunta == null) {
        return res.status(400).send("No pusiste el nombre de la pregunta");
    }
    if (dificultad == null) {
        return res.status(400).send("No pusiste la dificultad de la pregunta");
    }
    if (categoria == null) {
        return res.status(400).send("No pusiste la categoria de la pregunta");
    }
    if (puntos == null) {
        return res.status(400).send("No pusiste los puntos de la pregunta");
    }

    try {
        await dbClient.query(
            "UPDATE preguntas SET pregunta = $2, dificultad = $3, categoria = $4, puntos = $5 WHERE id = $1",
            [id, pregunta, dificultad, categoria, puntos]
        );
        return res.status(200).json({
            status: true,
            mensaje: "Pregunta modificada exitosamente",
        });
    } catch {
        return res.status(400).json({
            status: false,
            mensaje: "No se pudo modificar la pregunta",
        });
    }
});

// Borrar la pregunta
app.delete("/api/preguntas/:id", async (req, res) => {
    const id = req.params.id;

    if (id == null) {
        return res.status(400).send("No se mando un id");
    }

    try {
        await dbClient.query("DELETE FROM preguntas WHERE id = $1", [id]);
        return res
            .status(200)
            .json({ status: true, mensaje: "Pregunta borrada exitosamente" });
    } catch {
        res.status(400).json({
            status: false,
            mensaje: "No se pudo borrar la pregunta",
        });
    }
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
