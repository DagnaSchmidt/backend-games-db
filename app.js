import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './utils/config.js';

// import routes
import { gamesRouter } from './controllers/games.js';
import { usersRouter } from './controllers/users.js';
// import middleware

export const app = express();

const { Pool } = pg;
export const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// middleware
// routes
app.use('/api/games', gamesRouter);
app.use('/api/users', usersRouter);
