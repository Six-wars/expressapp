//Create new instance
/*

User.create({username: 'sammy'}).then(user => {
	console.log(`New user created with username ${user.username} and Id: ${user.id}`);
});

*/

//update
/*
// way 1
user.username = 'new username'
user.save().then(() => {})

// way 2
user.update({
  username: 'new username'
}).then(() => {})
*/

//delete user
/*
Task.create({ title: 'a task' }).then(task => {
  // now you see me...
  return task.destroy();
}).then(() => {
 // now i'm gone :)
})
*/

//bulk create
/*
User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
})
*/

//find first match
/*
Person.findOne({ where: { name: 'john' } }).then(person => {
  person.name = 'jane'
  console.log(person.name) // 'jane'

  person.reload().then(() => {
    console.log(person.name) // 'john'
  })
})
*/

//find by ID
/*
User.findById(1).then(user => {
  return user.increment('my-integer-field', {by: 2})
}).then(user => {
  // Postgres will return the updated user by default (unless disabled by setting { returning: false })
  // In other dialects, you'll want to call user.reload() to get the updated instance...
})
*/

//findorcreate
/*
User
  .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created);
  })
*/

//find and count all
/*
Project.findAndCountAll({
	 where: {
	    title: {
	      [Op.like]: 'foo%'
	    }
	 },
	 offset: 10,
	 limit: 2
})
.then(result => {
	console.log(result.count);
	console.log(result.rows);
});
*/

const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

const User = db.define("user", {
  username: { 
  	type: Sequelize.STRING, 
  	allowNull: false,
    unique: true 
  },
  loggedIn: { type: Sequelize.BOOLEAN }
});

const Messages = db.define("messages", {
	public: { type: Sequelize.BOOLEAN },
	to: { type: Sequelize.STRING },
	messsage: { type: Sequelize.TEXT },
	createdBy: { type: Sequelize.STRING },
	createdAt: { type: Sequelize.DATE }
});

db.sync();

module.exports = {
    User: User,
    Messages: Messages
};