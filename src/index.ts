import "dotenv/config";
import "module-alias/register";
import ExpressApplication from "./app";

const app = new ExpressApplication(Number(process.env.PORT));

app.listen();
