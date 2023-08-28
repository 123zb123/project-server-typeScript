import userDal from './dal.users';
import * as bcrypt from 'bcrypt';

const getAllUsers = async (email: string, password: string) => {
    try {
        const users = await userDal.getAllUsers(email, password);
        return users;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
};

const getUserById = async (id: string, email: string, password: string) => {
    try {
        const user = await userDal.deleteUser(id, email, password);
        return user;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
};

const addUser = async (newUser: any) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
        
        if (isStrongPassword(newUser.password) && isUserEmailValid(newUser.email)) {
            newUser.password = hashedPassword;
            const addUserRes = userDal.addUser(newUser);
            return addUserRes;
        } else {
            console.log('The email or password is not valid.');
        }
    } catch (error) {
        console.error(error);
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        const logInUser = await userDal.loginUser(email, password);
        return logInUser;
    } catch (err) {
        console.error('Error reading data:', err);
    }
};

const deleteUser = async (id: string, email: string, password: string) => {
    try {
        const user = await userDal.deleteUser(id, email, password);
        return user;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
};

const userService = {
    getAllUsers,
    getUserById,
    addUser,
    loginUser,
    deleteUser
};

export default userService;

// Checks if email is valid
function isUserEmailValid(userEmail: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userEmail);
}

// Checks if password is strong
function isStrongPassword(password: string): boolean {
    if (password.length < 8) {
        return false;
    }

    if (!/[a-z]/.test(password)) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    return true;
}
