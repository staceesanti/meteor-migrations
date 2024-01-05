/* global Migrations:true */

Migrations.collection._ensureIndex({name: 1}, {unique: 1});

/** The expand/contract functions to run */
Migrations._migrations = {};
Migrations.generateServerId = null;

/** The public API to configure migrations package */
Migrations.config = function (config) {
  check(config, {
    generateServerId: Function
  });

  Migrations.generateServerId = config.generateServerId;
};

/** The public API to add a migration */
Migrations.add = function (migration) {
  check(migration, {
    name: String,
    required: Match.Optional(Function),
    expand: Function,
    description: Match.Optional(String),
    contract: Match.Optional(Function)
  });

  if (Migrations._migrations[migration.name]) {
    throw new Error('Duplicate migration: ' + migration.name);
  }

  Migrations.collection.upsert({name: migration.name}, {$set: {name: migration.name}});

  Migrations._migrations[migration.name] = {
    required: migration.required,
    expand: migration.expand,
    contract: migration.contract
  };

  // throw new Error("TODO implement me");
};
