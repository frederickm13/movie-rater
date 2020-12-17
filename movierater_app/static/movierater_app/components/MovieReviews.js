"use strict";
import { AddMovieReview } from "./AddMovieReview.js";


class MovieReviews extends React.Component {
    constructor(props) {
        super(props);
        this.movie_reviews = props.movie_reviews;
        this.movie_id= props.movie_id;
        this.movie_name = props.movie_name;

        this.openMovieReviewCreate = this.openMovieReviewCreate.bind(this);
    }

    openMovieReviewCreate(event) {
        event.preventDefault();
        ReactDOM.render(
            React.createElement(
                AddMovieReview,
                {
                    movie_id: this.movie_id,
                    movie_name: this.movie_name
                }
            ),
            document.querySelector("#app")
        );
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                {
                    class: "my-3"
                },
                "Reviews"
            ),
            React.createElement(
                "a",
                {
                    href: "#",
                    onClick: this.openMovieReviewCreate,
                    class: "btn btn-primary"
                },
                "Add movie review"
            ),
            React.createElement(
                "ul",
                {
                    class: "list-group my-3"
                },
                React.createElement(
                    MovieReviewItems,
                    {
                        movieReviews: this.movie_reviews
                    }
                )
            )
        );
    }
}


function MovieReviewItems(props) {
    const movieReviews = props.movieReviews;

    function openReview(event) {
        event.preventDefault();
    }

    const listItems = movieReviews.map((review,index) => {
        return React.createElement(
            "li",
            {
                href: "#",
                class: "list-group-item",
                "data-pk": review.id,
                onClick: openReview
            },
            React.createElement(
                "span",
                {
                    class: "fw-bold"
                },
                `${review.num_rating}, ${review.owner}: `
            ),
            review.review
        );
    });

    return listItems;
}


// Export statements
export { MovieReviews };