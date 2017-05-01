import SortArrayOfObj from "./SortArrayOfObj";

export default function SortUsersList (list, sortBy, method) {
    SortArrayOfObj(list, (a, b) => {
        if (method === "asc") {
            if (a[sortBy] > b[sortBy]) return 1;
            if (a[sortBy] < b[sortBy]) return -1;
            return 0;
        } else if (method === "desc") {
            if (a[sortBy] > b[sortBy]) return -1;
            if (a[sortBy] < b[sortBy]) return 1;
            return 0;
        }
    });
}

