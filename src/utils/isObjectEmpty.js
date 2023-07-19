export const isObjectEmpty = (obj) => {
    if (obj === null) {
        return null
    } else {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
};