const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  
  //TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    // Test setup
    const rover = new Rover(98382);

    // Assertions
    expect(rover.position).toBe(98382); // Check if position is set correctly
    expect(rover.mode).toBe('NORMAL'); // Check if mode is set to 'NORMAL' by default
    expect(rover.generatorWatts).toBe(110); // Check if generatorWatts is set to the default value of 110
 });

 //TEST 8
 it("response returned by receiveMessage contains the name of the message", function() {
  // Test setup
  const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  const message = new Message('Test message with two commands', commands);
  const rover = new Rover(98382);

  // Execute the function being tested
  const response = rover.receiveMessage(message);

  // Assertions
  expect(response.message).toBe('Test message with two commands');
});

//TEST 9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);

  expect(response.results.length).toBe(2);
});

//TEST 10
it("responds correctly to the status check command", function() {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test status check command', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);

  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus.mode).toBe('NORMAL');
  expect(response.results[0].roverStatus.generatorWatts).toBe(110);
  expect(response.results[0].roverStatus.position).toBe(98382);
});

//Test 11
it("responds correctly to the mode change command", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test mode change command', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);

  expect(response.results[0].completed).toBe(true);
  expect(rover.mode).toBe('LOW_POWER');
});

//TEST 12
it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
  let message = new Message('Test mode change and move commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);

  expect(response.results[1].completed).toBe(false);
  expect(rover.position).toBe(98382); // Check that position did not change
});

//TEST 13
it("responds with the position for the move command", function() {
  let commands = [new Command('MOVE', 54321)];
  let message = new Message('Test move command', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);

  expect(response.results[0].completed).toBe(true);
  expect(rover.position).toBe(54321); // Check that position was updated
});

});
