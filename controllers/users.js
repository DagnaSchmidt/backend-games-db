import express from 'express';
import { pool } from '../app.js';

export const usersRouter = express.Router();

usersRouter.get('/players-scores', async (req, res) => {
    try {
        const result = await pool.query("SELECT players.name, games.title, scores.score FROM scores INNER JOIN players ON scores.player_id = players.id INNER JOIN games ON scores.game_id = games.id");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

usersRouter.get('/top-players', async (req, res) => {
    try {
        const result = await pool.query("SELECT players.name, SUM(scores.score) FROM scores INNER JOIN players ON scores.player_id = players.id GROUP BY players.name ORDER BY SUM(scores.score) DESC LIMIT 3");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

usersRouter.get('/inactive-players', async (req, res) => {
    try {
        const result = await pool.query("SELECT players.name FROM players LEFT OUTER JOIN scores ON players.id = scores.player_id WHERE scores.player_id IS NULL");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

usersRouter.get('/recently-joined', async (req, res) => {
    try {
        const result = await pool.query("SELECT players.name, players.join_date FROM players WHERE join_date > CURRENT_DATE - INTERVAL '30 days'");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
