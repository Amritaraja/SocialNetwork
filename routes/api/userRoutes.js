const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    addFriends,
    removeFriends,
    updateUser,
    deleteUser    
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser)  
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriends).delete(removeFriends)

module.exports = router;