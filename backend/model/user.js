const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the UserSchema first
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Create the User model after defining the schema
const User = mongoose.model('User', UserSchema);

// Define the Profile schema
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Referencing User model
        ref: 'User',
        required: true,
        unique: true
    },
    name: String,
    phone: String,
    email: String,
    workExperience: [{
        jobTitle: String,
        company: String,
        date: String,
        responsibilities: String
    }],
    education: [{
        degree: String,
        institution: String,
        graduationYear: String
    }],
    skills: String,
    certifications: String,
    achievements: String,
    languages: String,
    projects: String
});


// Create the Profile model after defining the schema
const Profile = mongoose.model('Profile', profileSchema);

// Export User and Profile models
module.exports = { User, Profile };

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = mongoose.model('User', UserSchema);
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// });

// // Hash password before saving
// UserSchema.pre('save', async function(next) {
//     if (this.isModified('password') || this.isNew) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

// const profileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId, // Referencing User model
//         ref: 'User',
//         required: true,
//         unique: true
//     },
//     name: String,
//     phone: String,
//     email: String,
//     workExperience: [{
//         jobTitle: String,
//         company: String,
//         date: String,
//         responsibilities: String
//     }],
//     education: [{
//         degree: String,
//         institution: String,
//         graduationYear: String
//     }],
//     skills: String,
//     certifications: String,
//     achievements: String,
//     languages: String,
//     projects: String
// });

// const Profile = mongoose.model('Profile', profileSchema);
// module.exports = Profile;

// module.exports = mongoose.model('User', UserSchema);
