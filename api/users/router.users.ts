import * as express from 'express';
import userControler from './controller.users.js'

const router = express.Router()

// GET localhost:8200/api/users/
router.get('/', userControler.getAllUsers)

// GET localhost:8020/api/users/8
router.get('/:id', userControler.getUserById)

// POST localhost:8020/api/users/
router.post('/', userControler.addUser)

// POST localhost:8020/api/users/login
router.post('/login', userControler.loginUser)

// POST localhost:8020/api/users/login
router.delete('/:id', userControler.deleteUser)


export default router;