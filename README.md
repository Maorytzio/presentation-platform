# Presentation Platform API

This project is a server-side service built using Node.js and Express for managing presentations and slides. The application allows users to create, fetch, update, and delete presentations and slides, using MongoDB as the database and includes API documentation with Swagger.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (Ensure you have MongoDB installed and running)

## Features

- Create, read, update, and delete (CRUD) operations for presentations and slides.
- MongoDB for data persistence.
- Swagger documentation for the API.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/your-username/presentation-platform.git>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd presentation-platform
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Environment Variables

Create a \`.env\` file in the root directory of your project and add the following environment variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/presentations
```
- **\`PORT\`**: The port on which the server will run.
- **\`MONGO_URI\`**: The MongoDB connection string.

## Running the Application

To start the server dev mode where Swagger is available, run:

```bash
npm run dev
```
The server will start on \`<http://localhost:3000\`>.

To start the server , run:
```bash
npm start
```

## API Documentation

The API is documented with Swagger. To access the documentation:

1. Make sure the server is running in dev mode ``` npm run dev```.
2. Open your browser and navigate to \`<http://localhost:3000/api-docs\`>.

## CRUD Operations

### Presentation Operations

- **Create a New Presentation**: Send a `POST` request to `/presentations` with the title, authors, and Slides.
- **Fetch a Presentation by Title (Unique)**: Send a `GET` request to `/presentations/:title`.
- **Get All Presentations**: Send a `GET` request to `/presentations`.
- **Update a Presentation**: Send a `PUT` request to `/presentations/:title`.
- **Delete a Presentation**: Send a `DELETE` request to `/presentations/:title`.

### Slide Operations

- **Add a Slide to a Presentation**: Send a `POST` request to `/presentations/:title/slides` with the slide content.
- **Altering a Slide**: Send a `PUT` request to `/presentations/:title/slides/:slideId` to update a slide's content.
- **Deleting a Slide**: Send a `DELETE` request to `/presentations/:title/slides/:slideId`.
- **Altering the Authors List**: Send a `PUT` request to `/presentations/:title` to update the authors list.
