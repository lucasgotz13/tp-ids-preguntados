const express = require("express");

const app = express();

const port = 3030;

app.use(express.json());

const {
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
} = require("./scripts/connectidb.js");

// Obtener todas las preguntas y sus respuestas (TIENEN QUE TENER RESPUESTAS)
app.get("/api/preguntas/", async (req, res) => {
    const response = await getAllPreguntasRespuestas();
    if (response === 0) {
        return res.status(404).json({
            status: false,
            mensaje: "No hay preguntas",
        });
    }
    res.status(200).json(response);
});

// Obtener una pregunta (usando el id)
app.get("/api/preguntas/:id", async (req, res) => {
    const response = await getPreguntaRespuestaById(req.params.id);
    if (response.length === 0) {
        return res.status(404).json({
            status: false,
            mensaje: "La pregunta no fue encontrada",
        });
    }

    return res.status(200).json(response);
});

/*curl --header "Content-Type: application/json" \
  --request POST \ 
  --data '{"pregunta":"¿Quién fue el último campeon del mundo de fútbol?","dificultad":"facil", 
  "categoria" : "deportes", "puntos": "10", "respuesta_a": "Brasil", "respuesta_b": "Argentina", "respuesta_c": "Francia", "respuesta_correcta": "b"
  ' \ 
  http://localhost:3030/api/preguntas/  */

// Crear una pregunta y la respuesta
app.post("/api/preguntas/", async (req, res) => {
    if (
        req.body.pregunta == null ||
        req.body.dificultad == null ||
        req.body.categoria == null ||
        req.body.puntos == null ||
        req.body.respuesta_a == null ||
        req.body.respuesta_b == null ||
        req.body.respuesta_c == null ||
        req.body.respuesta_correcta == null
    ) {
        return res
            .status(400)
            .json({
                status: false,
                mensaje: "Faltan datos para crear la pregunta o la respuesta",
            });
    }

    try {
        await createPregunta(
            req.body.pregunta,
            req.body.dificultad,
            req.body.categoria,
            req.body.puntos
        );
        const response = await getIdFromPregunta(req.body.pregunta);
        await createRespuesta(
            response[0].id,
            req.body.respuesta_a,
            req.body.respuesta_b,
            req.body.respuesta_c,
            req.body.respuesta_correcta
        );

        return res.status(201).json({
            status: true,
            mensaje: "Pregunta creada exitosamente",
        });
    } catch {
        return res
            .status(400)
            .json({ status: false, mensaje: "No se pudo crear la pregunta" });
    }
});

// Ver todas las respuestas de todas las preguntas
app.get("/api/respuestas/", async (req, res) => {
    const response = await getAllRespuestas();

    if (response.length === 0) {
        return res.status(404).json({
            status: false,
            mensaje: "No hay respuestas",
        });
    }

    return res.status(200).json(response);
});

// Ver una respuesta de una pregunta (usando el id)
app.get("/api/respuestas/:id", async (req, res) => {
    const response = await getOneRespuesta(req.params.id);

    if (response.length === 0) {
        return res.status(404).json({
            status: false,
            mensaje: "La respuesta no fue encontrada",
        });
    }

    return res.status(200).json(response);
});

/*curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id_pregunta":"1","respuesta_a":"Manuel Bilbao", "respuesta_b":"Nico Riedel",
  "respuesta_c" : "La peke", "respuesta_correcta": "Manuel Camejo"}' \
  http://localhost:3030/api/respuestas/  */

// Modificar la pregunta
app.put("/api/preguntas/:id", async (req, res) => {
    if (
        req.body.pregunta == null ||
        req.body.dificultad == null ||
        req.body.categoria == null ||
        req.body.puntos == null
    ) {
        return res.status(400).json({
            status: false,
            mensaje: "Faltan datos para modificar la pregunta",
        });
    }

    try {
        await updatePregunta(
            req.params.id,
            req.body.pregunta,
            req.body.dificultad,
            req.body.categoria,
            req.body.puntos
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
    if (req.params.id == null) {
        return res.status(400).json({
            status: false,
            mensaje: "No se mando un id",
        });
    }

    try {
        await deletePregunta(req.params.id);

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

// Obtener un solo usuario (usando el id)
app.get("/api/usuarios/:id", async (req, res) => {
    const response = await getOneUser(req.params.id);

    if (response.length == 0) {
        return res.status(404).json({
            status: false,
            mensaje: "El usuario no fue encontrado",
        });
    }

    return res.status(200).json(response);
});

app.listen(port, () => {
    console.log("Listening on port", port);
});
