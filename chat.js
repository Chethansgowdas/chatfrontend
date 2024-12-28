document.addEventListener('DOMContentLoaded', function() {
    // Load contacts from localStorage
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contact-list');
    savedContacts.forEach(contactId => {
        const li = document.createElement('li');
        li.textContent = contactId;
        contactList.appendChild(li);
    });
});

document.getElementById('send-button').addEventListener('click', function() {
    const input = document.getElementById('message-input');
    const messageText = input.value.trim();

    if (messageText) {
        const chatWindow = document.getElementById('chat-window');
        
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = messageText;

        // Append the message to the chat window
        chatWindow.appendChild(messageElement);

        // Clear the input field
        input.value = '';

        // Scroll to the bottom of the chat window
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});

// Optional: Allow sending messages with the Enter key
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

// Profile photo functionality
document.getElementById('profile-photo').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePhoto = document.getElementById('profile-photo');
            profilePhoto.style.backgroundImage = `url(${e.target.result})`;
            profilePhoto.style.backgroundSize = 'cover';
            profilePhoto.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
});

// Search functionality
document.getElementById('search-icon').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm) {
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    }
});

// Add contact functionality
document.getElementById('add-contact-icon').addEventListener('click', function() {
    // Show the contact modal
    document.getElementById('contact-modal').style.display = 'block';

    // Clear existing contacts in the contact list
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ''; // Clear existing contacts
});

// Add new contact functionality
document.getElementById('add-contact-button').addEventListener('click', function() {
    const newContactId = document.getElementById('new-contact-input').value.trim();
    if (newContactId) {
        const contactList = document.getElementById('contact-list');
        const li = document.createElement('li');
        li.textContent = newContactId;
        contactList.appendChild(li);

        // Save contact to localStorage
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        savedContacts.push(newContactId);
        localStorage.setItem('contacts', JSON.stringify(savedContacts));

        // Display the new contact in the main chat window
        const chatWindow = document.getElementById('chat-window');
        const contactElement = document.createElement('div');
        contactElement.classList.add('message', 'contact');
        contactElement.textContent = newContactId;
        contactElement.style.cursor = 'pointer'; // Make it clickable
        chatWindow.appendChild(contactElement);

        // Clear input field
        document.getElementById('new-contact-input').value = ''; // Clear input field

        // Add click event to start chat with the contact
        contactElement.addEventListener('click', function() {
            // Logic to start chat with the selected contact
            chatWindow.innerHTML = ''; // Clear chat window for new conversation
            const chatHeader = document.createElement('div');
            chatHeader.classList.add('chat-header');
            chatHeader.textContent = `Chatting with: ${newContactId}`;
            chatWindow.appendChild(chatHeader);
            document.getElementById('back-button').style.display = 'block'; // Show back button
            document.getElementById('add-contact-icon').style.display = 'none'; // Hide add contact button
        });
    }
});

// Back button functionality
document.getElementById('back-button').addEventListener('click', function() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; // Clear chat window
    document.getElementById('back-button').style.display = 'none'; // Hide back button
    document.getElementById('add-contact-icon').style.display = 'inline'; // Show add contact button
});

// Close modal functionality
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('contact-modal').style.display = 'none';
});
