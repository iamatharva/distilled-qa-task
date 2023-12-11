# Makefile for local development
COMPOSE := $(shell which docker-compose || echo 'docker compose')

run_e2e_test:
	rm -rf screenshots
	$(COMPOSE) down -v && \
	$(COMPOSE) up --build e2etest
