class Message {
   constructor(name, commands) {
      if (!name) {
          throw new Error('Name is required for a message.');
      }
      this.name = name;
      this.commands = commands || [];
  }
}


module.exports = Message;