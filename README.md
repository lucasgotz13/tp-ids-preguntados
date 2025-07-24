# 🎮 City Quiz GAME 🚀

Repositorio oficial de City Quiz. Este es un juego con fines de entretenimiento para poner a prueba tus conocimientos en diferentes categorias como deporte, cine, geografia, ¡y mucho màs! 

---

## El desarrollo de la aplicación fue realizado con:

* **Frontend (Juego):**
    * Lenguaje: JavaScript, HTML, CSS.
    * Librerías/Frameworks: Bulma,
* **Backend (API):**
    * Framework: Node.js (Express).
    * Lenguaje: JavaScrip.
    * Librerías: pg, dotenv, cors.
* **Base de Datos:**
    * Motor de base de datos: PostgreSQL
* **Herramientas:**
    * Git, Docker.

---

## ✨ Características Principales

* 4 categorias con diferentes niveles de dificultad.
* Creacion, eliminacion y edicion de preguntas.
* Creacion, eliminacion y edicion de usuarios.
* Persistencia de datos del juego (puntuaciones, usuarios, preguntas).
* API REST para comunicación con la base de datos.

---

## 🚀 Requisitos del Sistema

Antes de empezar, asegúrate de tener instalado lo siguiente:

* **Git** Para clonar el repositorio.
* **Dispositivo Unix-Like** para poder ejecutar los comandos .
* **Docker** para poder levantar los conenedores.

---

## ⚙️ Instalación local

Sigue estos pasos para poner el juego enfuncionamiento:

### 1. Clonar el Repositorio
En tu terminal copiar el siguiente comando:
```bash
git clone [https://github.com/lucasgotz13/tp-ids-preguntados]
cd tp-ids-preguntados
```
### 2. Agregar variables de entorno
```env
DB_HOST=variable_host
DB_USER=variable_user
DB_PASSWORD=variable_password
DB_NAME=variable_nombre
DB_PORT=variable_puerto
```

### 2. Levantar los contenedores
En tu terminal copiar los siguientes comandos dependiendo la opcion elegida: \
**Opcion 1.**
```bash
make build-app 
```
**Opcion 2.**
```bash
docker compose up --build
```
**Opcion 3. (todo por separado)**

Crear base de datos:
```bash
	docker compose up --build postgres
```

Levantar backend:
```bash
	docker compose up --build backend
```

Levantar frontend:
```bash
	docker compose up --build frontend
```

Levantar app:
```bash
	docker compose up --build
```

Iniciar base de datos:
```bash
	docker compose up postgres
```

Iniciar el backend:
```bash
	docker compose up backend
```

Iniciar el frontend:
```bash
	docker compose up frontend
```

Iniciar la app:
```bash
	docker-compose up -d
```

Correr en dev para la API REST:
```bash	
	cd ./backend && npm run dev
```

Levantar cors para frontend:
```bash
	cd ./frontend && http-server --cors -c-1
```

### 3. Ingresar a un navegador web
En tu navegador de preferencia pegar la siguiente URL:  
http://localhost:8080/login-regis/index.html \
![Navegador:](/img_readme/localhost8080regis.jpg)

### LISTO! 🎉
Ya tenes corriendo tu juego con el API REST, Base de datos y frontend. 

---
### 🌐 Despliegue 
**Tambien podes jugar ingresando al siguiente enlace:**
https://tp-ids-preguntados.onrender.com/menu/index.html

---

### COMO JUGAR 
1. Ingresar o Registrarse en el juego, esto dependiendo de si ya tenes una cuenta creada. 
2. ¡Jugar! Podes:
- Crear preguntas: En la parte superior clickeas en "crear pregunta" y luego completas los campos.

- Editar tus preguntas: Si ya creaste previamente una pregunta podras editarla para cambiar su contenido o borrarla.

- Editar/borrar tu usuario. Selecionando "usuario" se te desplegarà el menu para que puedas realizar estas acciones. 

- Elegir tu desafio: Podras elegir entre nuestras 4 tarjetas la categoria con la que queres jugar. Tener en cuenta que en las categorias deporte, cine y mundi se jugara con 5 preguntas por ronda y en la categoria especial megamix se jugara con 15, esta ultima puede contener preguntas de las otras categorias o algunas con diversas temàticas.

- Jugar: Selecciona la opcion que creas correcta y luego clickea el boton de "siguiente pregunta". Si tu respuesta fue correcta se te sumaran los puntos dependiendo la dificultad de la pregunta. \
Dificultad: \
-Facil: 10 puntos \
-Medio: 20puntos \
-Dificil: 30 puntos 

- Fin del Juego: Al finalizar el juego se te mostrara la puntuacion obtenida en la partida y tu mejor puntaje registrado. Ademas podras ver el ranking de todos los usuarios.

---
## GALERIA del juego
**Ingresar**
![](/img_readme/inicio_ses.jpg)
**Registrarse**
![](/img_readme/regis.jpg)
**Menu**
![](/img_readme/menu.jpg)
**Editar pregunta**
![](/img_readme/edit_preg.jpg)
**Editar usuario**
![](/img_readme/edit_user.jpg)
**Crear Pregunta**
![](/img_readme/crea_preg.jpg)
**Juego**
![](/img_readme/juego.jpg)
**Fin de partida**
![](/img_readme/fin.jpg)

---
### CONTACTO: 
Instagram: @city_quiz_official 

---

### Informacion de desarrolladores:
**Grupo:** echo_boca

**Integrantes:**
- Ludmila Conti Janega
- Agustin Gancedo
- Lucas Gotz Baliner
- Francisco Jose Domina VIgnau 

