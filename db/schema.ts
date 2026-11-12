import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// Private operational records. No public read/list route exposes these tables.
export const quoteRequests = sqliteTable("quote_requests", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  payloadHash: text("payload_hash").notNull(),
  locale: text("locale").notNull(),
  mode: text("mode").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  phone: text("phone").notNull().default(""),
  payload: text("payload").notNull(),
  artworkKey: text("artwork_key"),
  artworkName: text("artwork_name"),
  artworkContentType: text("artwork_content_type"),
  artworkBytes: integer("artwork_bytes"),
  artworkReviewStatus: text("artwork_review_status"),
  status: text("status").notNull().default("received"),
  notificationStatus: text("notification_status").notNull().default("not_configured"),
  marketingConsent: integer("marketing_consent", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
}, (table) => [
  uniqueIndex("quote_reference_unique").on(table.reference),
  uniqueIndex("quote_idempotency_unique").on(table.idempotencyKey),
  index("quote_created_at_index").on(table.createdAt),
]);

export const quoteRateLimits = sqliteTable("quote_rate_limits", {
  key: text("key").primaryKey(),
  windowStart: integer("window_start").notNull(),
  count: integer("count").notNull().default(0),
});

