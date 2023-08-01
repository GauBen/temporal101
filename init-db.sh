#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER app WITH PASSWORD 'app' CREATEDB;
	CREATE DATABASE app;
	GRANT ALL PRIVILEGES ON DATABASE app TO app;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER temporal WITH PASSWORD 'temporal' CREATEDB;
	CREATE DATABASE temporal;
	GRANT ALL PRIVILEGES ON DATABASE temporal TO temporal;
EOSQL
