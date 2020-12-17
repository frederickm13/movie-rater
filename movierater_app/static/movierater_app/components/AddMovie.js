"use strict";
import { sendHttpAsync } from "../http.js";
import { SearchForm } from './SearchForm.js';


class AddMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie_name: "",
            movie_release_year: "",
            movie_genre: "",
            movie_parent_rating: "",
            movie_genres: [],
            movie_parent_ratings: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateGenres = this.populateGenres.bind(this);
        this.populateParentRatings = this.populateParentRatings.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleParentRatingChange = this.handleParentRatingChange.bind(this);
        this.handleReleaseYearChange = this.handleReleaseYearChange.bind(this);

        this.populateGenres();
        this.populateParentRatings();
    }

    populateGenres() {
        sendHttpAsync("api/genres", "GET")
            .then(response => {
                if (response.ok) {
                    this.setState(
                        {
                            movie_genres: response.body
                        }
                    )
                }
            });
    }

    populateParentRatings() {
        sendHttpAsync("api/parent_ratings", "GET")
            .then(response => {
                if (response.ok) {
                    this.setState(
                        {
                            movie_parent_ratings: response.body
                        }
                    )
                }
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        let postBody = {
            movie_name: this.state.movie_name,
            movie_release_year: this.state.movie_release_year,
            movie_genre: this.state.movie_genre,
            movie_parent_rating: this.state.movie_parent_rating
        }

        sendHttpAsync("api/movies", "POST", postBody)
            .then(response => {
                if (response.ok) {
                    ReactDOM.render(
                        React.createElement(SearchForm),
                        document.querySelector("#app")
                    );
                }
            })
    }

    handleNameChange(event) {
        this.setState({
            movie_name: event.target.value
        });
    }

    handleReleaseYearChange(event) {
        this.setState({
            movie_release_year: event.target.value
        });
    }

    handleGenreChange(event) {
        this.setState({
            movie_genre: event.target.value
        });
    }

    handleParentRatingChange(event) {
        this.setState({
            movie_parent_rating: event.target.value
        });
    }

    render() {
        return React.createElement(
            "div", 
            {
                class: "my-3"
            },
            React.createElement(
                "h1",
                null,
                "Add new movie"
            ),
            React.createElement(
                "form",
                {
                    onSubmit: this.handleSubmit,
                    class: "my-3",
                },
                React.createElement(
                    "div",
                    {
                        class: "my-3"
                    },
                    React.createElement(
                        "label",
                        {
                            for: "movie-name-input",
                            class: "form-label"
                        },
                        "Movie name"
                    ),
                    React.createElement(
                        "input",
                        {
                            id: "movie-name-input",
                            type: "text",
                            class: "form-control",
                            value: this.state.movie_name,
                            onChange: this.handleNameChange
                        }
                    )
                ),
                React.createElement(
                    "div",
                    {
                        class: "my-3"
                    },
                    React.createElement(
                        "label",
                        {
                            for: "movie-release-year-input",
                            class: "form-label"
                        },
                        "Release year"
                    ),
                    React.createElement(
                        "input",
                        {
                            id: "movie-release-year-input",
                            type: "text",
                            class: "form-control",
                            value: this.state.movie_release_year,
                            onChange: this.handleReleaseYearChange
                        }
                    )
                ),
                React.createElement(
                    "div",
                    {
                        class: "my-3"
                    },
                    React.createElement(
                        "label",
                        {
                            for: "movie-genre-input",
                            class: "form-label"
                        },
                        "Genre"
                    ),
                    React.createElement(
                        "select",
                        {
                            id: "movie-genre-input",
                            class: "form-control form-select",
                            value: this.state.movie_genre,
                            onChange: this.handleGenreChange
                        },
                        React.createElement(
                            "option",
                            {
                                value: null,
                                selected: true
                            }, 
                            "Select a genre"
                        ),
                        (
                            this.state.movie_genres.length > 0 ? 
                                this.state.movie_genres.map((genre,index) => {
                                    return React.createElement(
                                        "option",
                                        {
                                            value: genre.id
                                        },
                                        genre.name
                                    );
                                }) : null
                        )
                    )
                ),
                React.createElement(
                    "div",
                    {
                        class: "my-3"
                    },
                    React.createElement(
                        "label",
                        {
                            for: "movie-parent-rating-input",
                            class: "form-label"
                        },
                        "Parent Rating"
                    ),
                    React.createElement(
                        "select",
                        {
                            id: "movie-parent-rating-input",
                            class: "form-control form-select",
                            value: this.state.movie_parent_rating,
                            onChange: this.handleParentRatingChange
                        },
                        React.createElement(
                            "option",
                            {
                                value: null,
                                selected: true
                            }, 
                            "Select a parent rating"
                        ),
                        (
                            this.state.movie_parent_ratings.length > 0 ? 
                                this.state.movie_parent_ratings.map((rating,index) => {
                                    return React.createElement(
                                        "option",
                                        {
                                            value: rating.id
                                        },
                                        rating.parent_rating
                                    );
                                }) : null
                        )
                    )
                ),
                React.createElement(
                    "input", 
                    {
                        type: "submit",
                        value: "Add movie",
                        class: "btn btn-primary"
                    }
                )
            )
        );
    }
}


// Export statements
export { AddMovie };