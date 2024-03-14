import { productData } from '../services/product-service.js';
import { sanitizeInput, getInputFromUser } from '../utils/common-utils.js';
import { PRICE, CATEGORY } from '../constants/shop-constants.js';
import {FLOAT_TYPE} from '../constants/common-constants.js';
/**
 * To Filter products based on multiple categories
 * @param {*} selectedFilter 
 * @returns filtered Products
 */
export const filterProductsByCategory = (selectedFilter) => {
    let filterValues = {};
    selectedFilter.forEach(option => {
        switch(option){
            case PRICE:
                filterValues.minPrice = getInputFromUser('Enter min price', FLOAT_TYPE);
                filterValues.maxPrice = getInputFromUser('Enter max price', FLOAT_TYPE);
                break;
            case CATEGORY:
                filterValues.category = getInputFromUser('Enter the category');
                break;
        }
    });
    const filteredProducts = filterProducts(filterValues);
    if (filteredProducts.length === 0) {
        console.log('No products found');
        return;
    }
    
    return filteredProducts;
};

/**
 * Filter products based on selection 
 * @param {*} filterValues 
 * @returns filtered prodcuts
 */
export const filterProducts = (filterValues) => {
    const {minPrice, maxPrice, category} = filterValues;

    return productData.filter(product => {
        if ((minPrice && product.price < minPrice) || (maxPrice && product.price > maxPrice)) {
            return false;
        }
        if (category && sanitizeInput(product.category) !== sanitizeInput(category)) {
            return false;
        }
        return true;
    });

}