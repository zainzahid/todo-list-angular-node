import express from "express";
import { validateTodo } from "../middlewares/todoMiddleware";
import {
    getTodo,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todoController";
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getTodo);
router.get('/:id', authenticateToken, getTodoById);
router.post('/', authenticateToken, validateTodo, createTodo);
router.put('/:id', authenticateToken, validateTodo, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

export default router;
