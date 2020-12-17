"use strict";
import { sendHttpAsync } from "../http.js";
import { SearchForm } from './SearchForm.js';


class AddMovieReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: null,
            review: null
        };

        this.movie_id = props.movie_id;
        this.movie_name = props.movie_name;
        this.options = [
            {
                displayName: "1 star",
                value: 1
            },
            {
                displayName: "2 stars",
                value: 2
            },
            {
                displayName: "3 stars",
                value: 3
            },
            {
                displayName: "4 stars",
                value: 4
            },
            {
                displayName: "5 stars",
                value: 5
            }
        ]

        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRatingChange(event) {
        this.setState({
            rating: event.target.value
        });
    }

    handleReviewChange(event) {
        this.setState({
            review: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let postBody = {
            movie_id: this.movie_id,
            num_rating: this.state.rating,
            review: this.state.review
        }

        sendHttpAsync("api/reviews", "POST", postBody)
            .then(response => {
                if (response.ok) {
                    ReactDOM.render(
                        React.createElement(SearchForm),
                        document.querySelector("#app")
                    );
                }
            })
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
                "Add new movie review"
            ),
            React.createElement(
                "form",
                {
                    onSubmit: this.handleSubmit
                },
                React.createElement(
                    "div",
                    {
                        class: "my-3"
                    },
                    React.createElement(
                        "label",
                        {
                            for: "movie-input",
                            class: "form-label"
                        },
                        "Movie"
                    ),
                    React.createElement(
                        "input",
                        {
                            id: "movie-input",
                            type: "text",
                            class: "form-control",
                            value: this.movie_name,
                            disabled: true,
                            "data-movie-id": this.state.movie_id
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
                            for: "rating-input",
                            class: "form-label"
                        },
                        "Rating"
                    ),
                    React.createElement(
                        "select",
                        {
                            id: "rating-input",
                            type: "text",
                            class: "form-control form-select",
                            onChange: this.handleRatingChange
                        },
                        React.createElement(
                            "option",
                            {
                                value: null,
                                selected: true
                            }, 
                            "Select a value"
                        ),
                        this.options.map(option => {
                            return React.createElement(
                                "option", 
                                {
                                    value: option.value
                                },
                                option.displayName
                            )
                        })
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
                            for: "review-input",
                            class: "form-label"
                        },
                        "Review"
                    ),
                    React.createElement(
                        "textarea",
                        {
                            id: "review-input",
                            class: "form-control",
                            onChange: this.handleReviewChange
                        }
                    )
                ),
                React.createElement(
                    "input",
                    {
                        type: "submit",
                        value: "Add review",
                        class: "btn btn-primary"
                    }
                )
            )
        );
    }
}


// Export statements
export { AddMovieReview };