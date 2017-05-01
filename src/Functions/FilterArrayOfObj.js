export default function FilterArrayOfObj (arr, func) {
    // return arr.filter(func);
    // implementacja własnej funkcji filtrującej:
    let filteredArr = [];
    arr.forEach(elem => {
        if (func(elem)) {
            filteredArr.push(elem);
        }
    });

    return filteredArr;
}