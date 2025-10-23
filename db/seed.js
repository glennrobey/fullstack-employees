import db from "#db/client";
import { createEmployee } from "./queries/employees.js";
import { faker } from "@faker-js/faker";

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
  const employees = [];

  // Generate 10 employees using Faker
  for (let i = 0; i < 10; i++) {
    employees.push({
      name: faker.person.fullName(),
      birthday: faker.date
        .birthdate({ min: 18, max: 65, mode: "age" })
        .toISOString()
        .split("T")[0], // YYYY-MM-DD
      salary: faker.number.int({ min: 40000, max: 100000 }),
    });
  }

  // Insert into DB
  for (const emp of employees) {
    const inserted = await createEmployee(emp);
    console.log(`Inserted: ${inserted.name} (ID: ${inserted.id})`);
  }
}
