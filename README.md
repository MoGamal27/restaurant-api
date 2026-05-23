# Restaurant Management API

A comprehensive backend system for managing restaurants, user interactions, and personalized recommendations built with NestJS and MongoDB.

## Features

### Restaurant Management
- Create Restaurant: Add new restaurants with dual-language names (English and Arabic), unique slugs, and cuisine categories (1-3 per restaurant).
- List Restaurants: Retrieve all restaurants with optional filtering by cuisine.
- Get Restaurant Details: Fetch specific restaurant information using either its MongoDB ID or its unique slug.
- Find Nearby Restaurants: Locate restaurants within a 1KM radius using MongoDB GeoSpatial 2dsphere indexing and queries.

### User Interaction
- User Management: Create and manage user profiles with favorite cuisine preferences.
- Following System: Enable many-to-many relationships where users can follow multiple restaurants and restaurants can have multiple followers.
- Personalization: Targeted features based on user preferences and behavior.

### Recommendation Engine
A sophisticated recommendation API that uses a 3-step MongoDB Aggregation Pipeline:
1. Identify other users who share at least one favorite cuisine with the target user.
2. Aggregate the list of restaurants followed by those similar users.
3. Return the list of similar users and the recommended restaurants.

## Tech Stack
- Framework: NestJS (TypeScript)
- HTTP Server: Express.js
- Database: MongoDB
- ODM: Mongoose
- Documentation: Swagger / OpenAPI
- Validation: Class-validator and Class-transformer


## API Documentation

The project uses Swagger for interactive API documentation. Once the application is running, you can access the UI at:

http://localhost:3000/api

This documentation provides detailed information about all endpoints, request payloads (DTOs), and response formats.

## Architecture

This project follows a modular design pattern:
- Modules: Encapsulate related functionality (Restaurants, Users, Follows).
- Controllers: Handle incoming HTTP requests and routing.
- Services: Contain business logic and database interactions.
- DTOs: Define data structures for input validation and Swagger documentation.
- Schemas: Define Mongoose models and database constraints.
