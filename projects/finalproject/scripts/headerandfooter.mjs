const header = document.querySelector('header');
const headerFetch = fetch('./header.html');
const headerTemplate = headerFetch.text();
header.insertAdjacentHTML('beforeend', headerTemplate);