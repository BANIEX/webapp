export default function Home(props){

      let moviesList = props.moviesListProp;


    


    let viewMovies = moviesList.map((movie, index) => {

      let favourite_func = props.favourite_funcProp;
    let favouriteList = props.favouriteListProp;


      let check = "fa fa-check-circle";
      let plus = "fa fa-plus";
      let fa_color = "";

      // console.log(moviesList);


      // console.log(favouriteList);



      // console.log(favouriteList[index]);
      // let favourite_id_extract = favouriteList[index].slice(9)

      // if(index < favouriteList.length){
      //   let favourite_id_extract = favouriteList[index].slice(9);
      //   fa_color = movie.id == favourite_id_extract ? "red" : ""
      // }

      for(let i = 0; i < favouriteList.length; i++){
        let favourite_id_extract = favouriteList[i].slice(9);
        // console.log(movie.id)
        // console.log(favourite_id_extract)
        if (favourite_id_extract == movie.id){
          fa_color = 'red'
          // console.log("match...")
          break
        }
        else{
          fa_color=''
        }

      }

      console.log('HI');

      // fa_color = movie.id == favourite_id_extract ? "red" : ""

      let url = "https://image.tmdb.org/t/p/original/" + movie.backdrop_path;

        // let Poster = movie.Poster == "N/A" ? "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" : movie.Poster
        // console.log(url);
        let Poster = url


        return (
          <div className="col-md-3 movie_div" key={index} id={movie.id}>
            {/* {favourite_func()} */}

            <div className="card mb-4 shadow-sm">
              <img src={Poster} alt="img" />

              <div className="card-body">
                <h5 className="card-text">
                  {movie.original_name || movie.original_title}
                </h5>
                <h6>
                  Released{" "}
                  <span className="badge badge-primary">
                    {movie.first_air_date || movie.release_date}
                  </span>
                </h6>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary collection"
                      id={"collection" + movie.id}
                    >
                      <i className="fa fa-plus" style={{ color: '' }}></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary like"
                      id={"favourite" + movie.id}
                      onClick={favourite_func}
                    >
                      <i className="fa fa-heart" style={{ color: fa_color }}></i>
                    </button>
                  </div>
                  {/* <small className="text-muted">{movie.Runtime}</small> */}
                </div>
              </div>
            </div>
          </div>
        );

    })


    return (
        <>
            <main role="main">

<section className="jumbotron text-center">
  <div className="container">
    <h1>Enjoy Movies</h1>
    <div className='col-8 m-auto'>
    <input type='search' placeholder='Search movies ...' className='form-control' style={{ height: '3em'}}/>
    </div>
    <p>
      <button className="btn btn-lg btn-primary my-2">Search</button>
    </p>
  </div>
</section>

<div className="album py-5 bg-light">
  <div className="container">

    <div className="row">
            {viewMovies}

    </div>
  </div>
</div>
</main>
        </>
    )
}