import { userAuth } from "../components/login.js";


export const getUserDetails = (userDetail) => {
    let username = userAuth.getLoggedInUsername();
    const userDetails = JSON.parse(localStorage.getItem(`${username}-details`));
    return userDetails ? userDetails[userDetail] : null;
}

export const updateUserDetails = (data, objectName) => {
    let username = userAuth.getLoggedInUsername();
    const userDataString = localStorage.getItem(`${username}-details`);
    let userData = userDataString ? JSON.parse(userDataString) : {};
    userData = {
        ...userData,
        [objectName]: data
    };
    localStorage.setItem(`${username}-details`, JSON.stringify(userData));
}