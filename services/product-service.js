

/**
 * Fetch the products data from JSON
 */
export const productData = await fetch('./resources/productsData.json')
.then(response => response.json())
.then(data => {
    return data;
})
.catch(error => console.error('Error reading JSON file:', error));
