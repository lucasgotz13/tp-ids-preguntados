build-db:
	docker compose up --build postgres

build-backend:
	docker compose up --build backend

build-frontend:
	docker compose up --build frontend

build-app:
	docker compose up --build

start-db:
	docker compose up postgres

start-backend:
	docker compose up backend

start-frontend:
	docker compose up frontend

start-app:
	docker-compose up -d

run-backend-dev:	
	cd ./backend && npm run dev

run-frontend-dev:
	cd ./frontend && http-server --cors
