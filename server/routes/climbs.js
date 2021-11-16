import { Router } from 'express';
const router = Router();
import auth from "../middleware/auth.js";

import { getClimbs, getClimb, createClimb, deleteClimb } from "../controllers/climb.js";

router.get("/", getClimbs);
router.get('/:id', getClimb);
router.post('/', auth, createClimb);
router.delete('/:id', auth, deleteClimb);

export default router;