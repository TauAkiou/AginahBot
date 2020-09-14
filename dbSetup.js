const sqlite3 = require('sqlite3');
const { dbFile } = require('./config.json');

const roleCategories = `CREATE TABLE IF NOT EXISTS role_categories (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    guildId VARCHAR(128) NOT NULL,
    categoryName VARCHAR(128) NOT NULL,
    roleRequestChannelId CARCHAR(128) NOT NULL,
    messageId VARCHAR(128) NOT NULL
)`;

const roles = `CREATE TABLE IF NOT EXISTS roles (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    categoryId INTEGER NOT NULL,
    roleId VARCHAR(128) NOT NULL,
    roleName VARCHAR(128) NOT NULL,
    reaction VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL
)`;

const gameCategories = `CREATE TABLE IF NOT EXISTS game_categories (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    guildId VARCHAR(128) NOT NULL,
    categoryType VARCHAR(128) CHECK(categoryType IN ('casual', 'race')) NOT NULL,
    channelCategoryId VARCHAR(128) NOT NULL,
    planningChannelId VARCHAR(128) NOT NULL,
    newGameChannelId VARCHAR(128) NOT NULL
)`;

const casualGames = `CREATE TABLE IF NOT EXISTS casual_games (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    categoryId INTEGER NOT NULL,
    voiceChannelId VARCHAR(128) NOT NULL,
    textChannelId VARCHAR(128) NOT NULL,
    roleId VARCHAR(128) NOT NULL
)`;

const raceGames = `CREATE TABLE IF NOT EXISTS race_games (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    categoryId INTEGER NOT NULL,
    voiceChannelId VARCHAR(128) NOT NULL,
    textChannelId VARCHAR(128) NOT NULL,
    roleId VARCHAR(128) NOT NULL
)`;

module.exports = () => {
    const db = new sqlite3.Database(dbFile);
    db.serialize(() => {
        db.run(roleCategories);
        db.run(roles);
        db.run(gameCategories);
        db.run(casualGames);
        db.run(raceGames);
    });
};