import pg from "pg";

const db = new pg.Client({
  user: "Glenn",
  host: "localhost",
  database: "fullstack_employees",
  password: "Gretchen1Harold!",
  port: 5432,
});

export default db;
