import FilterArrayOfObj from "./FilterArrayOfObj";

export default function FilterUsersList (list, filter) {
    return FilterArrayOfObj(list, user => {
        let fit = true;
        if (filter.firstName && !new RegExp(filter.firstName, "i").test(user.firstName)) fit = false;
        if (filter.lastName && !new RegExp(filter.lastName, "i").test(user.lastName)) fit = false;
        if (filter.function && !new RegExp(filter.function, "i").test(user.function)) fit = false;
        if (filter.experience) {
            if (filter.experience.from && !(user.experience >= filter.experience.from)) fit = false;
            if (filter.experience.to && !(user.experience <= filter.experience.to)) fit = false; 
        }
        if (filter.dateOfBirth) {
            if (filter.dateOfBirth.from && !(user.dateOfBirth >= filter.dateOfBirth.from)) fit = false;
            if (filter.dateOfBirth.to && !(user.dateOfBirth <= filter.dateOfBirth.to)) fit = false; 
        }
        return fit;
    });
}