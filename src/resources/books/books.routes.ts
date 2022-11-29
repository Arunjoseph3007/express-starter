import Controller from "@/utils/interfaces/controller";
import { Router } from "express";

const router = Router();

type TBook = {
  id: number;
  name: string;
  author: string;
};

const books: TBook[] = [
  { id: 1, name: "a good one", author: "t k rowling" },
  { id: 2, name: "a good one", author: "t k rowling" },
  { id: 3, name: "a good one", author: "t k rowling" },
  { id: 4, name: "a good one", author: "t k rowling" },
];

router.post("/", (req, res) => {
  const { id, name, author } = req.body;

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

const BookController: Controller = { router, path: "/books" };
export default BookController;
