up:
	@docker-compose pull
	@docker-compose up -d --build
	@docker-compose ps

down:
	@docker-compose down

ps:
	@docker-compose ps

logs:
	@docker-compose logs --follow simple-authentication-api | ./node_modules/.bin/bunyan
