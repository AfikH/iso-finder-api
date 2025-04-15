const { Client } = require("pg");
require("dotenv").config();

const countries = require("./datasets/countries.json");
const territories = require("./datasets/territories.json");
const cities = require("./datasets/cities.json");

const CHUNK_SIZE = 1000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function insertCountries(data) {
  if (!data.length) return new Map();

  const countryIdMap = new Map();

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE);
    const values = chunk.flatMap((c) => [c.name, c.country_code]);

    const placeholders = chunk.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(", ");

    const query = `
      INSERT INTO countries (name, country_code)
      VALUES ${placeholders}
      ON CONFLICT (country_code) DO UPDATE SET name = EXCLUDED.name
      RETURNING country_id, country_code
    `;

    const res = await client.query(query, values);
    res.rows.forEach((row) => countryIdMap.set(row.country_code, row.country_id));
    console.log(`🌍 Inserted countries ${i + 1}–${i + chunk.length}`);
  }

  return countryIdMap;
}

async function insertTerritories(data, countryIdMap) {
  const filtered = data.filter((t) => countryIdMap.has(t.country));
  if (!filtered.length) return new Map();

  const territoryIdMap = new Map();

  for (let i = 0; i < filtered.length; i += CHUNK_SIZE) {
    const chunk = filtered.slice(i, i + CHUNK_SIZE);
    const values = chunk.flatMap((t) => [t.name, t.code, countryIdMap.get(t.country)]);

    const placeholders = chunk.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(", ");

    const query = `
      INSERT INTO territories (name, territory_code, country)
      VALUES ${placeholders}
      ON CONFLICT (territory_code) DO UPDATE SET name = EXCLUDED.name
      RETURNING territory_id, territory_code
    `;

    const res = await client.query(query, values);
    res.rows.forEach((row) => territoryIdMap.set(row.territory_code, row.territory_id));
    console.log(`🌐 Inserted territories ${i + 1}–${i + chunk.length}`);
  }

  return territoryIdMap;
}

async function insertCities(data, countryIdMap, territoryIdMap) {
  const filtered = data.filter((c) => countryIdMap.has(c.country));
  if (!filtered.length) return;

  for (let i = 0; i < filtered.length; i += CHUNK_SIZE) {
    const chunk = filtered.slice(i, i + CHUNK_SIZE);

    const values = chunk.flatMap((c) => [c.name, c.county || null, countryIdMap.get(c.country), territoryIdMap.get(c.territory) || null]);

    const placeholders = chunk.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(", ");

    const query = `
      INSERT INTO cities (name, county, country, territory)
      VALUES ${placeholders}
      ON CONFLICT (name) DO NOTHING
    `;

    await client.query(query, values);
    console.log(`🏙️ Inserted cities ${i + 1}–${i + chunk.length}`);
  }
}

async function seed() {
  try {
    await client.connect();
    await client.query("BEGIN");

    console.log("🚀 Starting seed...");

    const countryIdMap = await insertCountries(countries);
    const territoryIdMap = await insertTerritories(territories, countryIdMap);
    await insertCities(cities, countryIdMap, territoryIdMap);

    await client.query("COMMIT");
    console.log("✅ Seeding complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.end();
  }
}

seed();
