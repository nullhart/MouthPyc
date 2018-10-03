const exec = require("await-exec");
var events = require("events");
const say = require("say");

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var eventEmitter = new events.EventEmitter();

function MouthPyc(options) {
  //Constructor
  this.settings = {
    verbose: options.verbose
  };
  //Message Queue
  this.state = {
    active: false,
    queue: []
  };
  //Emit 'added' event when a new message is added to queue
  eventEmitter.on("added", () => {
    console.log(`new item added`);
    //Call Speak method if current status is inactive
    this.state.active == false ? this.speak() : null;
  });
  /** @description called when messages are added to the queue.
   */
  this.speak = async function() {
    this.state.active = true;
    var processedItem = this.state.queue[0];
    await exec(`say -v Samantha "${processedItem.message}"`);
    console.log(`Waiting for ${processedItem.delay} `);
    await timeout(processedItem.delay);

    console.log(
      `${this.state.queue.length -
        1} messages still in Queue: ${new Date().toLocaleTimeString()}`
    );
    //remove item from queue
    this.state.queue.splice(0, 1);
    this.state.active = false;
    //Recursivly go through message queue until queue is empty
    this.state.queue.length > 0 ? this.speak() : null;
  };
  /** @description Adds Message to MouthPyc Queue
   * @param Object
   */
  this.addToQueue = function(message) {
    this.state.queue.push(message);
    eventEmitter.emit("added");
  };
  console.log("MouthPyc Initialized: Ready for Messages! 🎉");
}

module.exports = MouthPyc;
