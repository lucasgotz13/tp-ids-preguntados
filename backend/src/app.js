const express = require("express");
const cors = require("cors");

const app = express();

const port = 3030;

app.use(cors());
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
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarios,
    getOneUserByUsuario,
    updateRespuesta,
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

// obtener usuario buscando por usuario
app.get("/api/usuarios/:usuario",async (req,res) => {

    const response= await getOneUserByUsuario(req.params.usuario);
    
    if (response.length == 0){
        return res.status(404).json({
            status: false,
            mensaje: "El usuario no fue encontrado",
        });
    }

    return res.status(200).json(response[0]);
})

app.get("/api/usuarios/id/:id",async (req,res) => {

    const response= await getOneUser(req.params.id);
    
    if (response.length == 0){
        return res.status(404).json({
            status: false,
            mensaje: "El usuario no fue encontrado",
        });
    }

    return res.status(200).json(response[0]);
})

app.get("/api/usuarios/id/:id",async (req,res) => {

    const response= await getOneUser(req.params.id);
    
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
    console.log(req.body)
    if (
        req.body.pregunta == null ||
        req.body.dificultad == null ||
        req.body.categoria == null ||
        req.body.puntos == null ||
        req.body.id_usuario == null ||
        req.body.respuesta_a == null ||
        req.body.respuesta_b == null ||
        req.body.respuesta_c == null ||
        req.body.respuesta_correcta == null
    ) {
        return res.status(400).json({
            status: false,
            mensaje: "Faltan datos para crear la pregunta o la respuesta",
        });
    }

    try {
        await createPregunta(
            req.body.pregunta,
            req.body.dificultad,
            req.body.categoria,
            req.body.puntos,
            req.body.id_usuario
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

app.put("/api/respuestas/:id", async (req, res) => {
    const {respuesta_a, respuesta_b, respuesta_c, respuesta_correcta} = req.body
    const id = req.params.id
    console.log(req.body)

    if (id == null) {
        return res.status(400).json({
            status: false,
            mensaje: "No se ingreso el id de la respuesta"
        })
    }

    if (respuesta_a == null || respuesta_b == null || respuesta_c == null || respuesta_correcta == null) {
        return res.status(400).json({
            status: false,
            mensaje: "Faltan datos para modificar la respuesta"
        })
    }

    const response = await updateRespuesta(id, respuesta_a, respuesta_b, respuesta_c, respuesta_correcta)
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "No se pudo modificar la respuesta"
        })
    }

    return res.status(200).json({
        status: true,
        mensaje: "La respuesta fue modificada correctamente"
    })
})

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

    const response = await deletePregunta(req.params.id);
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "No se pudo borrar la pregunta o la pregunta no existe",
        });
    }

    return res
        .status(200)
        .json({ status: true, mensaje: "Pregunta borrada exitosamente" });
});

// Obtener todos los usuarios
app.get("/api/usuarios/", async (req, res) => {
    const response = await getUsuarios();

    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "Ha ocurrido un error al intentar obtener los usuarios",
        });
    }
    if (response.length == 0) {
        return res
            .status(404)
            .json({ status: false, mensaje: "No hay usuarios" });
    }

    return res.status(200).json(response);
});



// Crear un usuario
app.post("/api/usuarios", async (req, res) => {
    const { nombre, usuario, edad, url_perfil, mejor_puntaje } = req.body;
    if (nombre == null || usuario == null || edad == null) {
        return res.status(400).json({
            status: false,
            mensaje: "Faltan datos para crear el usuario",
        });
    }
    if (edad < 0 || edad > 100) return res.status(400).json({
        status: false,
        mensajeEdad: "La edad no es valida"
    })

    //confirmo si el usuario ya existe

    const existe= await getOneUserByUsuario(usuario);

    if (existe.length != 0) return res.status(400).json({
        status: false,
        mensajeUsuario: "El usuario ya existe"
    })


    const response = await createUsuario(
        nombre,
        usuario,
        edad,
        url_perfil,
        mejor_puntaje
    );
    if (!response) {
        return res.status(400).json({
            status: false,
            mensaje: "Hubo un error al crear el usuario",
        });
    }
    return res.status(201).json({ status: true, mensaje: "Usuario creado", usuario: {nombre: nombre, usuario: usuario, edad: edad, url_perfil: url_perfil, mejor_puntaje: mejor_puntaje} });
});

// Actualizar un usuario
app.put("/api/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const { nombre, usuario, edad, url_perfil, mejor_puntaje } = req.body;
    if (
        id == undefined ||
        nombre == null ||
        usuario == null ||
        edad == null ||
        url_perfil == null ||
        mejor_puntaje == null
    ) {
        return res
            .status(400)
            .json({ status: false, mensaje: "Faltan datos para el usuario" });
    }
    
    // comprobar edad valida
       if (edad < 0 || edad > 100) return res.status(400).json({
        status: false,
        mensajeEdad: "La edad no es valida"
        })

    // comprobar si el usuario va a ser el mismo

    const usuarioAnterior= await getOneUser(id);

    if( usuarioAnterior.length >0 && usuarioAnterior[0].usuario === usuario ){
        const response = await updateUsuario(
            id,
            nombre,
            usuario,
            edad,
            url_perfil,
            mejor_puntaje
        );
        if (!response) {
            return res.status(400).json({
                status: false,
                mensaje: "Hubo un error al actualizar el usuario",
            });
        }
        return res.status(200).json({
            id: id,
            nombre: nombre,
            usuario: usuario,
            edad: edad,
            url_perfil: url_perfil,
            mejor_puntaje: mejor_puntaje
        });
    }else{ //compruebo si el nombre de usuario ya existe
        const existe= await getOneUserByUsuario(usuario);

        if (existe.length != 0) return res.status(400).json({
            status: false,
            mensajeUsuario: "El usuario ya existe"
        });

        const response = await updateUsuario(
            id,
            nombre,
            usuario,
            edad,
            url_perfil,
            mejor_puntaje
        );
        if (!response) {
            return res.status(400).json({
                status: false,
                mensaje: "Hubo un error al actualizar el usuario",
            });
        }
        return res.status(200).json({
            id: id,
            nombre: nombre,
            usuario: usuario,
            edad: edad,
            url_perfil: url_perfil,
            mejor_puntaje: mejor_puntaje
        });


        }
    
    
    
    
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