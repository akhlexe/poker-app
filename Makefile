.PHONY: help install build run clean dev test server client health

# Use PowerShell on Windows
SHELL := pwsh.exe
.SHELLFLAGS := -NoProfile -Command

# Default target
help:
	@Write-Host "Available commands:"
	@Write-Host "  make install       - Install dependencies for both client and server"
	@Write-Host "  make build         - Build both client and server"
	@Write-Host "  make run           - Run both client and server"
	@Write-Host "  make dev           - Run client in dev mode and server"
	@Write-Host "  make clean         - Clean build artifacts"
	@Write-Host "  make test          - Run tests"
	@Write-Host ""
	@Write-Host "Client commands:"
	@Write-Host "  make client-install - Install client dependencies"
	@Write-Host "  make client-build   - Build client"
	@Write-Host "  make client-dev     - Run client in dev mode"
	@Write-Host "  make client-clean   - Clean client build"
	@Write-Host ""
	@Write-Host "Server commands:"
	@Write-Host "  make server-restore - Restore server dependencies"
	@Write-Host "  make server-build   - Build server"
	@Write-Host "  make server-run     - Run server"
	@Write-Host "  make server-clean   - Clean server build"
	@Write-Host "  make server-health  - Check server health endpoint"

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
	@Write-Host "Installing client dependencies..."
	Set-Location poker-client; npm install

client-build:
	@Write-Host "Building client..."
	Set-Location poker-client; npm run build

client-dev:
	@Write-Host "Starting client in dev mode..."
	Set-Location poker-client; npm run dev

client-clean:
	@Write-Host "Cleaning client build..."
	Set-Location poker-client; if (Test-Path dist) { Remove-Item -Recurse -Force dist }; if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }

client-test:
	@Write-Host "Running client tests..."
	Set-Location poker-client; npm test

# ============================================
# Server Commands
# ============================================

server-restore:
	@Write-Host "Restoring server dependencies..."
	Set-Location poker-server; dotnet restore

server-build:
	@Write-Host "Building server..."
	Set-Location poker-server; dotnet build

server-run:
	@Write-Host "Running server..."
	Set-Location poker-server; dotnet run --project PokerApi

server-clean:
	@Write-Host "Cleaning server build..."
	Set-Location poker-server; dotnet clean

server-test:
	@Write-Host "Running server tests..."
	Set-Location poker-server; dotnet test

server-health:
	@Write-Host "Checking server health..."
	try { Invoke-RestMethod -Uri http://localhost:5000/health } catch { Write-Host "Server not responding" }
