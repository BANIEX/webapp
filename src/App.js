import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Register from "./Components/Register/Register";
import User from "./Components/User/User";
import Nav from "./Components/Nav/Nav";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    let moviesList = localStorage.getItem("moviesList")
      ? JSON.parse(localStorage.getItem("moviesList"))
      : [];

    let favourite = localStorage.getItem("favourite")
      ? JSON.parse(localStorage.getItem("favourite"))
      : [];
    let collection = localStorage.getItem("collection")
      ? JSON.parse(localStorage.getItem("collection"))
      : [];

    this.state = {
      moviesList: moviesList,
      length_of_results: 0,
      collection: collection,
      favourite: favourite,
    };

    this.favourite_func = this.favourite_func.bind(this);

    console.log("Constructor called ...");
    // console.log(this.state.moviesList);

    // console.log(this.state.favourite);
    // console.log(this.state.collection);

    // console.log(this.state.length_of_results);
  }

  // let favourite_func(event){
  //   console.log("clicked");

  // }

  favourite_func = (event) => {
    console.log("favourite function clicked");
    console.log(event.currentTarget.id);
    let current_style = event.currentTarget.firstChild.style.color;
    console.log(current_style);
    let new_array

    if (current_style == "") {
      new_array = this.state.favourite.concat(event.currentTarget.id);
      this.setState({ favourite: new_array });
      localStorage.setItem("favourite", JSON.stringify(new_array));
    } else {
      new_array = this.removeItemAll(
        this.state.favourite,
        event.currentTarget.id
      );
      this.setState({ favourite: new_array });
      localStorage.setItem("favourite", JSON.stringify(new_array));


    }
  };

  removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  componentDidMount() {
    // localStorage.setItem("favourite", JSON.stringify())

    //  api request
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=ea617fdf0c18b92834b1d8463c9fee72"
      )
      .then((data) => {
        // console.log(data.data.results);

        this.setState({
          moviesList: data.data.results,
        });
      });
  }

  componentDidUpdate() {
    // this.favourite_func();
  }

  render() {
    return (
      <>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                moviesListProp={this.state.moviesList}
                collectionListProp={this.state.collection}
                favouriteListProp={this.state.favourite}
                favourite_funcProp={this.favourite_func}
              />
            }
          />
        </Routes>
      </>
    );
  }
}

export default App;
