import Controller from "@/utils/interfaces/controller";
import { Router } from "express";
import { ZBook, TBook } from "./books.types";

const router = Router();

let books: TBook[] = [
  { id: 1, name: "a good one", author: "t k rowling" },
  { id: 2, name: "a good one", author: "t k rowling" },
  { id: 3, name: "a good one", author: "t k rowling" },
  { id: 4, name: "a good one", author: "t k rowling" },
];

router.post("/", (req, res) => {
  const { id, name, author } = req.body;

  const newBook = { id, name, author };

  ZBook.parse(newBook);

  const book = books.find((elm) => elm.id == Number(id));

  if (book) {
    return res
      .status(401)
      .json({ messgae: "Book with the same id already exits" });
  }

  books.push({ id, name, author });

  // #swagger.responses[200] = { schema : { $ref : "#/definitions/Book" } }
  res.status(200).json({ id, name, author });
});

router.get("/", (req, res) => {
  /**
    #swagger.responses[200]={
      schema:[
        {$ref:"#/definitions/Book"}
      ]
    }
   */
  res.status(200).json({ books });
});

router.get("/:id", (req, res) => {
  const id = Number(req.query.some);
  const book = books.find((e) => e.id == id);

  if (!book) return res.status(400).json({ message: "Books not found" });

  // #swagger.responses[200] = { schema : { $ref : "#/definitions/Book" } }
  res.status(200).json({
    book,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  let book: TBook = books.find((elm) => id === elm.id) as TBook;

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }

  const { name, author } = req.body;
  book = { ...book, ...req.body };
  books = [...books.filter((b) => b.id !== id), book];
  // #swagger.responses[200]={schema:{$ref:"#/definitions/Book"}}
  return res.status(200).json({ ...book, message: "Updated successfully" });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((elm) => id === elm.id);

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }

  books = books.filter((book) => book.id !== id);
  return res.status(200).json({ message: "Book deleted sucess fully" });
});

const BookController: Controller = { router, path: "/books" };
export default BookController;
