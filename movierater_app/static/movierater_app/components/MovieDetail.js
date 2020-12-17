"use strict";
import { MovieReviews } from './MovieReviews.js';


class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        
        this.movie = props.movie;
        this.rating = 0;

        let sum = 0;
        this.movie.reviews.forEach(review => {
            sum += review.num_rating;
        });

        this.rating = sum / (this.movie.reviews.length || 1);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                {
                    class: "my-3"
                },
                this.movie.name
            ),
            React.createElement(
                "div", 
                {
                    class: "row"
                },
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3 fw-bold"
                    },
                    "Name"
                ),
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3"
                    },
                    this.movie.name
                )
            ),
            React.createElement(
                "div", 
                {
                    class: "row"
                },
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3 fw-bold"
                    },
                    "Year Released"
                ),
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3"
                    },
                    this.movie.released_year
                )
            ),
            React.createElement(
                "div", 
                {
                    class: "row"
                },
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3 fw-bold"
                    },
                    "Parent Rating"
                ),
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3"
                    },
                    this.movie.parent_rating.parent_rating
                )
            ),
            React.createElement(
                "div", 
                {
                    class: "row"
                },
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3 fw-bold"
                    },
                    "Genre"
                ),
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3"
                    },
                    this.movie.genre.name
                )
            ),
            React.createElement(
                "div", 
                {
                    class: "row"
                },
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3 fw-bold"
                    },
                    "Average User Review Rating"
                ),
                React.createElement(
                    "div",
                    {
                        class: "col-md my-3"
                    },
                    (this.rating === 0 ? "No reviews yet" : `${this.rating} stars`)
                )
            ),
            React.createElement(
                MovieReviews,
                { 
                    movie_reviews: this.movie.reviews,
                    movie_id: this.movie.id,
                    movie_name: this.movie.name                    
                }
            )
        )
    }
}


// Export statements
export { MovieDetail };