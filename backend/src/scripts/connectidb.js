const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "preguntados",
});

async function getAllPreguntasRespuestas() {
    const response = await dbClient.query(
        "SELECT * FROM preguntas, respuestas where preguntas.id = respuestas.id_pregunta"
    );
    return response.rows;
}

async function getPreguntaRespuestaById(id) {
    const response = await dbClient.query(
        "SELECT * FROM preguntas, respuestas where preguntas.id = $1 AND respuestas.id_pregunta = $1",
        [id]
    );

    return response.rows;
}

async function createPregunta(pregunta, dificultad, categoria, puntos) {
    await dbClient.query(
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

async function getIdFromPregunta(pregunta) {
    const response = await dbClient.query(
        "SELECT id FROM preguntas WHERE preguntas.pregunta = $1",
        [pregunta]
    );
    return response.rows;
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
    getPreguntaRespuestaById,
    createPregunta,
    updatePregunta,
    getOneUser,
    deletePregunta,
    createRespuesta,
    getAllRespuestas,
    getOneRespuesta,
    getAllPreguntasRespuestas,
    getIdFromPregunta,
};
