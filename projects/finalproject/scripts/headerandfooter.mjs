export async function header() {
    const header = document.querySelector('header');
    const headerFetch = await fetch(new URL('../header.html', import.meta.url));;
    const headerTemplate = await headerFetch.text();
    header.innerHTML = headerTemplate;
}

export async function footer() {
    const footer = document.querySelector('footer');
    const footerFetch = await fetch(new URL('../footer.html', import.meta.url));
    const footerTemplate = await footerFetch.text();
    footer.innerHTML = footerTemplate;
}