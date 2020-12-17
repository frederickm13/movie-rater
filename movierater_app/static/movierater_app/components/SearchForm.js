"use strict";
import { MovieDetail } from './MovieDetail.js';
import { AddMovie } from './AddMovie.js';
import { sendHttpAsync } from '../http.js';
import { showAlert } from '../util.js';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || "",
            searchString: props.searchString,
            moviesList: [],
            didSearch: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openMovie = this.openMovie.bind(this);
        this.addNewMovie = this.addNewMovie.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.value === null || this.state.value.trim() === "") {
            showAlert("alert-danger", "Search value cannot be blank.");
            return false;
        }

        this.setState({
            didSearch: true
        });

        sendHttpAsync(`api/movies/search/${this.state.value}`, "GET")
            .then(response => {
                if (response.ok) {
                    this.setState({ 
                        moviesList: response.body 
                    });
                }
            });
    }

    openMovie(event) {
        event.preventDefault();
        sendHttpAsync(`api/movies/${event.target.dataset.pk}`, "GET")
            .then(response => {
                if (response.ok) {
                    ReactDOM.render(
                        React.createElement(MovieDetail, {
                            movie: response.body
                        }),
                        document.querySelector("#app")
                    )
                }
            });
    }

    addNewMovie(event) {
        event.preventDefault();
        ReactDOM.render(
            React.createElement(AddMovie),
            document.querySelector("#app")
        );
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                {
                    class: "my-3 text-center"
                },
                React.createElement(
                    "h1",
                    null,
                    "Search All Movies"
                ),
                React.createElement(
                    "form",
                    {
                        onSubmit: this.handleSubmit,
                        class: "my-3",
                    },
                    React.createElement(
                        "input",
                        {
                            type: "text",
                            value: this.state.value,
                            onChange: this.handleChange,
                            class: "form-control my-3",
                        }
                    ),
                    React.createElement(
                        "input", 
                        {
                            type: "submit",
                            value: "Search",
                            class: "btn btn-primary",
                        }
                    )
                )
            ),
            (
                (this.state.didSearch ? (this.state.moviesList.length > 0 ? React.createElement(
                    "div", 
                    {
                        class: "list-group"
                    },
                    this.state.moviesList.map((movie,index) => {
                        return React.createElement(
                            "a",
                            {
                                href: "#",
                                class: "list-group-item list-group-item-action",
                                "data-pk": movie.id,
                                onClick: this.openMovie
                            },
                            movie.name
                        );
                    })
                ) : React.createElement("div", { class: "text-center" }, "No results found.")) : null)
            ),
            (
                this.state.didSearch ? React.createElement(
                    "div",
                    {
                        class: "text-center my-3"
                    },
                    "Can't find what you're looking for? ",
                    React.createElement(
                        "a",
                        {
                            href: "#",
                            onClick: this.addNewMovie
                        },
                        "Add new movie"
                    )
                ) : null
            )
        )
    }
}


// Export statements
export { SearchForm };