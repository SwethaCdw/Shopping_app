import { productData } from "../services/product-service.js";
import { clearCart, deleteProductFromCart, getCartDetails } from "./cart.js";
import { findDuplicateAndUpdate, getInputFromUser } from '../utils/common-utils.js';
import { SHOP, CART } from '../constants/shop-constants.js';
import { ADD_ITEM, INT_TYPE } from "../constants/common-constants.js";

let wishlist = [];

/**
 * Move to wishlist
 * @param {*} selectedOption 
 * @returns wishlist
 */
export const moveToWishlist = (selectedOption) => {
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
            clearCart();
            break;
        case 3:
            moveSpecificProductToWishlist(cart, CART);
            break;


    }
    return wishlist;
}

/**
 * Move Specific product to wishlist
 * @param {*} sourceArray 
 * @param {*} sourceName 
 */
const moveSpecificProductToWishlist = (sourceArray, sourceName) => {
    const productId = getInputFromUser(`Enter a product id to move to wishlist`, INT_TYPE);    
    if (isNaN(productId)) {
        console.log('Invalid Product ID');
        return;
    }

    let duplicate = findDuplicateAndUpdate(wishlist, productId, null, ADD_ITEM)
    if(!duplicate){
        const product = sourceArray.find(item => item.id === productId);
        if (!product) {
            console.log('Product not found in', sourceName);
            return;
        }
    
        wishlist.push({...product, quantity: 1, totalPrice: product.price});
    
        if (sourceName === CART) {
            deleteProductFromCart(productId);
        }
    }
};

/**
 * Get wishlist items
 * @returns wishlist items
 */
export const getWishlistItems = () =>  wishlist;

/**
 * Clear wishlist items
 */
export const clearWishlist = () => {
    if(wishlist.length){
        wishlist.length = 0;
        console.log("Wishlist cleared.");
    } else {
        alert("wishlist is empty. Press 'a' to Add items to cart");
    }
}