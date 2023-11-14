import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import bookRoute from "./routes/bookRoute.js";
import podcastRoute from "./routes/podcastRoute.js";
import progressRoute from "./routes/progressRoute.js";
import userRoute from "./routes/userRoute.js";
import vocabRoute from "./routes/vocabRoute.js";
import dictionaryViEnRoute from "./routes/dictionaryViEnRoute.js";

// import { saveToDatabase } from "./utils/crawler.js";
import { translate } from "@vitalets/google-translate-api";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

app.use(express.static("public"));
app.use("/uploads", express.static(join(__dirname, "uploads")));
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

app.use("/api", userRoute);
app.use("/api", vocabRoute);
app.use("/api", podcastRoute);
app.use("/api", bookRoute);
app.use("/api", progressRoute);
app.use("/api", dictionaryViEnRoute);

await connectDb();
// await saveToDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
	console.log(`Server started at PORT ${PORT}`);
});
