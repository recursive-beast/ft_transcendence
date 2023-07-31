COMPOSE := docker compose -f docker-compose.yml -f docker-compose.dev.yml

.PHONY: up up-dev up-prod config config-prod down logs shell shell-backend shell-nginx clean

up: up-prod

up-prod:
	docker compose up --build -d

up-dev:
	$(COMPOSE) -f docker-compose.yml -f docker-compose.dev.yml up --build -d

down:
	$(COMPOSE) down --remove-orphans

restart:
	$(COMPOSE) restart $(SERVICE)

logs:
	$(COMPOSE) logs -f $(SERVICE)

shell:
	$(COMPOSE) exec -it $(SERVICE) sh

shell-backend:
	$(COMPOSE) exec -it backend sh

shell-nginx:
	$(COMPOSE) exec -it nginx sh

clean:
	@echo "Stopping and removing all running containers..."
	@docker stop $$(docker ps -aq) 2>/dev/null || true
	@docker rm $$(docker ps -aq) 2>/dev/null || true

	@echo "Removing all Docker images..."
	@docker rmi $$(docker images -aq) 2>/dev/null || true

	@echo "Removing all Docker volumes..."
	@docker volume rm $$(docker volume ls -q) 2>/dev/null || true

	@echo "Removing all Docker networks..."
	@docker network rm $$(docker network ls -q) 2>/dev/null || true
