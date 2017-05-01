import React, { Component } from 'react';
import './App.css';

import UsersTable from "./Components/UsersTable";
import PagesNav from "./Components/PagesNav";

import ConvertToDateObj from "./Functions/ConvertToDateObj";
import SortUsersList from "./Functions/SortUsersList";
import FilterUsersList from "./Functions/FilterUsersList";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      usersList: [],
      formattedUsersList: [],
      usersPerPage: 5,
      page: 1,
      pagesCount: 0,
      sortBy: "",
      sortMethod: "asc",
      filterBy: "",
      filterValue: "",
      filter: {
        firstName: null,
        lastName: null,
        dateOfBirth: {
          from: null,
          to: null
        },
        function: null,
        experience: {
          from: null,
          to: null
        }
      }
    }
  }

  componentDidMount () {
    this.fetchSluzba();
  }

  fetchSluzba () {
    // wczytywanie listy użytkowników
    fetch("sluzba.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          usersList: data.map(elem => {
            elem.dateOfBirth = ConvertToDateObj(elem.dateOfBirth);
            return elem;
          })
        }, 
        () => this.updateFormattedList());
      })
      .catch(() => {
        console.log("Fetching data error.");
      });
  }

  updateFormattedList () {
    // sortowanie, filtrowanie listy użytkowników do wyświetlenia
    // oraz konfigurowanie odpowiednich, zależnych od niej, parametrów (liczba stron oraz obecnie wyświetlana)
    let formattedList = this.state.usersList;
    formattedList = FilterUsersList(formattedList, this.state.filter);
    if (this.state.sortBy) {
      SortUsersList(formattedList, this.state.sortBy, this.state.sortMethod);
    }
    let pagesCount = Math.ceil(formattedList.length / this.state.usersPerPage);
    this.setState((state) => {
      state.formattedUsersList = formattedList;
      state.pagesCount = pagesCount;
      if (state.page > pagesCount) {
        state.page = pagesCount;
      } else if (state.page === 0 && pagesCount > 0) {
        state.page = 1;
      }
    })
  }

  getPagedList () {
    // zwraca listę użytkownikó gotową do wyświetlenia
    // biorąc pod uwagę liczbę użytkowników wyświetlanych na stronę oraz obecny numer strony
    let pagedList = this.state.formattedUsersList;    

    let startIndex = (this.state.page - 1) * this.state.usersPerPage;
    pagedList = pagedList.slice(startIndex, startIndex + this.state.usersPerPage);
    
    return pagedList;
  }

  nextPage () {
    this.setState({page: this.state.page + 1});
  }

  prevPage () {
    this.setState({page: this.state.page - 1});
  }

  changeSortBy (param) {
    // zmiana parametrów potrzebnych do sortowania
    let newSortMethod = "asc";
    if (this.state.sortBy === param) {
      let sortMethod = this.state.sortMethod;
      if (sortMethod === "asc") {
        newSortMethod = "desc";
      }
    }
    this.setState({sortBy: param, sortMethod: newSortMethod}, () => this.updateFormattedList());
  }

  changeFilter (newFilter) {
    // zmiana parametrów potrzebnych do filtrowania
    this.setState((state) => {
      for (let key in newFilter) {
        if (typeof newFilter[key] === "object") {
          for (let sKey in newFilter[key]) {
            state.filter[key][sKey] = newFilter[key][sKey];
          }
        } else {
          state.filter[key] = newFilter[key];
        }
      }
    }, () => this.updateFormattedList());
  }

  resetFilter () {
    // resetowanie parametrów filtrowania
    this.setState((state) => {
      for (let key in state.filter) {
        if (typeof state.filter[key] === "object") {
          for (let sKey in state.filter[key]) {
            state.filter[key][sKey] = null;
          }
        } else {
          state.filter[key] = null;
        }
      }
    }, () => this.updateFormattedList());
  }

  render() {
    return (
      <div className="app">
        <UsersTable 
          usersList={this.getPagedList()} 
          sortBy={this.state.sortBy} 
          sortMethod={this.state.sortMethod} 
          changeSortBy={this.changeSortBy.bind(this)}
          changeFilter={this.changeFilter.bind(this)} 
          resetFilter={this.resetFilter.bind(this)}
        />
        <PagesNav 
          page={this.state.page} 
          numberOfPages={this.state.pagesCount} 
          changePage={{next: this.nextPage.bind(this), prev: this.prevPage.bind(this)}}
        />
      </div>
    );
  }
}
export default App;
