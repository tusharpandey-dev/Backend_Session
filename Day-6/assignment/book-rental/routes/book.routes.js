const router = require("express").Router();
const ctrl = require("../controllers/book.controller");

router.post("/add-book",ctrl.addBook);
router.post("/rent-book",ctrl.rentBook);
router.post("/return-book",ctrl.returnBook);

router.get("/book-renters/:bookId",ctrl.getBookRenters);

router.put("/update-book/:bookId",ctrl.updateBook);
router.delete("/delete-book/:bookId",ctrl.deleteBook);

module.exports = router;