import { searchProduct } from './components/search-product.js';
import { filterProductsByCategory } from './components/filter-product.js';
import { addToCart, getCartDetails, deleteProductFromCart, clearCart } from './components/cart.js';
import { checkout } from './components/checkout.js';
import { checkWalletBalance, rechargeWallet } from './components/wallet.js';
import { getWishlistItems, moveToWishlist , clearWishlist} from './components/wishlist.js';
import { multipleChoicePrompt, getInputFromUser } from './utils/common-utils.js';
import { FILTER_CHOICES } from './constants/shop-constants.js';
import { INT_TYPE } from './constants/common-constants.js';

document.addEventListener('keydown', function(event) {

    switch(event.key){
        case 's' || 'S':
            console.log('SEARCH FOR A PRODUCT');
            const productsFound = searchProduct();
            if(productsFound) {
                console.log('Products Found', productsFound);
            }
            break;
        case 'f' || 'F':
            console.log('FILTER PRODUCT BASED ON CATEGORIES');
            const selectedOptions = multipleChoicePrompt("Do you want this option to filter :", FILTER_CHOICES);
            if (selectedOptions.length > 0) {
                const filteredProducts = filterProductsByCategory(selectedOptions);
                console.log('Result Products', filteredProducts);
            } else {
                console.log("User didn't select any options");
            }
            break;
        case 'a' || 'A':
            console.log('ADD TO CART');
            const productIdInput = getInputFromUser('Enter a product id to add to cart', INT_TYPE);
            const { product, totalCartPrice } = addToCart(productIdInput);
            if(product && totalCartPrice){
                console.log(`Added ${product.title} to cart. Total Cart Price is ${totalCartPrice}`);
            }
            break;
        case 'd' || 'D':
            console.log('DISPLAY CART DETAILS');
            const {cart, cartPrice} = getCartDetails();
            if(cart.length){
                console.log('Cart -->', cart);
                console.log(`Total cart price ${cartPrice}`)
            } else {
                console.log('Cart is Empty! Click A to add items to cart')
            }
            break;
        case 'x' || 'X':
            console.log('DELETE CART ITEM');
            const productId = getInputFromUser('Enter a product id to delete from cart', INT_TYPE);
            const deletedItem = deleteProductFromCart(productId);
            if(deletedItem){
                console.log('Deleted item', deletedItem.title);
            }
            break;
        case 'q' || 'Q':
            clearCart();
            break;
        case 'm' || 'M':
            console.log('MOVE TO WISHLIST');
            const option = getInputFromUser(`Type '1' - Add a product to wishlist' \n Type '2' - Move cart items to wishlist \n Type 3 - Move a particular item from cart to wishlist`,INT_TYPE);
            const wishlist = moveToWishlist(option);
            console.log('Wishlist items : ', wishlist);
            break;
        case 'w' || 'W':
            console.log('GET WISHLIST ITEMS');
            const wishlistItems = getWishlistItems();
            if(wishlistItems.length) {
                console.log('Wishlist Items:', wishlistItems);
            } else {
                console.log('Wishlist is empty. Press "m" to add items to Wishlist');
            }
            break;
        case 'z' || 'Z':
            console.log('CLEAR WISHLIST ITEMS');
            clearWishlist();
            break;
        case 'c' || 'C':
            console.log('CHECKOUT');
            checkout();
            break;
        case 'r' || 'R':
            console.log('RECHARGE WALLET');
            const walletAmount = rechargeWallet();
            if(walletAmount){
                console.log(`Succesfully recharged wallet, Total balance is ${walletAmount}`)
            }
            break;
        case 'b' || 'B':
            const walletBalance = checkWalletBalance();
            console.log(`WALLET BALANCE : ${walletBalance}`);
            break;
    }

});