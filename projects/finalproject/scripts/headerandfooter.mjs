export async function header() {
    const header = document.querySelector('header');
    const headerFetch = await fetch('header.html');
    const headerTemplate = await headerFetch.text();
    header.insertAdjacentHTML('beforeend', headerTemplate);
}

export async function footer() {
    const footer = document.querySelector('footer');
    const footerFetch = await fetch('footer.html');
    const footerTemplate = await footerFetch.text();
    footer.insertAdjacentHTML('beforeend', footerTemplate);
}