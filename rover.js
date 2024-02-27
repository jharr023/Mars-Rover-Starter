class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
 
   receiveMessage(message) {
     // Implementation for handling messages
   }
 }
 
 module.exports = Rover;