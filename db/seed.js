import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

(async () => {
  try {
    await db.connect();
    await seedEmployees();
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await db.end();
    console.log("🌱 Database seeded.");
  }
})();

async function seedEmployees() {
  const employees = [
    { name: "Liam Carter", birthday: "1987-04-12", salary: 58000 },
    { name: "Olivia Brooks", birthday: "1992-09-30", salary: 62000 },
    { name: "Noah Mitchell", birthday: "1985-07-21", salary: 70000 },
    { name: "Emma Hughes", birthday: "1990-03-14", salary: 65000 },
    { name: "Lucas Bennett", birthday: "1993-12-05", salary: 54000 },
    { name: "Ava Richardson", birthday: "1988-08-19", salary: 72000 },
    { name: "Ethan Foster", birthday: "1984-11-11", salary: 68000 },
    { name: "Sophia Hayes", birthday: "1991-01-27", salary: 60000 },
    { name: "Mason Kelly", birthday: "1989-06-03", salary: 75000 },
    { name: "Isabella Ward", birthday: "1994-10-16", salary: 59000 },
  ];

  for (const emp of employees) {
    const inserted = await createEmployee(emp);
    console.log(`Inserted: ${inserted.name} (ID: ${inserted.id})`);
  }
}

import db from "#db/client";

(async () => {
  try {
    await db.connect();
    console.log("Connected");

    const result = await db.query(
      `INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3) RETURNING *`,
      ["Debug User", "1990-01-01", 50000]
    );

    console.log("Inserted:", result.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    await db.end();
  }
})();
