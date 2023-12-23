// Importing required modules
const express = require("express"); // Import Express.js for server
const socket = require("socket.io"); // Import Socket.io for real-time communication

// Initializing Express app
const app = express(); // Create an instance of Express
app.use(express.static("public")); // Serve static files from the "public" directory

// Define the port for the server to listen on
let port = process.env.PORT || 5000; // Use the environment port or default to 5000
let server = app.listen(port, () => {
  console.log("Listening to port" + port); // Notify when the server starts listening on the specified port
});

// Set up Socket.io to work with the server
let io = socket(server); // Initialize Socket.io and pass the created server instance

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("Made socket connection"); // Notify when a new socket connection is established

  // Handling different socket events

  // Event for beginning a new path (received from the frontend)
  socket.on("beginPath", (data) => {
    // Transfer received data to all connected clients
    io.sockets.emit("beginPath", data); // Emit "beginPath" event with the received data to all connected clients
  });

  // Event for drawing a stroke (received from the frontend)
  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data); // Emit "drawStroke" event with the received data to all connected clients
  });

  // Event for redoing/undoing (received from the frontend)
  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data); // Emit "redoUndo" event with the received data to all connected clients
  });
});
