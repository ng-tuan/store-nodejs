import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRoutes from "./handlers/category";
import productRoutes from "./handlers/product";
import personRoutes from "./handlers/person";
import ordersRoutes from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corOptions = {
  origin: "http://localhost",
  optionSuccessStatus: 200,
};

app.use(cors(corOptions));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

categoryRoutes(app);
productRoutes(app);
personRoutes(app);
ordersRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app