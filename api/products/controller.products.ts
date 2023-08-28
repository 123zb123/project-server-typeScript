import productsService from './service.products';

import { Request, Response } from 'express'; // Import express types if not already done

const getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("typeScript");
        const products = await productsService.getAllProducts();
        if (products.length > 0)
            return res.status(200).send(products);
        else {
            return res.status(404).json({ "message": "No products" });
        }
    } catch (error) {
        console.error(error);
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ "message": "product not found" });
        }
    } catch (error) {
        console.error(error);
    }
};

const addNewProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = req.body;
        await productsService.addNewProduct(newProduct);
        res.status(200).json({ "message": "product added successfully" });
    } catch (error) {
        res.status(400).json({ "error controller": error });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const update = req.body;
        await productsService.updateProduct(id, update);
        res.status(200).json({ "message": "product updated successfully!" });
    } catch (err) {
        res.status(400).json({ "error at controller": err });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await productsService.deleteProduct(id);
        res.status(200).json({ "message": "product deleted successfully!" });
    } catch (err) {
        res.status(400).json({ "error at controller": err });
    }
};

const productsController = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct
};

export default productsController;


