CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    edad INT NOT NULL CHECK (edad >= 0 AND edad <= 100),
    url_perfil VARCHAR(1000),
    mejor_puntaje INT );


CREATE TABLE preguntas (
    id SERIAL PRIMARY KEY,
    pregunta VARCHAR(255),
    dificultad VARCHAR(50),
    categoria VARCHAR(50),
    puntos INT,
    id_usuario INT REFERENCES usuarios(id)
    );

create table respuestas (
    id SERIAL PRIMARY KEY,
    respuesta_a VARCHAR(255),
    respuesta_b VARCHAR(255),
    respuesta_c VARCHAR(255),
    respuesta_correcta varchar(255),
    id_pregunta INT REFERENCES preguntas(id)
     );
