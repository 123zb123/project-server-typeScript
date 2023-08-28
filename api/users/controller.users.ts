import userService from './service.users';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.query;
        const users = await userService.getAllUsers(email as string, password as string);
        if (users) {
            res.status(200).json(users);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { email, password } = req.query;
        const user = await userService.getUserById(id, email as string, password as string);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = req.body;
        const addUserRes = await userService.addUser(newUser);
        res.status(201).json({ message: 'User added successfully!', data: addUserRes });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request' });
    }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const userLogin = await userService.loginUser(email, password);
        res.status(200).json({ message: userLogin });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Bad request' });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { email, password } = req.query;
        const user = await userService.deleteUser(id, email as string, password as string);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userController = {
    getAllUsers,
    getUserById,
    addUser,
    loginUser,
    deleteUser
};

export default userController;
