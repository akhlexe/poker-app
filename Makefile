.PHONY: help install build run clean dev test server client health

# Default target
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies for both client and server"
	@echo "  make build         - Build both client and server"
	@echo "  make run           - Run both client and server"
	@echo "  make dev           - Run client in dev mode and server"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make test          - Run tests"
	@echo ""
	@echo "Client commands:"
	@echo "  make client-install - Install client dependencies"
	@echo "  make client-build   - Build client"
	@echo "  make client-dev     - Run client in dev mode"
	@echo "  make client-clean   - Clean client build"
	@echo ""
	@echo "Server commands:"
	@echo "  make server-restore - Restore server dependencies"
	@echo "  make server-build   - Build server"
	@echo "  make server-run     - Run server"
	@echo "  make server-clean   - Clean server build"
	@echo "  make server-health  - Check server health endpoint"

# Install all dependencies
install: client-install server-restore

# Build all projects
build: client-build server-build

# Run both projects (in background for client)
run: server-run

# Development mode
dev: client-dev

# Clean all builds
clean: client-clean server-clean

# Test all projects
test: client-test server-test

# ============================================
# Client Commands
# ============================================

client-install:
	@echo "Installing client dependencies..."
	cd poker-client && npm install

client-build:
	@echo "Building client..."
	cd poker-client && npm run build

client-dev:
	@echo "Starting client in dev mode..."
	cd poker-client && npm run dev

client-clean:
	@echo "Cleaning client build..."
	cd poker-client && rm -rf dist node_modules

client-test:
	@echo "Running client tests..."
	cd poker-client && npm test

# ============================================
# Server Commands
# ============================================

server-restore:
	@echo "Restoring server dependencies..."
	cd poker-server && dotnet restore

server-build:
	@echo "Building server..."
	cd poker-server && dotnet build

server-run:
	@echo "Running server..."
	cd poker-server && dotnet run --project PokerApi

server-clean:
	@echo "Cleaning server build..."
	cd poker-server && dotnet clean

server-test:
	@echo "Running server tests..."
	cd poker-server && dotnet test

server-health:
	@echo "Checking server health..."
	@curl -s http://localhost:5000/health || echo "Server not responding"
