import "dotenv/config";
import "module-alias/register";
import ExpressApplication from "./app";
import BookController from "@/resources/books/routes";

const app = new ExpressApplication([BookController], Number(process.env.PORT));

app.listen();
