import { calculateCartPrice, clearCart } from "./cart.js";
import { checkWalletBalance, updateWalletOnCheckout } from "./wallet.js";
import { CONFIRMATION } from '../constants/common-constants.js';
import { getInputFromUser } from '../utils/common-utils.js';
/**
 * Checkout Page
 */
export const checkout = () => {
    const totalCartPrice = calculateCartPrice();
    const walletAmount = checkWalletBalance();

    if (totalCartPrice <= 0) {
        alert('There are no items in the cart. Press "A" to add items.');
        return;
    }

    if (totalCartPrice > walletAmount) {
        alert(`You do not have enough money in the wallet. Current Amount: ${walletAmount} - Click 'R' to recharge wallet.`);
        return;
    }

    const confirmation = getInputFromUser(`Type ${CONFIRMATION} to confirm checkout! Total price : ${totalCartPrice}`);
    if (confirmation !== CONFIRMATION) {
        console.log('Checkout cancelled due to invalid statement');
        return;
    }

    clearCart();
    updateWalletOnCheckout(walletAmount, totalCartPrice);
    console.log('Checkout completed');
};