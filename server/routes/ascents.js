import { Router } from 'express';
const router = Router();
import auth from "../middleware/auth.js";

import { getAscents, getAscentsByUser, createAscent, deleteAscent } from "../controllers/ascent.js";

router.get("/", getAscents);
router.get('/', getAscentsByUser);
router.post('/', createAscent);
router.delete('/:id', auth, deleteAscent);

export default router;