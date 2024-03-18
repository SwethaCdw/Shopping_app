import { userAuth } from "../components/login.js";
import { getItemFromLocalStorage, setItemInLocalStorage } from "./local-storage-utils.js";

/**
 * Get user details from local storage
 * @param {*} userDetail 
 * @returns user details
 */
export const getUserDetails = (userDetail) => {
    let username = userAuth.getLoggedInUsername();
    const userDetails = JSON.parse(getItemFromLocalStorage(`user-${username}-details`));
    return userDetails ? userDetails[userDetail] : null;
}

/**
 * Set user details in local storage
 * @param {*} data 
 * @param {*} objectName 
 */
export const updateUserDetails = (data, objectName) => {
    let username = userAuth.getLoggedInUsername();
    const userDataString = getItemFromLocalStorage(`user-${username}-details`);
    let userData = userDataString ? JSON.parse(userDataString) : {};
    userData = {
        ...userData,
        [objectName]: data
    };
    setItemInLocalStorage(`user-${username}-details`, JSON.stringify(userData));
}