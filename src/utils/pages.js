export const getPagesArray = (totalPages, limit) => {
    let result = []
    for (let i = limit - 10; i < limit; i++) {
        if (limit <= totalPages) {
            result.push(i + 1)
        }
    }
    return result;
}