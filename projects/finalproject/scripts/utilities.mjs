export function getSearchParam() {
        const param = (window.location.href.split('?search=')[1]);
        return param;
    }