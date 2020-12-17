from django.urls import path

from . import views


app_name = "movierater_api"
urlpatterns = [
    path("movies", views.movies, name="movies"),
    path("movies/<uuid:pk>", views.movies_detail, name="movies_detail"),
    path("movies/search/<str:searchString>", views.movies_search, name="movies_search"),
    path("genres", views.movie_genres, name="genres"),
    path("parent_ratings", views.movie_parent_ratings, name="parent_ratings"),
    path("reviews", views.movie_reviews, name="reviews"),
]