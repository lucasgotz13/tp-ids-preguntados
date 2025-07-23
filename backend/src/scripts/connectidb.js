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

async function createPregunta(pregunta, dificultad, categoria, puntos, id_usuario = null) {
    await dbClient.query(
        "INSERT INTO preguntas (pregunta, dificultad, categoria, puntos, id_usuario) VALUES ($1, $2, $3, $4, $5)",
        [pregunta, dificultad, categoria, puntos, id_usuario]
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

// conseguir todas las preguntas creadas por el usuario 

async function getPreguntasByIdUsuario(id){
    const response =await dbClient.query(
        "SELECT * FROM preguntas, respuestas where preguntas.id = respuestas.id_pregunta AND preguntas.id_usuario= $1",
        [id]
    );
    return response.rows;

}

async function deleteRespuestaFromPreguntaId(id_pregunta) {
    try {
        const result = await dbClient.query(
            "DELETE FROM respuestas WHERE id_pregunta = $1",
            [id_pregunta]
        );
        return result.rowCount > 0;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deletePregunta(id) {
    const respuestaBorrada = await deleteRespuestaFromPreguntaId(id);
    if (respuestaBorrada) {
        try {
            const result = await dbClient.query(
                "DELETE FROM preguntas WHERE id = $1",
                [id]
            );
            return result.rowCount > 0;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

async function getAllRespuestas() {
    const response = await dbClient.query("SELECT * FROM respuestas");
    return response.rows;
}

async function getOneRespuesta(id) {
    const response = await dbClient.query(
        "SELECT * FROM respuestas WHERE id = $1",
        [id]
    );

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

async function updateRespuesta(
    id,
    respuesta_a,
    respuesta_b,
    respuesta_c,
    respuesta_correcta
) {
    try {
        dbClient.query(
            "UPDATE respuestas SET respuesta_a = $2, respuesta_b = $3, respuesta_c = $4, respuesta_correcta = $5 WHERE id = $1",
            [id, respuesta_a, respuesta_b, respuesta_c, respuesta_correcta]
        );
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deleteRespuesta(id_respuesta) {
    try {
        const result = await dbClient.query(
            "DELETE FROM respuestas WHERE id = $1",
            [id_respuesta]
        );
        return result.rowCount > 0;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getUsuarios() {
    try {
        const response = await dbClient.query("SELECT * FROM usuarios");
        return response.rows;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getOneUser(id) {
    const response = await dbClient.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );

    return response.rows;
}

async function createUsuario(
    nombre,
    usuario,
    edad,
    url_perfil,
    mejor_puntaje
) {
    try {
        dbClient.query(
            "INSERT INTO usuarios (nombre, usuario, edad, url_perfil, mejor_puntaje) VALUES ($1, $2, $3, $4, $5)",
            [nombre, usuario, edad, url_perfil, mejor_puntaje ?? 0]
        );
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateUsuario(
    id,
    nombre,
    usuario,
    edad,
    url_perfil,
    mejor_puntaje
) {
    try {
        dbClient.query(
            "UPDATE usuarios SET  nombre = $2, usuario = $3, edad = $4, url_perfil = $5, mejor_puntaje = $6 WHERE id = $1",
            [id, nombre, usuario, edad, url_perfil, mejor_puntaje]
        );
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function deleteUsuario(id) {
    try {
        const result = await dbClient.query(
            "DELETE FROM usuarios WHERE id = $1",
            [id]
        );
        return result.rowCount > 0;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getOneUserByUsuario(usuario) {
    const response = await dbClient.query(
        "SELECT * FROM usuarios WHERE usuario= $1 ",
        [usuario]
    );
    return response.rows;
}

async function updatePreguntaYRespuestas(id, pregunta, dificultad, categoria, puntos, respuesta_a, respuesta_b, respuesta_c, correcta) {
    await dbClient.query(
      `UPDATE preguntas
       SET pregunta=$2, dificultad=$3, categoria=$4, puntos=$5
       WHERE id=$1`,
      [id, pregunta, dificultad, categoria, puntos]
    );
  
    await dbClient.query(
      `UPDATE respuestas
       SET respuesta_a=$2, respuesta_b=$3, respuesta_c=$4, respuesta_correcta=$5
       WHERE id_pregunta=$1`,
      [id, respuesta_a, respuesta_b, respuesta_c, correcta]
    );
}

module.exports = {
    getPreguntaRespuestaById,
    createPregunta,
    updatePregunta,
    deletePregunta,
    getUsuarios,
    getOneUser,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    createRespuesta,
    getAllRespuestas,
    getOneRespuesta,
    updateRespuesta,
    deleteRespuesta,
    getAllPreguntasRespuestas,
    getIdFromPregunta,
    getOneUserByUsuario,
    updatePreguntaYRespuestas,
    getPreguntasByIdUsuario

};
