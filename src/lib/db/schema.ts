import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  inet,
  decimal,
  unique,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// ENUMS
// ============================================================

export const contentStatusEnum = pgEnum("content_status", [
  "draft",
  "in_review",
  "published",
  "archived",
]);

export const contentTypeEnum = pgEnum("content_type", [
  "article",
  "page",
  "announcement",
  "guide",
]);

// ============================================================
// UTENTI E AUTENTICAZIONE
// ============================================================

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    phone: varchar("phone", { length: 20 }),
    emailVerified: boolean("email_verified").default(false),
    isActive: boolean("is_active").default(true),
    twoFactorEnabled: boolean("two_factor_enabled").default(false),
    twoFactorSecret: varchar("two_factor_secret", { length: 255 }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    lastLoginIp: inet("last_login_ip"),
    failedLoginAttempts: integer("failed_login_attempts").default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    preferences: jsonb("preferences").default({}),
    gdprConsentAt: timestamp("gdpr_consent_at", { withTimezone: true }),
    gdprConsentVersion: varchar("gdpr_consent_version", { length: 10 }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_users_email").on(table.email),
    index("idx_users_active").on(table.isActive),
  ]
);

// ============================================================
// RBAC: RUOLI E PERMESSI
// ============================================================

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").default(false),
  priority: integer("priority").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const permissions = pgTable(
  "permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    resource: varchar("resource", { length: 100 }).notNull(),
    action: varchar("action", { length: 50 }).notNull(),
    scope: varchar("scope", { length: 20 }).notNull().default("own"),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("permissions_resource_action_scope").on(
      table.resource,
      table.action,
      table.scope
    ),
  ]
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (table) => [
    unique("role_permissions_pk").on(table.roleId, table.permissionId),
    index("idx_role_permissions_role").on(table.roleId),
  ]
);

export const userRoles = pgTable(
  "user_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    assignedBy: uuid("assigned_by").references(() => users.id),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("user_roles_pk").on(table.userId, table.roleId),
    index("idx_user_roles_user").on(table.userId),
    index("idx_user_roles_role").on(table.roleId),
  ]
);

// ============================================================
// REFRESH TOKENS
// ============================================================

export const refreshTokens = pgTable(
  "refresh_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 255 }).notNull().unique(),
    deviceInfo: jsonb("device_info"),
    ipAddress: inet("ip_address"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_refresh_tokens_user").on(table.userId)]
);

// ============================================================
// CONTENUTI CON VERSIONAMENTO
// ============================================================

export const contents = pgTable(
  "contents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: contentTypeEnum("type").notNull().default("article"),
    title: varchar("title", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull(),
    excerpt: text("excerpt"),
    body: text("body"),
    bodyHtml: text("body_html"),
    status: contentStatusEnum("status").notNull().default("draft"),
    featuredImage: varchar("featured_image", { length: 500 }),
    metadata: jsonb("metadata").default({}),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
    reviewerId: uuid("reviewer_id").references(() => users.id),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewNotes: text("review_notes"),
    currentVersion: integer("current_version").default(1),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_contents_status").on(table.status),
    index("idx_contents_author").on(table.authorId),
    index("idx_contents_slug").on(table.slug),
    index("idx_contents_published").on(table.publishedAt),
  ]
);

export const contentVersions = pgTable(
  "content_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentId: uuid("content_id")
      .notNull()
      .references(() => contents.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    body: text("body"),
    metadata: jsonb("metadata").default({}),
    changedBy: uuid("changed_by")
      .notNull()
      .references(() => users.id),
    changeNote: text("change_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("content_versions_unique").on(table.contentId, table.version),
    index("idx_content_versions_content").on(table.contentId),
  ]
);

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const contentTags = pgTable(
  "content_tags",
  {
    contentId: uuid("content_id")
      .notNull()
      .references(() => contents.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [unique("content_tags_pk").on(table.contentId, table.tagId)]
);

// ============================================================
// AUDIT LOG (IMMUTABILE)
// ============================================================

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    action: varchar("action", { length: 100 }).notNull(),
    resource: varchar("resource", { length: 100 }).notNull(),
    resourceId: uuid("resource_id"),
    oldValues: jsonb("old_values"),
    newValues: jsonb("new_values"),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    sessionId: varchar("session_id", { length: 255 }),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_audit_user").on(table.userId, table.createdAt),
    index("idx_audit_resource").on(table.resource, table.resourceId),
    index("idx_audit_action").on(table.action, table.createdAt),
    index("idx_audit_created").on(table.createdAt),
  ]
);

// ============================================================
// NOTIFICHE
// ============================================================

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body"),
    data: jsonb("data").default({}),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_notifications_user").on(table.userId, table.createdAt)]
);

// ============================================================
// MEDIA
// ============================================================

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  storagePath: varchar("storage_path", { length: 500 }).notNull(),
  uploadedBy: uuid("uploaded_by")
    .notNull()
    .references(() => users.id),
  metadata: jsonb("metadata").default({}),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ============================================================
// ORGANIZZAZIONI (per matching bandi futuro)
// ============================================================

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  taxCode: varchar("tax_code", { length: 20 }),
  sector: varchar("sector", { length: 100 }),
  sizeCategory: varchar("size_category", { length: 50 }),
  region: varchar("region", { length: 100 }),
  province: varchar("province", { length: 100 }),
  municipality: varchar("municipality", { length: 255 }),
  description: text("description"),
  website: varchar("website", { length: 500 }),
  profileData: jsonb("profile_data").default({}),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const userOrganizations = pgTable(
  "user_organizations",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    roleInOrg: varchar("role_in_org", { length: 50 }).default("member"),
  },
  (table) => [
    unique("user_organizations_pk").on(table.userId, table.organizationId),
  ]
);

