import express from "express";
import MontyHall from '../simulators/monty-hall';
import { IRoute } from './IRoute';

type ValidationResultSuccess = { changeValue: boolean, numberOfGamesValue: number, success: true };
type ValidationResultFailure = { error: string, success: false };
type ValidationResult = ValidationResultSuccess | ValidationResultFailure;

export default class MontyGame implements IRoute {
    public app: express.Application;

    constructor(app: express.Application, private montyHall: MontyHall) {
        this.app = app;
        this.montyHall = montyHall;
    }

    /**
     * @swagger
     * /simulation:
     *   get:
     *     summary: Simulate the Monty Hall problem
     *     parameters:
     *       - in: query
     *         name: change
     *         schema:
     *           type: boolean
     *         required: true
     *         description: Whether to change the door after the host reveals a goat
     *       - in: query
     *         name: numberOfGames
     *         schema:
     *           type: number
     *         required: true
     *         description: The number of games to simulate
     *     responses:
     *       200:
     *         description: A successful simulation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                 result:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       playerChoice:
     *                         type: number
     *                       hostChoice:
     *                         type: number
     *                       playerFinalChoice:
     *                         type: number
     *                       finalResult:
     *                         type: boolean
     *       400:
     *         description: Invalid parameters
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 code:
     *                   type: number
     *                 message:
     *                   type: string
     *       500:
     *         description: Internal server error
     */

    public routes() {
        this.app.route('/simulation').get(async (req: express.Request, res: express.Response) => {
            const validationResult  = this.validateParameters(req.query);
            if (!validationResult.success) {
                res.status(400).send({
                    code: 101,
                    message: validationResult.error
                });
                return;
            }
    
            const { changeValue, numberOfGamesValue } = validationResult;
            
            try {
                const result = await this.montyHall.simulate(numberOfGamesValue, changeValue);
                res.status(200).send({
                    status: 'success',
                    result
                });
            } catch (e) {
                res.status(500).send('Internal server error');
            }
        });
    }

    private validateParameters(query: any): ValidationResult{
        const { change, numberOfGames } = query;
        if (typeof change !== 'string' || typeof numberOfGames !== 'string') {
            return { error: 'Invalid parameter types', success: false  };
        }
        const changeValue = change === 'true';
        const numberOfGamesValue = parseInt(numberOfGames, 10);
        if (isNaN(numberOfGamesValue) || numberOfGamesValue < 1) {
            return { error: 'Invalid number of games', success: false  };
        }

        return { changeValue, numberOfGamesValue , success: true  };
    }
}
