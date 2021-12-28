import dotenv from "dotenv";
dotenv.config("../config/dev.env");
const SECRET = process.env.JWT_SECRET || "prodKey";
const PORT = process.env.PORT || 3000;
const DEVELOPMENT_DB =
  process.env.DATABASE_URL || "mongodb://localhost/ecommerce";

const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost/ecommerce_test"
    : DEVELOPMENT_DB;

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
export { SECRET, PORT, DEVELOPMENT_DB, MONGODB_URL, BCRYPT_WORK_FACTOR };
