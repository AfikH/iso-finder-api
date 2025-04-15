import { char, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: serial("country_id").primaryKey(),
  name: varchar("name", { length: 60 }).unique().notNull(),
  code: char("country_code", { length: 2 }).unique().notNull(),
});

export const territories = pgTable("territories", {
  id: serial("territory_id").primaryKey(),
  name: varchar("name", { length: 200 }).unique().notNull(),
  code: varchar("territory_code", { length: 2 }).unique().notNull(),
  country: integer("country")
    .references(() => countries.id)
    .notNull(),
});

export const cities = pgTable("cities", {
  id: serial("city_id").primaryKey(),
  name: varchar("name", { length: 200 }).unique().notNull(),
  county: varchar("county", { length: 200 }),
  country: integer("country")
    .references(() => countries.id)
    .notNull(),
  territory: integer("territory").references(() => territories.id),
});

export const users = pgTable("users", {
  id: serial("user_id").primaryKey(),
  authServerId: varchar("auth_server_id", { length: 32 }).unique().notNull(),
});

export const companyTypes = pgTable("company_types", {
  id: serial("company_type_id").primaryKey(),
  name: varchar("name", { length: 30 }).unique().notNull(),
});

export const companies = pgTable("companies", {
  id: serial("company_id").primaryKey(),
  type: integer("type").references(() => companyTypes.id),
  country: integer("country")
    .references(() => countries.id)
    .notNull(),
  territory: integer("territory").references(() => territories.id),
  city: integer("city").references(() => cities.id),
  address: varchar("address", { length: 255 }),
  postalCode: varchar("postal_code", { length: 12 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  description: text("description"),
  certifications: integer("certification_id").array(),
});

export const productCategories = pgTable("product_categories", {
  id: serial("product_category_id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
});

export const products = pgTable("products", {
  id: serial("product_id").primaryKey(),
  category: integer("category").references(() => productCategories.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

export const certifications = pgTable("certifications", {
  id: serial("certification_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
