const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function dropAllTables() {
  console.log("🧹 Dropping all tables...");

  try {
    await client.connect();
    await client.query("BEGIN");

    // Disable foreign key constraints
    await client.query("SET session_replication_role = replica");

    // Dynamically generate DROP TABLE statements for all user tables
    const res = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `);

    for (const row of res.rows) {
      const tableName = row.tablename;
      await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
      console.log(`❌ Dropped table: ${tableName}`);
    }

    // Re-enable foreign key constraints
    await client.query("SET session_replication_role = DEFAULT");

    await client.query("COMMIT");
    console.log("✅ All tables dropped.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Failed to drop tables:", err);
  } finally {
    await client.end();
  }
}

dropAllTables();
