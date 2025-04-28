// Function to send the message to the backend and get the response
async function sendMessage() {
    const messageInput = document.getElementById('message'); // Get the user input field
    const message = messageInput.value; // Get the message typed by the user
    
    // Append user message to chat window
    appendMessage(message, "You");
  
    // Send the message to the server using Fetch API
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Sending JSON data
      },
      body: JSON.stringify({ message: message }) // Send the user message to the server
    });
  
    const data = await response.json(); // Parse the response from the server
    appendMessage(data.response, "Bot"); // Append the bot's response to the chat window
  
    messageInput.value = ''; // Clear the input field after sending the message
  }
  
  // Function to append messages to the chat window
  function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box'); // Get the chat box element
    const messageElement = document.createElement('div'); // Create a new div for the message
    messageElement.classList.add('message', sender.toLowerCase()); // Add appropriate class (user or bot)
  
    messageElement.textContent = message; // Set the text of the message
  
    chatBox.appendChild(messageElement); // Append the message to the chat box
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box (so new messages are visible)
  }
  