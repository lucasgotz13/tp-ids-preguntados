const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3030;

//Health route
app.get('api/health', (req,res)=> {

    res,json({ status: 'OK'});
})

// get un usuario
app.get('/api/user/:id', (req,res)=> {
    



})

// insertar un usuario
app.post('/api/user', (req, res) => {

});

// insertar una pregunta
app.post('/api/question', (req, res) => {

    //insertar: dificultad, pregunta, respuesta, opciones

});



// actualizar un usuario
app.put('/api/user/:id', (req, res) => {

});

// eliminar una pregunta
app.delete('/api/question/:id', (req, res) => {



})









app.listen(PORT, () => {
    console.log ('server is running on port', PORT);

})