const mongoose = require('mongoose');

// Create the contact schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
      trim: true,     // Removes extra spaces
    },
    email: {
      type: String,
      required: true, // Email is required
      lowercase: true, // Convert the email to lowercase
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Simple regex for email validation
        'Please enter a valid email address.',
      ],
    },
    message: {
      type: String,
      required: true, // Message is required
      minlength: [0, 'Message must be at least 0 characters long.'], // Minimum length validation
      maxlength: [120, 'Message cannot exceed 120 characters.'],  // Maximum length validation
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
