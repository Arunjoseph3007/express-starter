import Controller from "@/utils/interfaces/controller";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    books: [
      { name: "a good one", author: "t k rowling" },
      { name: "a good one", author: "t k rowling" },
      { name: "a good one", author: "t k rowling" },
      { name: "a good one", author: "t k rowling" },
    ],
  });
});

router.get("/:id", (req, res) => {
  const id = req.query.some;

  res.status(200).json({
    book: [{ name: "a good one", author: "t k rowling", id }],
  });
});

const BookController: Controller = { router, path: "/books" };
export default BookController;
