const express = require('express');
const { User, Profile } = require('../model/user'); // Import User and Profile
const bcrypt = require('bcryptjs');
const router = express.Router();

// Login Route (GET)
router.get('/login', (req, res) => {
    res.json({ success: true, message: "Login endpoint. Use POST to log in." });
});

// Login Route (POST)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json({ success: true, message: "Login successful!" });
            } else {
                res.status(400).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Login Error:', error.stack); // Log the error stack
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Registration Route (POST)
router.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body);
    
    const { username, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists:', username);
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();
        console.log('User registered successfully:', newUser);

        // After user registration, create a profile
        const profile = new Profile({
            userId: newUser._id, // Use the newly created user's ID
        });
        await profile.save();
        console.log('Profile created successfully:', profile);

        // Return success response with user ID and profile
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully', 
            userId: newUser._id,
            profile 
        });
    } catch (error) {
        console.error('Registration Error:', error.stack); // Log the error stack
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

module.exports = router;

// const express = require('express');
// const { User, Profile } = require('../model/user'); // Import User and Profile
// const bcrypt = require('bcryptjs');
// const router = express.Router();

// // Login Route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (user) {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 res.json({ success: true, message: "Login successful!" });
//             } else {
//                 res.status(400).json({ success: false, message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(404).json({ success: false, message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Login Error:', error.stack); // Log the error stack
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // Registration Route
// router.post('/register', async (req, res) => {
//     console.log('Registration request received:', req.body);
    
//     const { username, password } = req.body;
    
//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             console.log('User already exists:', username);
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }

//         // Create a new user
//         const newUser = new User({ username, password });
//         await newUser.save();
//         console.log('User registered successfully:', newUser);

//         // After user registration, create a profile
//         const profile = new Profile({
//             userId: newUser._id, // Use the newly created user's ID
//         });
//         await profile.save();
//         console.log('Profile created successfully:', profile);

//         // Return success response with user ID and profile
//         res.status(201).json({ 
//             success: true, 
//             message: 'User registered successfully', 
//             userId: newUser._id,
//             profile 
//         });
//     } catch (error) {
//         console.error('Registration Error:', error.stack); // Log the error stack
//         res.status(500).json({ success: false, message: 'Server error during registration' });
//     }
// });

// module.exports = router;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require('express');
// const { User, Profile } = require('../model/user'); // Import User and Profile
// const bcrypt = require('bcryptjs');
// const router = express.Router();

// // Login Route
// router.post('/LoginPage', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (user) {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 res.json({ success: true, message: "Login successful!" });
//             } else {
//                 res.status(400).json({ success: false, message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(404).json({ success: false, message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Login Error:', error.stack); // Log the error stack
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });
// router.post('/register', async (req, res) => {
//     console.log('Registration request received:', req.body);
    
//     const { username, password } = req.body;
    
//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             console.log('User already exists:', username);
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }

//         // Create a new user
//         const newUser = new User({ username, password });
//         await newUser.save();
//         console.log('User registered successfully:', newUser);

//         // After user registration, create a profile
//         const profile = new Profile({
//             userId: newUser._id, // Use the newly created user's ID
//         });
//         await profile.save();
//         console.log('Profile created successfully:', profile);

//         res.status(201).json({ success: true, message: 'User registered successfully', profile });
//     } catch (error) {
//         console.error('Registration Error:', error);
//         console.log('Registration Error:', error);
//         res.status(500).json({ success: false, message: 'Server error during registration' });
//     }
// });

// POST endpoint for creating a profile
// router.post('/profile', async (req, res) => {
//     try {
//         const profile = new Profile(req.body);
//         await profile.save();
//         res.status(201).send({ success: true, message: 'Profile saved successfully', profile });
//     } catch (error) {
//         console.error('Profile Creation Error:', error.stack); // Log the error stack
//         res.status(400).send({ success: false, message: 'Failed to save profile', error: error.message });
//     }
// });
// router.post('/profile', async (req, res) => {
//     const { userId, name, phone, email, workExperience, education, skills, certifications, achievements, languages, projects } = req.body;

//     // Check if userId is provided
//     if (!userId) {
//         return res.status(400).send({ success: false, message: 'User ID is required.' });
//     }

//     try {
//         const profile = new Profile({
//             userId, // Use the userId from the request body
//             name,
//             phone,
//             email,
//             workExperience,
//             education,
//             skills,
//             certifications,
//             achievements,
//             languages,
//             projects
//         });

//         await profile.save();
//         res.status(201).send({ success: true, message: 'Profile saved successfully', profile });
//     } catch (error) {
//         console.error('Profile Creation Error:', error); // Log the error for debugging
//         res.status(400).send({ success: false, message: 'Failed to save profile', error: error.message });
//     }
// });
module.exports = router;

// const express = require('express');
// const User = require('../model/user'); // Check if this path is correct
// const { user, Profile } = require('../model/user'); // Import both User and Profile


// const bcrypt = require('bcryptjs');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//     console.log('Registration request received:', req.body); // Log the request body
    
//     const { username, password } = req.body;
    
//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             console.log('User already exists:', username); // Log if the user already exists
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }

//         // Create a new user
//         const newUser = new User({ username, password });
//         await newUser.save();
//         console.log('User registered successfully:', newUser); // Log the success
//         res.status(201).json({ success: true, message: 'User registered successfully' });
//     }
//     //  catch (error) {
//     //     console.error('Registration Error:', error); // Log the error
//     //     console.log('Registration Error:', error);
//     //     res.status(500).json({ success: false, message: 'Server error during registration' });
//     // }
//      catch (error) {
//         console.error('Registration Error:', error.stack); // Log stack trace
//         res.status(500).json({ success: false, message: 'Server error during registration' });
//     }
    
// });

// // Login Route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (user) {
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (isMatch) {
//                 res.json({ success: true, message: "Login successful!" });
//             } else {
//                 res.status(400).json({ success: false, message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(404).json({ success: false, message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // POST endpoint for creating a profile
// router.post('/profile', async (req, res) => {
//     try {
//         const profile = new Profile(req.body);
//         await profile.save();
//         res.status(201).send({ success: true, message: 'Profile saved successfully', profile });
//     } catch (error) {
//         res.status(400).send({ success: false, message: 'Failed to save profile', error: error.message });
//     }
// });

// module.exports = router;