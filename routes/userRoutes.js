import express from "express";
import { authenticate, createUser, deleteUser, getUser, getUsers, profile, updateUser } from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.route('/').post(checkAuth, createUser).get(checkAuth, getUsers);
router.route('/:id').get(checkAuth, getUser).put(checkAuth, updateUser).delete(checkAuth, deleteUser);
router.post('/login', authenticate);
router.get('/loggedin/profile', checkAuth, profile);

export default router;