// ============================================================
// PREDISPOSIZIONE BANDI (MODULO RAG FUTURO)
// ============================================================

export const bandi = pgTable(
  "bandi",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    externalId: varchar("external_id", { length: 255 }),
    title: varchar("title", { length: 500 }).notNull(),
    issuingEntity: varchar("issuing_entity", { length: 255 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }),
    description: text("description"),
    fullText: text("full_text"),
    amountMin: decimal("amount_min", { precision: 15, scale: 2 }),
    amountMax: decimal("amount_max", { precision: 15, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("EUR"),
    deadline: timestamp("deadline", { withTimezone: true }),
    publicationDate: timestamp("publication_date", { withTimezone: true }),
    category: varchar("category", { length: 100 }),
    subcategories: text("subcategories").array(),
    targetSectors: text("target_sectors").array(),
    targetSizes: text("target_sizes").array(),
    regions: text("regions").array(),
    url: varchar("url", { length: 500 }),
    documents: jsonb("documents").default([]),
    status: varchar("status", { length: 20 }).default("active"),
    // embedding: vector('embedding', { dimensions: 1536 }), // Abilitare quando si installa pgvector
    metadata: jsonb("metadata").default({}),
    ingestedAt: timestamp("ingested_at", { withTimezone: true }).defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_bandi_status_deadline").on(table.status, table.deadline),
    index("idx_bandi_category").on(table.category),
    index("idx_bandi_entity").on(table.issuingEntity),
  ]
);

export const bandoMatches = pgTable(
  "bando_matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bandoId: uuid("bando_id")
      .notNull()
      .references(() => bandi.id, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    score: decimal("score", { precision: 5, scale: 4 }).notNull(),
    reasoning: text("reasoning"),
    status: varchar("status", { length: 20 }).default("new"),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("bando_matches_unique").on(table.bandoId, table.organizationId),
    index("idx_bando_matches_org").on(table.organizationId),
    index("idx_bando_matches_bando").on(table.bandoId),
  ]
);

export const savedBandi = pgTable(
  "saved_bandi",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    bandoId: uuid("bando_id")
      .notNull()
      .references(() => bandi.id, { onDelete: "cascade" }),
    notes: text("notes"),
    savedAt: timestamp("saved_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [unique("saved_bandi_pk").on(table.userId, table.bandoId)]
);

// ============================================================
// GDPR
// ============================================================

export const gdprConsents = pgTable(
  "gdpr_consents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    consentType: varchar("consent_type", { length: 50 }).notNull(),
    version: varchar("version", { length: 10 }).notNull(),
    granted: boolean("granted").notNull(),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_gdpr_consents_user").on(table.userId, table.consentType)]
);

// ============================================================
// RELATIONS
// ============================================================

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  contents: many(contents),
  notifications: many(notifications),
  refreshTokens: many(refreshTokens),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const contentsRelations = relations(contents, ({ one, many }) => ({
  author: one(users, {
    fields: [contents.authorId],
    references: [users.id],
  }),
  versions: many(contentVersions),
  contentTags: many(contentTags),
}));

export const contentVersionsRelations = relations(contentVersions, ({ one }) => ({
  content: one(contents, {
    fields: [contentVersions.contentId],
    references: [contents.id],
  }),
}));
