

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
    res.status(200).json({message:'Auth User'})
}


// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    res.status(200).json({message:'Register a new user'})
}

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
    res.status(200).json({message:'logout user'})
}

// @desc    get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    res.status(200).json({message:'User profile'})
}


// @desc    update user profile
// route    POST /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    res.status(200).json({message:'update user profile'})
}


export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile}