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
const cors = require("cors");
app.use(cors());

const port = 3030;

app.use(express.json());

const {

    getAllPreguntas,
    getPreguntaById,
    createPregunta,
    updatePregunta,
    getOneUserById,
    deletePregunta,
    createRespuesta,
    getAllRespuestas,
    getOneRespuesta,
    getAllPreguntasRespuestas,
    getIdFromPregunta,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarios,
    getOneUserByNombre,

} = require("./scripts/connectidb.js");





// Obtener todas las preguntas
app.get("/api/preguntas/", async (req, res) => {
    const response = await getAllPreguntas();
    if (response === 0) {
        return res.status(404).json("No hay preguntas");
    }
    res.status(200).json(response);
});

// obtener usuario buscando por nombre
app.get("/api/usuarios/:nombre",async (req,res) => {

    const response= await getOneUserByNombre(req.params.nombre);
    
    if (response.length == 0){
        return res.status(404).json({
            status: false,
            mensaje: "El usuario no fue encontrado",
        });
    }

    return res.status(200).json(response);
})

// Obtener una pregunta (usando el id)
app.get("/api/preguntas/:id", async (req, res) => {
    const response =await getPreguntaById(req.params.id);
    if (response.length === 0) {
        return res.status(404).json("La pregunta no fue encontrada");
    }

    return res.status(200).json(response);
});


/*curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"pregunta":"Como se llama el profe de la catedra?","dificultad":"facil", 
  "categoria" : "fiuba", "puntos": "10"}' \
  http://localhost:3030/api/preguntas/  */

// Crear una pregunta
app.post("/api/preguntas/", async (req, res) => {
   
    if (req.body.pregunta == null || req.body.dificultad == null || req.body.categoria == null || req.body.puntos == null) {
        return res.status(400).send("Faltan datos para crear la pregunta");
    }

    try {
        await createPregunta(
            req.body.pregunta,
            req.body.dificultad,
            req.body.categoria,
            req.body.puntos
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
// Ver todas las respuestas de todas las preguntas
app.get("/api/respuestas/", async (req,res) => {

    const response = await getAllRespuestas();
    
    if (response.length === 0) {
        return res.status(404).json("No hay respuestas");
    }

    return res.status(200).json(response);
}) 



// para poder c
/*curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id_pregunta":"1","respuesta_a":"Manuel Bilbao", "respuesta_b":"Nico Riedel",
  "respuesta_c" : "La peke", "respuesta_correcta": "Manuel Camejo"}' \
  http://localhost:3030/api/respuestas/  */


// crear respuestas de pregunta
app.post("/api/respuestas/", async (req, res) => {

    if( req.body.id_pregunta == null || 
        req.body.respuesta_a == null || 
        req.body.respuesta_b == null || 
        req.body.respuesta_c == null || 
        req.body.respuesta_correcta == null) {
        return res.status(400).send("Faltan datos para crear la respuesta");
    }

    try {
        await createRespuesta(
            req.body.id_pregunta,
            req.body.respuesta_a,
            req.body.respuesta_b,
            req.body.respuesta_c,
            req.body.respuesta_correcta
        );

        return res.status(201).json({
            status: true,
            mensaje: "Respuesta creada exitosamente",
        });
    } catch {
        return res
            .status(400)
            .json({ status: true, mensaje: "No se pudo crear la respuesta" });
    }
   
});



// Modificar la pregunta
app.put("/api/preguntas/:id", async (req, res) => {
   
if (req.body.pregunta == null || req.body.dificultad == null || req.body.categoria == null || req.body.puntos == null) {
        return res.status(400).send("Faltan datos para modificar la pregunta");
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


    if (req.params,id == null) {
        return res.status(400).send("No se mando un id");
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

// obtener usuario buscando por nombre
app.get("/api/usuarios/:nombre",async (req,res) => {

    const response= await getOneUserByNombre(req.params.nombre);
    
    if (response.length == 0){
        return res.status(404).json("El usuario no fue encontrado");
    }

    return res.status(200).json(response);
})





// Crear un usuario
app.post("/api/usuarios", async (req, res) => {
    const { nombre, usuario, password, url_perfil, puntos_totales } = req.body;
    if (nombre == null || usuario == null || password == null) {
        return res.status(400).json({
            status: false,
            mensaje: "Faltan datos para crear el usuario",
        });
    }
    const response = await createUsuario(
        nombre,
        usuario,
        password,
        url_perfil,
        puntos_totales
    );
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "Hubo un error al crear el usuario",
        });
    }
    return res.status(201).json({ status: true, mensaje: "Usuario creado" });
});

// Actualizar un usuario
app.put("/api/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const { nombre, usuario, password, url_perfil, puntos_totales } = req.body;
    if (
        id == undefined ||
        nombre == null ||
        usuario == null ||
        password == null ||
        url_perfil == null ||
        puntos_totales == null
    ) {
        return res
            .status(400)
            .json({ status: false, mensaje: "Faltan datos para el usuario" });
    }
    const response = await updateUsuario(
        id,
        nombre,
        usuario,
        password,
        url_perfil,
        puntos_totales
    );
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "Hubo un error al actualizar el usuario",
        });
    }
    return res.status(200).json({
        status: true,
        mensaje: "El usuario ha sido actualizado correctamente",
    });
});

// Borrar un usuario
app.delete("/api/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    if (id == null) {
        return res
            .status(400)
            .json({ status: false, mensaje: "No se ha ingresado un id" });
    }
    const response = await deleteUsuario(id);
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "Ha ocurrido un error al intentar borrar el usuario",
        });
    }
    return res.status(200).json({
        status: true,
        mensaje: "El usuario se ha borrado correctamente",
    });
});






app.listen(port, () => {
    console.log("Listening on port", port);
});