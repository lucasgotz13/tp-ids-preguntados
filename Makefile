run-db: 
	cd ./backend && docker-compose up -d

run-backend:	
	cd ./backend && npm run dev

run-frontend:
	cd ./frontend && http-server --cors -c-1
