import { db } from "@/libs/prisma";
import Controller from "@/utils/interfaces/controller";
import { Router } from "express";
import { ZBook, TBook } from "./books.types";

const router = Router();

router.post("/", async (req, res, next) => {
  const { name, userId } = req.body;

  const newBook = { name, userId };
  try {
    ZBook.parse(newBook);

    const book = await db.book.create({
      data: newBook,
    });

    // #swagger.responses[200] = { schema : { $ref : "#/definitions/Book" } }
    res.status(200).json({ id: book.id, name, userId });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  /**
    #swagger.responses[200]={
      schema:[
        {$ref:"#/definitions/Book"}
      ]
    }
   */
  const books = await db.book.findMany();
  res.status(200).json({ books });
});

router.get("/:id", async (req, res) => {
  const id = String(req.params.id);
  console.log(id);

  const book = await db.book.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
          email: true,
        },
      },
    },
  });

  if (!book) return res.status(400).json({ message: "Books not found" });

  // #swagger.responses[200] = { schema : { $ref : "#/definitions/Book" } }
  res.status(200).json({
    book,
  });
});

router.put("/:id", async (req, res, next) => {
  const id: string = String(req.params.id);
  try {
    const book = db.book.findUnique({ where: { id } });

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    const { name, userId } = req.body;
    const updatedBook = await db.book.update({
      where: { id },
      data: { ...req.body },
    });
    // #swagger.responses[200]={schema:{$ref:"#/definitions/Book"}}
    return res.status(200).json({ ...book, message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = String(req.params.id);

  try {
    const book = await db.book.findUnique({ where: { id } });
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    const deletedBook = await db.book.delete({ where: { id } });
    return res.status(200).json({ message: "Book deleted sucessfully" });
  } catch (error) {
    next(error);
  }
});

const BookController: Controller = { router, path: "/books" };

export default BookController;
