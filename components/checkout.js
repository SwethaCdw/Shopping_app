import { clearCart, getCartDetails } from "./cart.js";
import { checkWalletBalance, updateWalletOnCheckout } from "./wallet.js";
import { CONFIRMATION } from '../constants/common-constants.js';
import { getInputFromUser } from '../utils/common-utils.js';
/**
 * Checkout Page
 */
export const checkout = () => {
    try {
        const {cart, cartPrice} = getCartDetails();
        const walletAmount = checkWalletBalance();
    
        if (cartPrice <= 0) {
            alert('There are no items in the cart. Press "A" to add items.');
            return;
        }
    
        const outOfStockItems = cart.filter(item => item.isOutOfStock).map(item =>  item.title);
        if (outOfStockItems.length !== 0){
            alert(`The following item(s) in cart is out of stock. Please remove item(s) to proceed ${outOfStockItems.join(', ')}`);
            return;
        }

        const priceUpdatedItems = cart.filter(item => item.isPriceUpdated).map(item =>  item.title);
        if (priceUpdatedItems.length !== 0){
            alert(`The following item(s) in cart has an updated price ${priceUpdatedItems.join(', ')}`);
        }

        if (cartPrice > walletAmount) {
            alert(`You do not have enough money in the wallet. Current Amount: ${walletAmount} - Click 'R' to recharge wallet. You require ${cartPrice - walletAmount} more!`);
            return;
        }
    
        const confirmation = getInputFromUser(`Type ${CONFIRMATION} to confirm checkout! Total price : ${cartPrice}`);
        if (confirmation !== CONFIRMATION) {
            console.log('Checkout cancelled due to invalid statement');
            return;
        }
    
        clearCart();
        updateWalletOnCheckout(walletAmount, cartPrice);
        console.log('Checkout completed');
    } catch (error) {
        console.log(error.message);
    }
};