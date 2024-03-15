import { PRODUCT_UPDATE_TIME } from "../constants/common-constants.js";
import { getUpdatedProductData } from "../services/product-service.js";
import { getUserData } from "../services/user-service.js";
import { getInputFromUser } from "../utils/common-utils.js";

export const userAuth = (() => {
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let username = localStorage.getItem('username');

    const userData = getUserData();

    const isValidUser = (username, password) => {
        const user = userData.find(user => user.username === username && user.password === password);
        return !!user;
    };

    const login = () => {
        username = getInputFromUser('Enter username');
        const password = getInputFromUser('Enter password');

        if (isValidUser(username, password)) {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            console.log('Login successful');
            //Update the product data after the Product update time = 30 seconds
            setTimeout(getUpdatedProductData, PRODUCT_UPDATE_TIME);
        } else {
            console.log('Invalid username or password');
        }
    };

    const logout = () => {
        isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
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
        displayUserInfo
    };
})();