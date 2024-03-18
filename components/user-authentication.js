import { PRODUCT_UPDATE_TIME } from "../constants/common-constants.js";
import { getUpdatedProductData } from "../services/product-service.js";
import { getUserData } from "../services/user-service.js";
import { getInputFromUser } from "../utils/common-utils.js";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils/local-storage-utils.js';
import { LOCAL_STORAGE_KEYS } from '../constants/common-constants.js'

export const userAuth = (() => {
    let isLoggedIn;
    let username;
    const userData = getUserData();

    const initializeUserAuth = () =>{
        isLoggedIn = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGGED_IN) === 'true';
        username = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.USERNAME)
    }
    
   
    const isValidUser = (username, password) => {
        const user = userData.find(user => user.username === username && user.password === password);
        return !!user;
    };

    const login = () => {
        username = getInputFromUser('Enter username');
        const password = getInputFromUser('Enter password');

        if (isValidUser(username, password)) {
            isLoggedIn = true;
            setItemInLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGGED_IN, 'true');
            setItemInLocalStorage(LOCAL_STORAGE_KEYS.USERNAME, username);
            console.log('Login successful');
            //Update the product data after the Product update time = 30 seconds
            setTimeout(getUpdatedProductData, PRODUCT_UPDATE_TIME);
        } else {
            console.log('Invalid username or password');
        }
    };

    const logout = () => {
        isLoggedIn = false;
        removeItemFromLocalStorage(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
        removeItemFromLocalStorage(LOCAL_STORAGE_KEYS.USERNAME);
        console.log('Logout successful');
    };

    const isLoggedInUser = () => {
        return isLoggedIn;
    };

    const getLoggedInUsername = () => {
        return username;
    };

    const displayUserInfo = () => {
        if (isLoggedIn) {
            console.log('Logged in as:', username);
        } else {
            console.log('User is not logged in');
        }
    };

    return {
        login,
        logout,
        isLoggedInUser,
        getLoggedInUsername,
        displayUserInfo,
        initializeUserAuth
    };
})();