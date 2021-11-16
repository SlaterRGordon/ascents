import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/index.js';

import authRouter from'./routes/auth.js';
import climbRouter from'./routes/climbs.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/auth", authRouter);
app.use("/climbs", climbRouter);

const { MONGO_URI, MONGO_DB_NAME, PORT } = config;
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);