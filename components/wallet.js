import { WALLET_LIMIT, WALLET, WALLET_MIN_PRICE } from "../constants/wallet-constants.js";
import { getInputFromUser } from '../utils/common-utils.js';
import { FLOAT_TYPE } from '../constants/common-constants.js';
import { getUserDetails, updateUserDetails } from "../utils/user-utils.js";



/**
 * Recharge wallet
 * @returns updated wallet amount
 */
export const rechargeWallet = () => {
    let walletAmount = getUserDetails(WALLET) || WALLET_MIN_PRICE;
    try {
        const rechargeAmount = getInputFromUser('Please enter the amount to be recharged', FLOAT_TYPE);
        if (!rechargeAmount || rechargeAmount <= 0) { 
            throw new Error('Invalid input. Please enter a valid positive amount');
        } 
        
        const updatedWalletAmount = walletAmount + rechargeAmount;
        if (updatedWalletAmount > WALLET_LIMIT) {
            throw new Error(`Limit exceeded. Limit is ${WALLET_LIMIT}. You can recharge up to ${WALLET_LIMIT - walletAmount}`);
        }
        
        walletAmount = updatedWalletAmount;
        updateUserDetails(walletAmount, WALLET);
        return updatedWalletAmount;
    } catch (error) {
        console.log(error.message);
        return -1;
    }
};

/**
 * Check wallet balance
 * @returns wallet amount
 */
export const checkWalletBalance = () => {
    let walletAmount = getUserDetails(WALLET) || WALLET_MIN_PRICE;
    return walletAmount;
} 

/**
 * Update wallet on checkout
 * @param {*} updatedWalletAmount 
 * @param {*} cartPrice 
 * @returns wallet amount
 */
export const updateWalletOnCheckout = (updatedWalletAmount, cartPrice) => {
    let walletAmount = getUserDetails(WALLET) || WALLET_MIN_PRICE;
    walletAmount = updatedWalletAmount - cartPrice;
    updateUserDetails(walletAmount, WALLET);
} 