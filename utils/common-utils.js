import { DELETE_ITEM, ADD_ITEM, INT_TYPE, FLOAT_TYPE } from "../constants/common-constants.js";
/**
 * Multiple choice prompt
 * @param {*} message 
 * @param {*} choices 
 * @returns Selected options
 */
export const multipleChoicePrompt = (message, choices) => {
    try {
        const selectedOptions = [];
        
        choices.forEach(choice => {
            const isConfirmed = confirm(`${message}\n\n${choice}`);
            if (isConfirmed) {
                selectedOptions.push(choice);
            }
        });
    
        return selectedOptions;
    } catch (error) {
        console.log('An unexpected error occurred:', error.message);
        return [];
    }
}

/**
 * find Duplicate and Update the price and quantity
 * @param {*} itemsArray 
 * @param {*} productId 
 * @param {*} isDeletion 
 * @returns deleted item/true/false
 */
export const findDuplicateAndUpdate = (itemsArray, productId, productQuantity, operation) => {
    try {
        const duplicateItem = itemsArray?.find(item => item.id === productId);

        if (!duplicateItem) {
            return false; 
        }

        switch (operation) {
            case DELETE_ITEM:
                if (duplicateItem.quantity > 1) {
                    const option = getInputFromUser(`Click 1 for removing the whole product \n Click 2 for removing one quantity of the product`, INT_TYPE);
                    if(option){
                        switch(option){
                            case 1:
                                itemsArray = removeObjectFromArray(itemsArray, duplicateItem);
                                break;
                            case 2: 
                                duplicateItem.quantity--;
                                duplicateItem.totalPrice = duplicateItem.price * duplicateItem.quantity;
                                break;
                        }
                    } else {
                        console.log('Invalid Input');
                    }
                } else {
                    itemsArray = removeObjectFromArray(itemsArray, duplicateItem);
                }
                return duplicateItem;

            case ADD_ITEM:
                productQuantity ? duplicateItem.quantity += productQuantity : duplicateItem.quantity++;
                duplicateItem.totalPrice = duplicateItem.price * duplicateItem.quantity;
                return true;
            default:
                return false;
        }
    } catch (error) {
        console.log('An unexpected error occurred:', error.message);
        return null; 
    }
};


/**
 * Prompt the user with the message
 * @param {*} message 
 * @param {*} type 
 * @returns 
 */
export const getInputFromUser = (message, type) => {
    if (type === INT_TYPE || type === FLOAT_TYPE) {
        return type === INT_TYPE ? parseInt(prompt(message)) : parseFloat(prompt(message));
    } else {
        return prompt(message)?.trim();
    }
}

/**
 * Remove the object from an array
 * @param {*} sourceArray 
 * @param {*} itemToBeRemoved 
 * @returns 
 */
export const removeObjectFromArray = (sourceArray, itemToBeRemoved) => {
    sourceArray.splice(sourceArray.indexOf(itemToBeRemoved), 1);
    return sourceArray;
}

String.prototype.sanitize = function() {
    return this.trim().replace(/[^\w\s]/gi, '').toLowerCase();
}

export const notifyUserOnProductModification = (productName) => {
    alert(`The cart item ${productName} details in your cart has been modified. Please verify them`);
}