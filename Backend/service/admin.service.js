const { adminModel } = require('../models/admin');

// Create Admin
const createAdminService = async (data) => {
    const { username, email, phone, password } = data;

    if (!username || !email || !phone || !password) {
        throw new Error('All fields are required');
    }

    try {
        const admin = await adminModel.create({
            username,
            email,
            phone,
            password
        });
        return admin;
    } catch (err) {
        throw new Error('Error creating admin: ' + err.message);
    }
};

// Find Admin by Email
const findAdminByEmail = async (email) => {
    try {
        const admin = await adminModel.findOne({ email });
        return admin;
    } catch (err) {
        throw new Error('Error finding admin by email: ' + err.message);
    }
};

// Find Admin by ID
const findAdminById = async (id) => {
    try {
        const admin = await adminModel.findById(id);
        return admin;
    } catch (err) {
        throw new Error('Error finding admin by ID: ' + err.message);
    }
};

// Delete Admin by ID
const deleteAdminById = async (id) => {
    try {
        const admin = await adminModel.findByIdAndDelete(id);
        return admin;
    } catch (err) {
        throw new Error('Error deleting admin: ' + err.message);
    }
};

module.exports = {
    createAdminService,
    findAdminByEmail,
    findAdminById,
    deleteAdminById
};
