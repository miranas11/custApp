const express = require("express");
const {
    getAllServices,
    getServiceById,
    searchServices,
    test,
} = require("../controllers/serviceController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/", getAllServices);
router.get("/search", searchServices);
router.get("/test/", test);

router.get("/:id", authenticateToken, getServiceById);

module.exports = router;
