"use strict";

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const worldhoster_organization_id = "c1f4c5fb-eac3-45cf-ba2b-c975203d44db";
const organization1_organization_id = "0ff4d4cc-d049-4d00-aa69-9d9748bc29cd";
const organization2_organization_id = "f285b8da-ce29-4028-bb72-2a2d7b230f5e";

const system_user_id = "4cff5cce-ea8f-40d1-bbea-6920fd6ca440";
const customer1_user_id = "6f2a4dc7-05b8-499f-abe2-fe6ea63de478";
const customer2_user_id = "545050cf-9301-473e-9469-88861586a681";
const employee1_user_id = "c5a4ffe5-cee0-4214-b1f9-706865bebd54";
const manager1_user_id = "274721a9-8d4b-4eb5-b03a-389941ff4c0e";

const customer_group_id = "13060fe3-2e8d-47d1-afe7-67491b00da05";
const employee_group_id = "0a4baa9d-a603-4f8f-b71d-936a0f7ffd6f";
const manager_group_id = "f6421726-9d98-4005-83c6-b16651c83803";

const auth0_authenticator_id = "347b0d59-0eef-41a3-9fb6-a275c105ae0a";

const tickets_display_all_permission_id = "b81a3696-4d58-4cbf-9235-3d997529ed1f";
const tickets_display_permission_id = "659e5937-d688-4efa-a01c-e2b726f287ca";
const tickets_create_permission_id = "bc8dca19-5172-4611-b069-cf865aa5f531";

const organizations_display_all_permission_id = "79fc5dc8-b9a9-4bda-a826-9a9e3eaf84f6";
const organizations_create_permission_id = "4a1e2949-4b14-4bfd-b131-a5c6ac5031c3";

const open_status_id = "f0894747-a11a-4915-9b2c-42ff98692cb3";
const in_progress_status_id = "91342483-5f10-4558-9be2-4b024718eb30";
const completed_status_id = "daa7ab46-d3f4-4b42-8b47-30abe971f378";

const now = new Date().toISOString();

exports.up = async function(db) {
  await createTableOrganizations(db);

  await insertIntoOrganization(worldhoster_organization_id, "WorldHoster", db);
  await insertIntoOrganization(organization1_organization_id, "Organization1", db);
  await insertIntoOrganization(organization2_organization_id, "Organization2", db);

  await createTableUsers(db);
};

exports.down = function(db, callback) {
  db.dropTable("users", callback);
  db.dropTable("organizations", callback);
};

exports._meta = {
  version: 1
};

async function createTableUsers(db) {
  return db.createTable("users", {
    user_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      default: "public.uuid_generate_v4()"
    },
    code: {
      type: "varchar(25)",
      notNull: false
    },
    organization_id: {
      type: "varchar(25)",
      notNull: false
    },
    email: {
      type: "varchar(250)",
      notNull: false
    },
    firstname: {
      type: "varchar(250)",
      notNull: false
    },
    lastname: {
      type: "varchar(250)",
      notNull: false
    },
    creation_date: {
      type: "varchar(250)",
      notNull: true,
      default: "now()"
    },
    creation_user_id: {
      type: "uuid",
      notNull: true
    },
    modification_date: {
      type: "varchar(250)",
      notNull: true,
      default: "now()"
    },
    modification_user_id: {
      type: "uuid",
      notNull: true
    }
  });
}
function createTableOrganizations(db) {
  return db.createTable("organizations", {
    organization_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      default: "public.uuid_generate_v4()"
    },
    name: {
      type: "varchar(250)",
      notNull: true
    },
    creation_date: {
      type: "varchar(250)",
      notNull: true,
      default: "now()"
    },
    creation_user_id: {
      type: "uuid",
      notNull: true
    },
    modification_date: {
      type: "varchar(250)",
      notNull: true,
      default: "now()"
    },
    modification_user_id: {
      type: "uuid",
      notNull: true
    }
  });
}

function insertIntoOrganization(organizationId, name, db) {
  return db.insert(
    "organizations",
    ["organization_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [organizationId, name, now, system_user_id, now, system_user_id]
  );
}
