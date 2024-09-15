const express = require("express");
const {
    getAllServices,
    getServiceById,
    searchServices,
} = require("../controllers/serviceController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", getAllServices);
router.get("/search", searchServices);

router.get("/:id", authenticateToken, getServiceById);

module.exports = router;
