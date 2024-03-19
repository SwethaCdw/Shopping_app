import { productData } from '../services/product-service.js';
import { getInputFromUser } from '../utils/common-utils.js';
import { PRICE, CATEGORY } from '../constants/shop-constants.js';
import {FLOAT_TYPE} from '../constants/common-constants.js';
/**
 * To Filter products based on multiple categories
 * @param {*} selectedFilter 
 * @returns filtered Products
 */
export const filterProductsByCategory = (selectedFilter) => {
    try {
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
            throw new Error("No products found");
        }
        
        return filteredProducts;
    } catch (error) {
        console.log(error.message);
        return [];
    }
};

/**
 * Filter products based on selection 
 * @param {*} filterValues 
 * @returns filtered prodcuts
 */
export const filterProducts = (filterValues) => { 
    try {
        const {minPrice, maxPrice, category} = filterValues;

        return productData.filter(product => {
            if ((minPrice && product.price < minPrice) || (maxPrice && product.price > maxPrice)) {
                return false;
            }
            if (category && product.category.sanitize() !== category.sanitize()) {
                return false;
            }
            return true;
        });
    } catch (error) {
        console.log('An error occurred while filtering products:', error.message);
        return [];
    }
};