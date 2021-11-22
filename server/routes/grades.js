import { Router } from 'express';
const router = Router();
import auth from "../middleware/auth.js";

import { getGrades, getGrade, createGrade, deleteGrade } from "../controllers/grade.js";

router.get("/", getGrades);
router.get('/:id', getGrade);
router.post('/', auth, createGrade);
router.delete('/:id', auth, deleteGrade);

export default router;