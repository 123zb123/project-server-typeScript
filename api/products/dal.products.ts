import * as fs from 'node:fs'
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface Product {
    id: string;
    // Define other properties of the product
}

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const dataAsync = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as Product[];

        return jsonData;
    } catch (err) {
        console.error('Error reading data:', err);
        throw new Error('Error reading data');
    }
};

const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const dataAsync = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as Product[];

        const product = jsonData.find(user => id === String(user.id));
        return product;
    } catch (err) {
        console.error('Error reading data:', err);
        throw new Error('Error reading data');
    }
};

const addNewProduct = async (newProduct: Product): Promise<void> => {
    try {
        const dataAsync = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as Product[];

        jsonData.push(newProduct);

        const updatedData = JSON.stringify(jsonData);

        await writeFileAsync('./data.json', updatedData);

        console.log('New product added successfully.');
    } catch (err) {
        console.error('Error adding new product:', err);
        throw err;
    }
};

const updateProduct = async (id: string, update: Partial<Product>): Promise<void> => {
    try {
        const dataAsync = await readFileAsync('./data.json', 'utf8');
        let jsonData = JSON.parse(dataAsync) as Product[];

        const productIndex = jsonData.findIndex(element => id === String(element.id));
        if (productIndex !== -1) {
            jsonData[productIndex] = { ...jsonData[productIndex], ...update };

            const updatedData = JSON.stringify(jsonData, null, 2);

            await writeFileAsync('./data.json', updatedData);

            console.log('Product updated successfully.');
        } else {
            console.error('Product not found.');
        }
    } catch (err) {
        console.error('Error updating product:', err);
        throw err;
    }
};

const deleteProduct = async (id: string): Promise<void> => {
    try {
        const dataAsync = await readFileAsync('./data.json', 'utf8');
        const jsonData = JSON.parse(dataAsync) as Product[];

        const productIndex = jsonData.findIndex(element => id === String(element.id));
        if (productIndex !== -1) {
            jsonData.splice(productIndex, 1);

            const updatedData = JSON.stringify(jsonData);

            await writeFileAsync('./data.json', updatedData);

            console.log('The product deleted successfully.');
        } else {
            console.error('Product not found.');
        }
    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};

const dalProducts = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct
};

export default dalProducts;
