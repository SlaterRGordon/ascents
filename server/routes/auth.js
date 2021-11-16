import { Router } from 'express';
const router = Router();

import { login, register, loginGoogle } from "../controllers/auth.js";

router.post("/login", login);
router.post("/register", register);
router.post("/loginGoogle", loginGoogle);


export default router;