/**
 * Fetch the user data from JSON
 */
const usersData = await fetch('./resources/users.json')
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));

export const getUserData = () => {
    localStorage.setItem('registeredUsers', JSON.stringify(usersData));
    return JSON.parse(localStorage.getItem('registeredUsers'));
}