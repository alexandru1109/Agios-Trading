import { Router } from "express";
import { predictStock } from "../controllers/lstmController";

const router = Router();

router.post("/predict", predictStock);

export default router;
