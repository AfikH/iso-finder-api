const { Client } = require("pg");
require("dotenv").config();

const countries = require("./datasets/countries.json");
const territories = require("./datasets/territories.json");
const cities = require("./datasets/cities.json");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  await client.connect();

  console.log("Seeding countries...");
  const countryIdMap = new Map();

  for (const country of countries) {
    const res = await client.query(
      `INSERT INTO countries (name, country_code)
       VALUES ($1, $2)
       ON CONFLICT (country_code) DO UPDATE SET name = EXCLUDED.name
       RETURNING country_id`,
      [country.name, country.country_code]
    );
    countryIdMap.set(country.country_code, res.rows[0].country_id);
  }

  console.log("Seeding territories...");
  const territoryIdMap = new Map();

  for (const territory of territories) {
    const countryId = countryIdMap.get(territory.country);
    if (!countryId) {
      console.warn(`Skipping territory ${territory.name}, country ${territory.country} not found`);
      continue;
    }

    const res = await client.query(
      `INSERT INTO territories (name, territory_code, country)
       VALUES ($1, $2, $3)
       ON CONFLICT (territory_code) DO UPDATE SET name = EXCLUDED.name
       RETURNING territory_id`,
      [territory.name, territory.code, countryId]
    );
    territoryIdMap.set(territory.code, res.rows[0].territory_id);
  }

  console.log("Seeding cities...");
  for (const city of cities) {
    const countryId = countryIdMap.get(city.country);
    const territoryId = territoryIdMap.get(city.territory);

    if (!countryId) {
      console.warn(`Skipping city ${city.name}, country ${city.country} not found`);
      continue;
    }

    const res = await client.query(
      `INSERT INTO cities (name, county, country, territory)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO NOTHING`,
      [city.name, city.county || null, countryId, territoryId || null]
    );
  }

  await client.end();
  console.log("🌱 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  client.end();
});
