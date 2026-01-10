# Poker Server API

This is a simple .NET API server project named "poker-server". 

## Overview

The poker-server API is designed to provide health status information and serve as a foundation for further development of poker-related functionalities.

## Project Structure

- **Controllers/**: Contains the API controllers.
  - `HealthController.cs`: Manages health check endpoints.
  
- **Properties/**: Contains project properties.
  - `launchSettings.json`: Configuration for launching the application in different environments.
  
- **Program.cs**: The entry point of the application, setting up the web host and configuring services.

- **appsettings.json**: General configuration settings for the application.

- **appsettings.Development.json**: Development-specific settings that override the general configuration.

- **poker-server.csproj**: Project file that defines properties, dependencies, and build settings.

## Getting Started

To run the project, ensure you have the .NET SDK installed. You can then build and run the application using the following commands:

```bash
dotnet build
dotnet run
```

## Health Check

The API includes a health check endpoint to verify that the server is running correctly. You can access it at:

```
GET /health
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.