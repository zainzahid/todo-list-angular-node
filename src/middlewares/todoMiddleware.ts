import { Request, Response, NextFunction } from 'express';

export const validateTodo = (req: Request, res: Response, next: NextFunction) => {
  // Validate req.body properties
  const { title, description, priority, dueDate, status } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title is required and should be at least 3 characters long' });
  }
  if (!description || description.length < 5) {
    return res.status(400).json({ message: 'Description is required and should be at least 5 characters long' });
  }
  if (!priority || !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ message: 'Priority is required and should be one of "low", "medium", or "high"' });
  }
  if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    return res.status(400).json({ message: 'Due Date is required and should be in the format "yyyy-mm-dd"' });
  }  
  if (!status || !['pending', 'inProgress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Status is required and should be one of "pending", "inProgress", or "completed"' });
  }

  // If all validations pass, proceed to the next middleware/controller
  return next();
};
