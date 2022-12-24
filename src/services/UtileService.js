export const wait = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, seconds * 1000);
    });
}