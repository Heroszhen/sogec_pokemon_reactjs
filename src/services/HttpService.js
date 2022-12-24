export const fetchGet = async (url) => {
    try {
        let response = await fetch(url, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            method: 'get'
        });
        return response = await response.json();
    } catch (err) {
        throw new Error(err);
    }
}