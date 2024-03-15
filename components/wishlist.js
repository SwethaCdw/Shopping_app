import { productData } from "../services/product-service.js";
import { clearCart, deleteProductFromCart, getCartDetails } from "./cart.js";
import { findDuplicateAndUpdate, getInputFromUser } from '../utils/common-utils.js';
import { SHOP, CART, WISHLIST } from '../constants/shop-constants.js';
import { ADD_ITEM, INT_TYPE } from '../constants/common-constants.js';
import { getUserDetails, updateUserDetails } from "../utils/local-storage-utils.js";

/**
 * Move to wishlist
 * @param {*} selectedOption 
 * @returns wishlist
 */
export const moveToWishlist = (selectedOption) => {
    let wishlist = getUserDetails(WISHLIST)|| [];
    try {
        const { cart } = getCartDetails();
        switch(selectedOption){
            case 1:
                moveSpecificProductToWishlist(productData, SHOP);
                break;
            case 2:
                cart?.forEach((cartItem) => {
                    let duplicate = findDuplicateAndUpdate(wishlist, cartItem.id, cartItem.quantity, ADD_ITEM);
                    if (!duplicate) {
                        wishlist.push(cartItem);
                    }
                });
                updateUserDetails(wishlist, WISHLIST)
                clearCart();
                break;
            case 3:
                moveSpecificProductToWishlist(cart, CART);
                break;
        }
        return wishlist;
    } catch (error) {
        console.log('An error occurred while moving products to wishlist:', error.message);
        return []; 
    }
}

/**
 * Move Specific product to wishlist
 * @param {*} sourceArray 
 * @param {*} sourceName 
 */
const moveSpecificProductToWishlist = (sourceArray, sourceName) => {
    let wishlist = getUserDetails(WISHLIST)|| [];
    try {
        const productId = getInputFromUser(`Enter a product id to move to wishlist`, INT_TYPE);
        if (isNaN(productId)) {
            throw new Error('Invalid Product ID');
        }

        let duplicate = findDuplicateAndUpdate(wishlist, productId, null, ADD_ITEM)
        if(!duplicate){
            const product = sourceArray.find(item => item.id === productId);
            if (!product) {
                throw new Error(`Product not found in ${sourceName}`);
            }
        
            wishlist.push({...product, quantity: 1, totalPrice: product.price});
          
        } 
        updateUserDetails(wishlist, WISHLIST);

        if (sourceName === CART) {
            deleteProductFromCart(productId);
        }
    } catch (error) {
        console.log('An error occurred while moving product to wishlist:', error.message);
    }
};

/**
 * Get wishlist items
 * @returns wishlist items
 */
export const getWishlistItems = () => {
    let wishlist = getUserDetails(WISHLIST)|| [];
    return wishlist;
} 

/**
 * Clear wishlist items
 */
export const clearWishlist = () => {
    let wishlist = getUserDetails(WISHLIST)|| [];
    try {
        if (wishlist.length) {
            wishlist.length = 0;
            updateUserDetails(wishlist, WISHLIST);
            console.log("Wishlist cleared.");
        } else {
            alert("wishlist is empty. Press 'a' to Add items to cart");
        }
    } catch (error) {
        console.log('An unexpected error occurred:', error.message);
    }
}