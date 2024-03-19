import { productData } from '../services/product-service.js';
import { getInputFromUser } from '../utils/common-utils.js';

/**
 * Search a product by product name/title
 * @returns products Found
 */
export const searchProduct = () => {
    try {
        const productNameInput = getInputFromUser('Please enter the product name to be searched for');
        if (!productNameInput) {
            throw new Error('Invalid input. Please enter a valid product name');
        } 
        
        const productsFound = productData.filter(product => product.title.sanitize().includes(productNameInput.sanitize())); 
        return productsFound;
    } catch (error) {
        console.log(error.message);
        return []; 
    }
};