export async function header() {
    const header = document.querySelector('header');
    const headerFetch = await fetch('/wdd330/projects/finalproject/header.html');
    const headerTemplate = await headerFetch.text();
    header.innerHTML = headerTemplate;
}

export async function footer() {
    const footer = document.querySelector('footer');
    const footerFetch = await fetch('/wdd330/projects/finalproject/footer.html');
    const footerTemplate = await footerFetch.text();
    footer.innerHTML = footerTemplate;
}
