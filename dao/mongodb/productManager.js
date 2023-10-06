const ProductModel = require('../models/productModel');

class ProductsManager {
    constructor() {
    }

    async readProductsFromDatabase() {
        try {
            return await ProductModel.find();
        } catch (error) {
            console.error("Error al leer productos de la base de datos:", error);
            throw error;
        }
    }

    async writeProductsToDatabase(products) {
        try {
            await ProductModel.create(products);
        } catch (error) {
            console.error("Error al escribir productos en la base de datos:", error);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            const lastProduct = await ProductModel.findOne().sort({ id: -1 });
            const lastProductId = lastProduct ? lastProduct.id : 0;
            product.id = lastProductId + 1;
            product.code = `CODE${product.id.toString().padStart(3, '0')}`;
            await Product.create(product);
        } catch (error) {
            console.error("Error al agregar un producto:", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            return await this.readProductsFromDatabase();
        } catch (error) {
            console.error("Error al obtener productos:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await ProductModel.findOne({ id });
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const updatedProduct = await ProductModel.findOneAndUpdate({ id }, { $set: updatedFields }, { new: true });
            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await ProductModel.deleteOne({ id });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }
}

module.exports = ProductsManager;