import { productData } from '../services/product-service.js';
import { sanitizeInput, getInputFromUser } from '../utils/common-utils.js';

/**
 * Search a product by product name/title
 * @returns products Found
 */
export const searchProduct = () => {
    const productNameInput = getInputFromUser('Please enter the product name to be searched for');
    if (!productNameInput) {
        console.log('Invalid input. Please enter a valid product name');
        return false;
    } 
    const productsFound = productData.filter(product => sanitizeInput(product.title).includes(sanitizeInput(productNameInput))); 
    if (productsFound.length === 0) {
        console.log('No products found');
        return false;
    }
    return productsFound;
};