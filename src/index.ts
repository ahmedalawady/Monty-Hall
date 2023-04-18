import Routes from "./routes";
import express from "express";
import bodyParser from "body-parser";
import MontyHall from "./simulators/monty-hall";
import MontyGame from "./routes/monty-game";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 3000;

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Monty Hall Simulation API",
        version: "1.0.0",
        description: "A simple API to simulate the Monty Hall problem",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
    apis: ["./src/routes/monty-game.ts"], 
  };
  
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(bodyParser.json());
const montyHall = new MontyGame(app, new MontyHall());
new Routes(app, [ montyHall ]);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export default app;