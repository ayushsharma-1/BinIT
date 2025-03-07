const Contact = require('../models/contactSchema'); // Assuming the model is in the models folder

// Handle GET request: Get all contacts/complaints
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from the DB
    res.status(200).json(contacts); // Respond with the contacts
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err });
  }
};

// Handle POST request: Create a new contact/complaint
const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    await newContact.save(); // Save the new contact to the DB
    res.status(201).json({ message: 'Complaint submitted successfully!', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Error saving contact', error: err });
  }
};

module.exports = {
  getAllContacts,
  createContact,
};
