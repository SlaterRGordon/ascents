import { Router } from 'express';
const router = Router();
import auth from "../middleware/auth.js";

import { loadUser, login, register, loginGoogle } from "../controllers/auth.js";

router.get("/loadUser", auth, loadUser);
router.post("/login", login);
router.post("/register", register);
router.post("/loginGoogle", loginGoogle);


export default router;