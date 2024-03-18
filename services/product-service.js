import { updateCartOnMarketChange } from "../components/cart.js";
import { userAuth } from "../components/user-authentication.js";
import { MAX_PRICE_UPDATE, PRODUCTS_TO_UPDATE, PRODUCT_UPDATE_TIME } from "../constants/common-constants.js";
import { getRandomBoolean, getRandomNumber } from "../utils/math-utils.js";


/**
 * Fetch the products data from JSON
 */
export const productData = await fetch('./resources/productsData.json')
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));

/**
 * Update Product details after a period of time
 */
export const getUpdatedProductData = () => {
    if(userAuth.isLoggedInUser()){
        PRODUCTS_TO_UPDATE.forEach(productId => {
            const product = productData.find(p => p.id === productId);
            if(product){
                product.price = getRandomNumber(MAX_PRICE_UPDATE);
                product.isOutOfStock = getRandomBoolean();
            }
        });
        updateCartOnMarketChange();
    }
}

