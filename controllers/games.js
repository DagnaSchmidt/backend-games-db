import express from 'express';
import { pool } from '../app.js';

export const gamesRouter = express.Router();

gamesRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM games");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

gamesRouter.get('/popular-genres', async (req, res) => {
    try {
        const result = await pool.query("SELECT games.genre, COUNT(scores.game_id) FROM scores INNER JOIN games ON scores.game_id = games.id GROUP BY games.genre ORDER BY COUNT(scores.game_id) DESC LIMIT 1");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
