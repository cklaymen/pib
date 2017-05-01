import React, {Component} from 'react';

class UsersTable extends Component {
    handleFilterChange (event) {
        // zmiana filtrowania (wywoływanie po każdorazowej zmianie inputu filtra)
        let {changeFilter} = this.props;
        let newFilter = {};
        let birthDateFilter = null;
        switch (event.target.name) {
            case "dateOfBirthFrom":
            birthDateFilter = new Date(event.target.value);
            birthDateFilter.setTime(birthDateFilter.getTime() + birthDateFilter.getTimezoneOffset()*60*1000);
            newFilter["dateOfBirth"] = {from: event.target.value ? birthDateFilter : null};
            break;

            case "dateOfBirthTo":
            birthDateFilter = new Date(event.target.value);
            birthDateFilter.setTime(birthDateFilter.getTime() + birthDateFilter.getTimezoneOffset()*60*1000);            
            newFilter["dateOfBirth"] = {to: event.target.value ? birthDateFilter : null};
            break;

            case "experienceFrom":
            newFilter["experience"] = {from: event.target.value};
            break;

            case "experienceTo":
            newFilter["experience"] = {to: event.target.value};
            break;

            default:
            newFilter[event.target.name] = event.target.value;
            break;
        }
        changeFilter(newFilter);
    }

    resetFilter (event) {
        // resetowanie filtrowania
        let {resetFilter} = this.props;
        resetFilter();
    }

    render() {
        let {usersList, sortBy, sortMethod, changeSortBy} = this.props;

        let mappedList = usersList.map(user => 
        <tr key={user.id}>
            <td className="td-firstName">{user.firstName}</td>
            <td className="td-lastName">{user.lastName}</td>
            <td className="td-dateOfBirth">{user.dateOfBirth.toLocaleString()}</td>
            <td className="td-function">{user.function}</td>
            <td className="td-experience">{user.experience}</td>
        </tr>);
    
        let headSortClass = {
            firstName: null,
            lastName: null,
            dateOfBirt: null,
            function: null,
            experience: null
        };

        if (sortBy) {
            if (sortMethod === 'asc') {
                headSortClass[sortBy] = "sort-asc"
            } else if (sortMethod === "desc") {
                headSortClass[sortBy] = "sort-desc"
            }
        }

        return (
            <form>
            <table className="users-table">
                <thead>
                    <tr className="header">
                        <th onClick={() => changeSortBy("firstName")} className={headSortClass.firstName}>First name</th>
                        <th onClick={() => changeSortBy("lastName")} className={headSortClass.lastName}>Last name</th>
                        <th onClick={() => changeSortBy("dateOfBirth")} className={headSortClass.dateOfBirth}>Date of birth</th>
                        <th onClick={() => changeSortBy("function")} className={headSortClass.function}>Function</th>
                        <th onClick={() => changeSortBy("experience")} className={headSortClass.experience + " th-experience"}>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {mappedList}
                </tbody>
                <tfoot>
                    <tr className="users-filter">
                        <td><input type="text" name="firstName" onChange={this.handleFilterChange.bind(this)} placeholder="..."/></td>
                        <td><input type="text" name="lastName" onChange={this.handleFilterChange.bind(this)} placeholder="..."/></td>
                        <td><input type="datetime-local" name="dateOfBirthFrom" onChange={this.handleFilterChange.bind(this)} step="1"/><input type="datetime-local" name="dateOfBirthTo" onChange={this.handleFilterChange.bind(this)} step="1"/></td>
                        <td><input type="text" name="function" onChange={this.handleFilterChange.bind(this)} placeholder="..."/></td>                      
                        <td><input type="number" name="experienceFrom" onChange={this.handleFilterChange.bind(this)} placeholder="..."/> - <input type="number" name="experienceTo" onChange={this.handleFilterChange.bind(this)} placeholder="..."/></td>
                        <td><input type="reset" onClick={() => this.resetFilter()} value="clear"/></td>
                    </tr>
                </tfoot>
            </table>
            </form>
        );
    }
}

export default UsersTable;
