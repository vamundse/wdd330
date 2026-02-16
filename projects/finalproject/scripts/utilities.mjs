export function getSearchParam() {
    const param = (window.location.href.split('?search=')[1]);
    return param;
}

export function getParam() {
    const param = (window.location.href.split('?')[1]);
    return param;
}

export function yearCopyright() {
    const year = new Date().getFullYear().toString();
    const updateYear = document.getElementById('year');
    updateYear.textContent = year;
    console.log('Footer - copyright year:', year);
}

export function pageUpdated() {
    const date = document.lastModified;
    const onlyDate = date.split(' ')[0].toString();
    const updateDate = document.getElementById('updated');
    updateDate.textContent = onlyDate;
    console.log('Footer - page update date:', onlyDate);
}