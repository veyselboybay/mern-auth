import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js"

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPasswords(password))) {
            await generateToken(res,user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401);
            throw new Error("invalid email or password")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}


// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        await generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
    // res.status(200).json({message:'Register a new user'})
}

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
    try {
        await res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:'logged out user'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// @desc    get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        };
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


// @desc    update user profile
// route    POST /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            })
        } else {
            res.status(404);
            throw new Error("User Not Found")
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile}