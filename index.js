import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import conversationsRoutes from './routes/conversations.js';
import messagesRoutes from './routes/messages.js';
import varify from './middleware/middleware.js'

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "public/images")));
dotenv.config();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});
  
const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
});


app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/posts', varify, postRoutes);
app.use('/api/users', varify,  userRoutes);

const CONNECTION_URL = process.env.SERVER;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`)))
  .catch((error) =>console.log(error.message));
