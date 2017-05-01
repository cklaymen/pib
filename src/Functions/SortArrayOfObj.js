export default function sortArrayOfObj (arr, func) {
    // arr.sort(func);
    // implementacja własnej funkcji sortującej:
    let tmp;
    let changes;
    do {
        changes = false;
        for (let i=0; i<arr.length-1; i++) {
            if (func(arr[i], arr[i+1]) > 0) {
                tmp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = tmp;
                changes = true;
            }
        }
    } while (changes === true);
}