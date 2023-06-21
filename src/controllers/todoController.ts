import { Request, Response } from "express";
import Todo, { ITodo } from "../models/Todo";

export const getTodo = (req: Request, res: Response) => {
  Todo.find({ user: req['user']?.userId })
    .then((todos) => {
      return res.status(200).json({
        message: "Todos fetched successfully",
        todos,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  Todo.findOne({ _id: id, user: req['user']?.userId })
    .then((todo) => {
      if (todo) {
        return res.status(200).json({
          message: "Todo fetched successfully",
          todo,
        });
      } else {
        return res.status(404).json({
          message: "Todo not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};


export const createTodo = (req: Request, res: Response) => {
  const { title, description, priority, dueDate, status } = req.body;

  const todo: ITodo = new Todo({
    title,
    description,
    priority,
    dueDate,
    status,
    user: req['user']?.userId
  });

  todo
  .save()
  .then((result) => {
    return res.status(201).json({
      message: "Todo created successfully",
      todo: result,
    });
  })
  .catch((error) => {
    return res.status(500).json({ error });
   });
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  const { title, description, priority, dueDate, status } = req.body;

  Todo.findOneAndUpdate(
    { _id: id, user: req['user']?.userId },
    { title, description, priority, dueDate, status },
    { new: true }
  )
  .then((result) => {
    if (result) {
      return res.status(200).json({
        message: "Todo updated successfully",
        todo: result,
      });
    } else {
      return res.status(404).json({
        message: "Todo not found",
      });
    }
  })
  .catch((error) => {
    return res.status(500).json({ error });
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  Todo.findOneAndDelete({ _id: id, user: req['user']?.userId })
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: "Todo deleted successfully",
          todo: result,
        });
      } else {
        return res.status(404).json({
          message: "Todo not found",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
