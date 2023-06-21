import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";
import connect from "./db";

const app: Application = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
const corsMiddleware = cors(corsOptions);  
app.use(corsMiddleware);

app.use('/auth', authRoutes);
app.use("/todo", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connecting to DB
connect();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../fe-angular/dist/fe-angular')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../fe-angular/dist/fe-angular', 'index.html'));
});


