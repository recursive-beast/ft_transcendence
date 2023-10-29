DOCKER 	:= /usr/local/bin/docker
COMPOSE	:= $(DOCKER) compose -f docker-compose.yml -f docker-compose.dev.yml

.PHONY: up up-dev up-prod config config-prod down logs shell shell-backend shell-nginx clean

up: up-dev

up-prod:
	docker compose up --build -d

up-dev:
	$(COMPOSE) up --build -d

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

clean: down
	@echo "Removing all containers..."
	-@$(DOCKER) rm $$($(DOCKER) ps -aq) 2>/dev/null || true

	@echo "Removing all Docker images..."
	-@$(DOCKER) rmi $$($(DOCKER) images -aq) 2>/dev/null || true

	@echo "Removing all Docker volumes..."
	-@$(DOCKER) volume rm $$($(DOCKER) volume ls -q) 2>/dev/null || true

	@echo "Removing all Docker networks..."
	-@$(DOCKER) network rm $$($(DOCKER) network ls -q) 2>/dev/null || true
