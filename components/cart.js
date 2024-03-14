import { productData } from '../services/product-service.js';
import { findDuplicateAndUpdate } from '../utils/common-utils.js';
import { ADD_ITEM, DELETE_ITEM } from '../constants/common-constants.js'
var cart = []; 

/**
 * Add product item to cart
 * @returns cart Item and Cart Price
 */
export const addToCart = (productIdInput) => {
    if (!productIdInput) {
        console.log('Invalid input. Please enter a valid product id.');
        return false;
    }
    
    const product = productData.find(({ id }) => id === productIdInput);
    if (!product) {
        console.log('Product not found.');
        return false;
    }

    const duplicate = findDuplicateAndUpdate(cart, productIdInput, null, ADD_ITEM);
    if (!duplicate) {
        cart.push({ ...product, quantity: 1, totalPrice: product.price });
    }

    const totalCartPrice = calculateCartPrice();
    return { product, totalCartPrice };
};

/**
 * Clear all items from cart
 */
export const clearCart = () => {
    if(cart.length){
        cart.length = 0;
        console.log("Cart cleared.");
    } else {
        alert("Cart is empty. Press 'a' to Add items to cart");
    }
  };

  /**
   * Get Cart Details
   * @returns cart and cart Price
   */
export const getCartDetails = () => {
    let cartPrice = calculateCartPrice();
    return {cart, cartPrice};
}

/**
 * Delete product 
 * @param {*} productId 
 * @returns 
 */
export const deleteProductFromCart = (productId) => {
    if (!productId) {
        console.log('Invalid input. Please enter a valid product id.');
        return false;
    }

    const deletedItem = findDuplicateAndUpdate(cart, productId, null, DELETE_ITEM);
    if (!deletedItem) {
        console.log("Product not found in the cart.");
        return false;
    }

    return deletedItem;
}

/**
 * Calculate cart price
 * @returns total price in cart
 */
export const calculateCartPrice = () => {
    const totalCartPrice = cart.reduce((total, product) => total + product.totalPrice, 0)
    return totalCartPrice;
};

