import { boolean, foreignKey, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "kitchen", "customer"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
]);
export const consumptionMethodEnum = pgEnum("consumption_method", [
  "delivery",
  "takeaway",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  categoryImage: varchar("category_image", { length: 255 }),
});

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // em centavos
  categoryId: integer("category_id").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // em minutos
  disponibility: boolean("disponibility").notNull().default(true),
}, (table) => ({
  fkCategory: foreignKey({
    columns: [table.categoryId],
    foreignColumns: [categories.id],
    name: "fk_dish_category",
  }),
}));

export const imagePhoto = pgTable("image_photo", {
  id: serial("id").primaryKey(),
  dishId: integer("dish_id").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
}, (table) => ({
  fkDish: foreignKey({
    columns: [table.dishId],
    foreignColumns: [dishes.id],
    name: "fk_photo_dish",
  }),
}));

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  consumptionMethod: consumptionMethodEnum("consumption_method").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  total: integer("total").notNull(), // em centavos
  deliveryAddress: varchar("delivery_address", { length: 255 }),
}, (table) => ({
  fkUserOrder: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: "fk_order_user",
  }),
}));

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  dishId: integer("dish_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(), // em centavos
}, (table) => ({
  fkOrder: foreignKey({
    columns: [table.orderId],
    foreignColumns: [orders.id],
    name: "fk_item_order",
  }),
  fkDish: foreignKey({
    columns: [table.dishId],
    foreignColumns: [dishes.id],
    name: "fk_item_dish",
  }),
}));
