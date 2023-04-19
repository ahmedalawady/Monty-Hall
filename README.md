# Monty Hall Simulation API

This is a simple API to simulate the Monty Hall problem. The API allows you to run multiple simulations with the option to change or keep the initial door choice after the host reveals a goat.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Docker installed on your local machine.

### Installation

1. Clone the repo
```bash
git clone git@github.com:ahmedalawady/Monty-Hall.git
```
2. Build the Docker image
```bash 
docker build -t monty-hall-simulation .
```
3. Run the Docker container 
```bash
docker run -p 3000:3000 monty-hall-simulation
```

The server will run on http://localhost:3000, and the API documentation can be accessed at http://localhost:3000/api-docs.

### Technologies:

- Typescript 
- Nodejs
- Expres
- Docker

### Design and Tradeoff

- No databases used as saving simulation results was not required.
- Separated MontyHall class for modularity and separation of concerns, allowing easy modification without affecting routes.
- Generic Routes class designed to facilitate the addition of new APIs in the future.
- Containerization with Docker for simplified deployment and portability.
- ESLint and Prettier integration to maintain code consistency and improve maintainability.
- No authentication required

### Make it more to be production service

- Logging 
- Error handling
- Increase test coverage
- Authentication 
- Rate Limit
- Validation limits 



