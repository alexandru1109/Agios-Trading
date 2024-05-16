"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketController_1 = require("../controllers/marketController");
const router = (0, express_1.Router)();
router.get('/market-summary', marketController_1.getMarketSummary);
exports.default = router;
