import { char, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const countriesTable = pgTable("countries", {
  id: serial("country_id").primaryKey(),
  name: varchar("name", { length: 60 }).unique().notNull(),
  code: char("country_code", { length: 2 }).unique().notNull(),
});

export const territoriesTable = pgTable("territories", {
  id: serial("territory_id").primaryKey(),
  name: varchar("name", { length: 200 }).unique().notNull(),
  code: varchar("territory_code", { length: 2 }).unique().notNull(),
  country: integer("country")
    .references(() => countriesTable.id)
    .notNull(),
});

export const citiesTable = pgTable("cities", {
  id: serial("city_id").primaryKey(),
  name: varchar("name", { length: 200 }).unique().notNull(),
  county: varchar("county", { length: 200 }),
  country: integer("country")
    .references(() => countriesTable.id)
    .notNull(),
  territory: integer("territory").references(() => territoriesTable.id),
});

export const usersTable = pgTable("users", {
  id: serial("user_id").primaryKey(),
  authServerId: varchar("auth_server_id", { length: 32 }).unique().notNull(),
});

export const companyCategoriesTable = pgTable("company_categories", {
  id: serial("company_category_id").primaryKey(),
  name: varchar("name", { length: 30 }).unique().notNull(),
});

export const companiesTable = pgTable("companies", {
  id: serial("company_id").primaryKey(),
  category: integer("category").references(() => companyCategoriesTable.id),
  country: integer("country")
    .references(() => countriesTable.id)
    .notNull(),
  territory: integer("territory").references(() => territoriesTable.id),
  city: integer("city").references(() => citiesTable.id),
  address: varchar("address", { length: 255 }),
  postalCode: varchar("postal_code", { length: 12 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  name: varchar("name", { length: 60 }).unique().notNull(),
  description: text("description"),
  certifications: integer("certification_id").array(),
});

export const productCategoriesTable = pgTable("product_categories", {
  id: serial("product_category_id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
});

export const productsTable = pgTable("products", {
  id: serial("product_id").primaryKey(),
  category: integer("category").references(() => productCategoriesTable.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  company: integer("company").references(() => companiesTable.id),
});

export const certificationsTable = pgTable("certifications", {
  id: serial("certification_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
