const router = require("express").Router();
const ctrl = require("../controllers/user.controller");

router.post("/add-user",ctrl.addUser);
router.get("/user-rentals/:userId",ctrl.getUserRentals);

module.exports = router;