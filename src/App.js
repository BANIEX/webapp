import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Register from "./Components/Register/Register";
import User from "./Components/User/User";
import Nav from "./Components/Nav/Nav";
import Collection from "./Components/Collection/Collection";
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
    this.collection_func = this.collection_func.bind(this);



    console.log("Constructor called ...");
  }


  favourite_func = (event) => {
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


  collection_func = (event)=>{
    console.log("collection function clicked");
    console.log(event.currentTarget.id);
    let current_className = event.currentTarget.firstChild.className;
    console.log(current_className);
    let new_array

    if(current_className == 'fa fa-plus'){
      new_array = this.state.collection.concat(event.currentTarget.id);
      this.setState({collection: new_array})
      localStorage.setItem("collection", JSON.stringify(new_array))

    }else{
      new_array = this.removeItemAll(this.state.collection, event.currentTarget.id);
      this.setState({collection: new_array})
      localStorage.setItem("collection", JSON.stringify(new_array));

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
                collection_funcProp={this.collection_func}
              />
            }
          />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </>
    );
  }
}

export default App;
