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


INSERT INTO usuarios (nombre, usuario, edad, url_perfil, mejor_puntaje)
VALUES ('Francisco Domínguez', 'fran123', 25, '', 0);


INSERT INTO preguntas (pregunta, dificultad, categoria, puntos, id_usuario) VALUES
('¿Cuál es la capital de Francia?', 'Facil', 'Mundi', 10, 1),
('¿Qué país ganó más Copas del Mundo?', 'Intermedio', 'Deportes', 20, 1),
('¿Quién dirigió la película Titanic?', 'Intermedio', 'Cine', 15, 1),
('¿Cuál es el país más grande del mundo?', 'Intermedio', 'Mundi', 15, 1),
('¿Quién ganó la Champions League 2022?', 'Dificil', 'Deportes', 25, 1),
('¿Quién interpreta a Iron Man?', 'Facil', 'Cine', 10, 1),
('¿Cuál es el río más largo del mundo?', 'Intermedio', 'Mundi', 20, 1),
('¿Cuántos jugadores hay en un equipo de fútbol?', 'Facil', 'Deportes', 10, 1),
('¿En qué año se estrenó El Padrino?', 'Dificil', 'Cine', 25, 1),
('¿Dónde se encuentra el monte Everest?', 'Intermedio', 'Mundi', 20, 1),
('¿Qué deporte practica Lionel Messi?', 'Facil', 'Deportes', 10, 1),
('¿Quién dirigió "Inception"?', 'Intermedio', 'Cine', 15, 1),
('¿Cuál es el país más poblado del mundo?', 'Intermedio', 'Mundi', 15, 1),
('¿Cuánto dura un partido de básquet profesional?', 'Intermedio', 'Deportes', 15, 1),
('¿Cuántos Oscar ganó El Retorno del Rey?', 'Dificil', 'Megamix', 30, 1);


INSERT INTO respuestas (respuesta_a, respuesta_b, respuesta_c, respuesta_correcta, id_pregunta) VALUES
('Madrid', 'París', 'Roma', 'b', 1),
('Brasil', 'Alemania', 'Italia', 'a', 2),
('James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'a', 3),
('Canadá', 'Rusia', 'China', 'b', 4),
('Real Madrid', 'Liverpool', 'Manchester City', 'a', 5),
('Robert Downey Jr.', 'Chris Evans', 'Tom Holland', 'a', 6),
('Nilo', 'Amazonas', 'Yangtsé', 'b', 7),
('10', '11', '12', 'b', 8),
('1972', '1974', '1980', 'a', 9),
('India', 'Nepal', 'China', 'b', 10),
('Básquet', 'Fútbol', 'Tenis', 'b', 11),
('Martin Scorsese', 'James Cameron', 'Christopher Nolan', 'c', 12),
('China', 'India', 'Estados Unidos', 'a', 13),
('40 minutos', '48 minutos', '60 minutos', 'b', 14),
('10', '11', '13', 'b', 15);



-- password VARCHAR(30) NOT NULL, 