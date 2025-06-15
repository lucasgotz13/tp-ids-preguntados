const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "preguntados",
});

async function getAllPreguntas() {
    const response = await dbClient.query("SELECT * FROM preguntas");
    return response.rows;
}

async function getPreguntaById(id) {
    const response = await dbClient.query(
        "SELECT * FROM preguntas WHERE id = $1",
        [id]
    );

    return response.rows;
}

async function createPregunta(pregunta, dificultad, categoria, puntos) {
    dbClient.query(
        "INSERT INTO preguntas (pregunta, dificultad, categoria, puntos) VALUES ($1, $2, $3, $4)",
        [pregunta, dificultad, categoria, puntos]
    );
}

async function updatePregunta(id, pregunta, dificultad, categoria, puntos) {
    dbClient.query(
        "UPDATE preguntas SET pregunta = $2, dificultad = $3, categoria = $4, puntos = $5 WHERE id = $1",
        [id, pregunta, dificultad, categoria, puntos]
    );
}
async function getOneUser(id) {
    const response = await dbClient.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );

    return response.rows;
}

async function deletePregunta(id) {
    dbClient.query("DELETE FROM preguntas WHERE id = $1", [id]);
}

async function getAllRespuestas() {
    const response = await dbClient.query("SELECT * FROM respuestas");
    return response.rows;
}

async function createRespuesta(
    id_pregunta,
    respuesta_a,
    respuesta_b,
    respuesta_c,
    respuesta_correcta
) {
    dbClient.query(
        "INSERT INTO respuestas (id_pregunta, respuesta_a, respuesta_b, respuesta_c, respuesta_correcta) VALUES ($1, $2, $3, $4, $5)",
        [id_pregunta, respuesta_a, respuesta_b, respuesta_c, respuesta_correcta]
    );
}
async function getOneRespuesta(id) {
    const response = await dbClient.query(
        "SELECT * FROM respuestas WHERE id = $1",
        [id]
    );

    return response.rows;
}

module.exports = {
    getAllPreguntas,
    getPreguntaById,
    createPregunta,
    updatePregunta,
    getOneUser,
    deletePregunta,
    createRespuesta,
    getAllRespuestas,
    getOneRespuesta,
};
