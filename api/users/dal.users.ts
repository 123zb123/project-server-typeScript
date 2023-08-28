import * as fs from 'node:fs'
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
}

const getAllUsers = async (email: string, password: string): Promise<User[] | { message: string }> => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as User[];
        
        for (const element of jsonData) {
            if (element.email === email && element.password.trim() === password.trim() && element.isAdmin === true) {
                return jsonData;
            }
        }
        return { message: "You have no access to data!" };
        
    } catch (err) {
        console.error('Error reading data:', err);
        throw err; 
    }
};

const getUserById = async (id: string, email: string, password: string): Promise<User | { message: string }> => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as User[];
        
        for (const element of jsonData) {
            const admin = element.email === email && element.password.trim() === password.trim() && element.isAdmin === true;
            if ((element.email === email && element.password.trim() === password.trim() && element.id === Number(id)) || admin) {
                return element;
            }
        }
        return { message: "The email or password is incorrect, or you have no access to data..." };
        
    } catch (err) {
        console.error('Error reading data:', err);
        throw err; 
    }
};

const addUser = async (newUser: User): Promise<string | void> => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as User[];
        
        let userId = jsonData[0].id;

        for (const user of jsonData) {
            if (user.id > userId) {
                userId = user.id;
            }
        }
        newUser.id = userId + 1;
        jsonData.push(newUser);
        
        const updatedData = JSON.stringify(jsonData);
        await writeFileAsync('./usersData.json', updatedData);
        
        return 'New user added:' + JSON.stringify(newUser);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};

const loginUser = async (email: string, password: string): Promise<string> => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as User[];
        
        for (const element of jsonData) {
            if (element.email === email && await bcrypt.compare(password, element.password)) {
                return "The user logged in successfully";
            }
        }

        return "The email or password is incorrect, please try again...";
    } catch (err) {
        console.error('Error:', err);
        return "An error occurred";
    }
};

const deleteUser = async (id: string, email: string, password: string): Promise<{ message: string }> => {
    try {
        const dataAsync = await readFileAsync('./usersData.json', 'utf8');
        let jsonData = JSON.parse(dataAsync) as User[];

        const admin = jsonData.find(element => element.email.trim() === email.trim() && element.password.trim() === password.trim() && element.isAdmin === true);
        const userToDelete = jsonData.find(element => element.email.trim() === email.trim() && element.password.trim() === password.trim() && String(element.id) === id);

        if (admin || (userToDelete && userToDelete.isAdmin === false)) {
            if (admin || userToDelete) {
                jsonData = jsonData.filter(element => String(element.id) !== id);
                console.log(jsonData);
                await writeFileAsync('./usersData.json', JSON.stringify(jsonData), 'utf8');
                return { message: "User deleted successfully." };
            } else {
                return { message: "User not found." };
            }
        } else {
            return { message: "Incorrect email or password, or you have no access to delete this user." };
        }
    } catch (err) {
        console.error('Error reading or writing data:', err);
        throw err;
    }
};

const userDal = {
    getAllUsers,
    getUserById,
    addUser,
    loginUser,
    deleteUser
};

export default userDal;
