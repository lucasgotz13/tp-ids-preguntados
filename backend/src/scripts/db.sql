CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(100),
    usuario VARCHAR(30),
    password VARCHAR(30), 
    url_perfil VARCHAR(1000), 
    puntos_totales INT );

CREATE TABLE preguntas (
    id SERIAL PRIMARY KEY, 
    pregunta VARCHAR(255), 
    dificultad VARCHAR(50), 
    categoria VARCHAR(50), 
    puntos INT );