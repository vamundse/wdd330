const listItems = document.querySelectorAll('#items li');
listItems.forEach((item) => {
    console.log('Name:', item.dataset.name);
    console.log('Category:', item.dataset.category);
    console.log('Color:', item.dataset.color);
});

const details = document.createElement('div');
document.body.appendChild(details);
listItems.forEach((item) => {
    item.addEventListener('click', () => {
        details.innerHTML = `
        <h2>Details</h2>
        <p>Name: ${item.dataset.name}</p>
        <p>Category: ${item.dataset.category}</p>
        <p>Color: ${item.dataset.color}</p>`;
    });
});