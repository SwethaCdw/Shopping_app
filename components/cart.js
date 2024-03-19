import { productData } from '../services/product-service.js';
import { findDuplicateAndUpdate, notifyUserOnProductModification } from '../utils/common-utils.js';
import { ADD_ITEM, DELETE_ITEM } from '../constants/common-constants.js'
import { CART } from '../constants/shop-constants.js';
import { getUserDetails, updateUserDetails } from '../utils/user-utils.js';

/**
 * Add product item to cart
 * @returns cart Item and Cart Price
 */
export const addToCart = (productIdInput) => {
    let cart = getUserDetails(CART) || [];
    try {
        if (!productIdInput) {
            throw new Error('Invalid input. Please enter a valid product id.');
        }
        
        const product = productData.find(({ id }) => id === productIdInput);
        if (!product) {
            throw new Error('Product not found.');
        }

        const duplicate = findDuplicateAndUpdate(cart, productIdInput, null, ADD_ITEM);
        if (!duplicate) {
            cart.push({ ...product, quantity: 1, totalPrice: product.price });
        }
        updateUserDetails(cart, CART);

        const totalCartPrice = calculateCartPrice();
        return { product, totalCartPrice };
    } catch (error) {
        console.log(error.message);
        return {}; 
    }
};

/**
 * Clear all items from cart
 */
export const clearCart = () => {
    let cart = getUserDetails(CART) || [];
    if(cart.length){
        cart.length = 0;
        updateUserDetails(cart, CART);
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
    let cart = getUserDetails(CART) || [];
    if(cart){
        let cartPrice = calculateCartPrice();
        return {cart, cartPrice};
    } else {
        console.log('There are no items in the cart! Click "a" to add items to cart');
    }
  
}

/**
 * Delete product 
 * @param {*} productId 
 * @returns 
 */
export const deleteProductFromCart = (productId) => {
    let cart = getUserDetails(CART) || [];
    try {
        if (!productId) {
            throw new Error('Invalid input. Please enter a valid product id.');
        }

        const deletedItem = findDuplicateAndUpdate(cart, productId, null, DELETE_ITEM);
        if (!deletedItem) {
            throw new Error("Product not found in the cart.");
        }
        updateUserDetails(cart, CART);


        return deletedItem;
    } catch (error) {
        console.log(error.message);
        return '';
    }
}
/**
 * Calculate cart price
 * @returns total price in cart
 */
export const calculateCartPrice = () => {
    let cart = getUserDetails(CART) || [];
    try {
        const totalCartPrice = cart.reduce((total, product) => total + product.totalPrice, 0);
        return totalCartPrice;
    } catch (error) {
        console.log('An error occurred while calculating the cart price:', error.message);
        return 0; 
    }
};

/**
 * The cart items are modified based on the update made
 */
export const updateCartOnMarketChange = () => {
    let cart = getUserDetails(CART) || [];
    const updatedCart = cart?.map(item => {
        const { id, quantity } = item;
        const product = productData.find(p => p.id === id);
        if (product) {
            const { price, isOutOfStock } = product;
            const totalPrice = price * quantity;
            const isPriceUpdated = item.price !== price;
            if(isOutOfStock || isPriceUpdated){
                notifyUserOnProductModification(item.title);
            }
            return { ...item, price, totalPrice, isOutOfStock, isPriceUpdated };
        }
        return item;
    });
    updateUserDetails(updatedCart, CART); 
}
