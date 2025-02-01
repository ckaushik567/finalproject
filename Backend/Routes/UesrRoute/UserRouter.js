const express = require('express');
const app = express();
const router = express.Router();
const Users = require('../../Modal/UesrModal/UesrSchema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { jwtAuth, generateToken } = require('../../Jwt/Jwt');

app.use(express.urlencoded({ extended: true }));

router.post('/signup', async (req, res) => {
    try {
        const { Name, Email, Mobile, Password, ConfirmPassword } = req.body;

        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: "Password and ConfirmPassword do not match" });
        }
        if (!Password || Password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const existingUser = await Users.findOne({ Email });
        if (existingUser) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Password, salt);

        const newUser = new Users({
            Name,
            Email,
            Mobile,
            Password: hashedPass,
            ConfirmPassword: hashedPass
        });

        const savedUser = await newUser.save();

        const payload = {
            id: savedUser.id,
            Name: savedUser.Name
        };
        const token = generateToken(payload);

        // Send success response
        return res.status(201).json({
            message: "User created successfully",
            user: savedUser,
            token: token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await Users.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Username not found" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(404).json({ message: "Incorrect password" });
        }
        const payload = {
            id: user.id,
            Name: user.Name
        };
        const token = generateToken(payload);

        return res.status(200).json({
            message: "Login successful",
            Name: user.Name,
            id:user._id,
            token: token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// router.put('/user/:id', async (req, res) => {
//     const { id } = req.params;
//     const { Name, Email, Mobile } = req.body;

//     try {
//         if (Email) {
//             const existingUser = await Users.findOne({ Email, _id: { $ne: id } });
//             if (existingUser) {
//                 return res.status(400).json({ message: "Email is already in use by another user" });
//             }
//         }
//         const updatedFields = {};
//         if (Name) updatedFields.Name = Name;
//         if (Email) updatedFields.Email = Email;
//         if (Mobile) updatedFields.Mobile = Mobile;

//         const updatedUser = await Users.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         return res.status(200).json({
//             message: "User updated successfully",
//             user: updatedUser
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// });

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Mobile } = req.body;

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { Name, Email, Mobile },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Attempt to delete the user
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});



module.exports = router;
