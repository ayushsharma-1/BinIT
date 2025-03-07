const NGO = require('../models/ngoSchema'); // Import the NGO model

// Get all NGOs
const getNGOs = async (req, res) => {
    try {
        const ngos = await NGO.find(); // Fetch all NGOs from the database
        res.status(200).json(ngos); // Send the NGOs as a JSON response
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving NGOs' }); // Error handling
    }
};

// Register a new NGO
const registerNGO = async (req, res) => {
    try {
        const { name, registrationNumber, address, contact, website, establishedYear, missionStatement, areasOfWork } = req.body;

        // Create a new NGO using the data from the request body
        const newNGO = new NGO({
            name,
            registrationNumber,
            address,
            contact,
            website,
            establishedYear,
            missionStatement,
            areasOfWork
        });

        // Save the new NGO to the database
        const savedNGO = await newNGO.save();
        res.status(201).json(savedNGO); // Respond with the newly created NGO
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Registration number or contact already exists!' });
        }

        res.status(500).json({ message: 'Error registering the NGO' }); // Error handling
    }
};
// Get NGO by Registration Number
const getNGOByRegistrationNumber = async (req, res) => {
    try {
        const { registrationNumber } = req.params; // Extract the registration number from the URL parameter
        const ngo = await NGO.findOne({ registrationNumber }); // Find NGO by registration number

        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        res.status(200).json(ngo); // Return the NGO if found
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the NGO' });
    }
};

// Update NGO by Registration Number
const updateNGOByRegistrationNumber = async (req, res) => {
    try {
        const { registrationNumber } = req.params; // Extract the registration number from the URL parameter
        const { name, address, contact, website, establishedYear, missionStatement, areasOfWork } = req.body;

        // Find the NGO by registration number and update it
        const updatedNGO = await NGO.findOneAndUpdate(
            { registrationNumber }, // Find NGO by registration number
            {
                name,
                address,
                contact,
                website,
                establishedYear,
                missionStatement,
                areasOfWork
            },
            { new: true } // Return the updated NGO
        );

        if (!updatedNGO) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        res.status(200).json(updatedNGO); // Return the updated NGO
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating the NGO' });
    }
};

// Delete NGO by Registration Number
const deleteNGOByRegistrationNumber = async (req, res) => {
    try {
        const { registrationNumber } = req.params; // Extract the registration number from the URL parameter

        // Find the NGO by registration number and delete it
        const deletedNGO = await NGO.findOneAndDelete({ registrationNumber });

        if (!deletedNGO) {
            return res.status(404).json({ message: 'NGO not found' });
        }

        res.status(200).json({ message: 'NGO deleted successfully' }); // Confirm deletion
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting the NGO' });
    }
};

module.exports = { getNGOs, registerNGO, getNGOByRegistrationNumber, updateNGOByRegistrationNumber, deleteNGOByRegistrationNumber };