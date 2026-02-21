const express = require("express");
const Loan = require("../models/loan.model");
const router = express.Router();

router.get("/analytics/borrowed-books", async (req, res) => {
  const data = await Loan.aggregate([
    {
      $lookup: {
        from: "borrowers",
        localField: "borrowerId",
        foreignField: "_id",
        as: "borrower"
      }
    },
    { $unwind: "$borrower" },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" },
    {
      $group: {
        _id: "$borrower.name",
        books: { $push: "$book.title" }
      }
    }
  ]);
  res.json(data);
});
router.get("/analytics/top-borrowed-books", async (req, res) => {
  const data = await Loan.aggregate([
    { $group: { _id: "$bookId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        title: "$book.title",
        borrowCount: "$count"
      }
    }
  ]);
  res.json(data);
});
router.get("/analytics/borrower-history/:id", async (req, res) => {
  const data = await Loan.aggregate([
    { $match: { borrowerId: new require("mongoose").Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        book: "$book.title",
        loanDate: 1,
        returnDate: 1,
        status: 1
      }
    }
  ]);
  res.json(data);
});
router.get("/analytics/frequent-borrowers", async (req, res) => {
  const data = await Loan.aggregate([
    { $group: { _id: "$borrowerId", total: { $sum: 1 } } },
    { $match: { total: { $gt: 5 } } },
    {
      $lookup: {
        from: "borrowers",
        localField: "_id",
        foreignField: "_id",
        as: "borrower"
      }
    },
    { $unwind: "$borrower" },
    {
      $project: {
        name: "$borrower.name",
        totalBorrowed: "$total"
      }
    }
  ]);
  res.json(data);
});
router.get("/analytics/loan-reports", async (req, res) => {
  const data = await Loan.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    },
    { $unwind: "$book" },
    {
      $lookup: {
        from: "borrowers",
        localField: "borrowerId",
        foreignField: "_id",
        as: "borrower"
      }
    },
    { $unwind: "$borrower" },
    {
      $project: {
        _id: 0,
        borrower: "$borrower.name",
        book: "$book.title",
        loanDate: 1,
        returnDate: 1,
        status: 1
      }
    }
  ]);
  res.json(data);
});

module.exports = router;