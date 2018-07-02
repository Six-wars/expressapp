const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

const User = db.define("post", {
  username: { type: Sequelize.STRING },
  loggedIn: { type: Sequelize.BOOLEAN }
});

const Messages = db.define("messages", {
	public: { type: Sequelize.BOOLEAN },
	to: { type: Sequelize.STRING },
	messsage: { type: Sequelize.BOOLEAN },
	createdBy: { type: Sequelize.STRING },
	createdAt: { type: Sequelize.DATE }
})

db.sync();