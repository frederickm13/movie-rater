import json
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from .models import User, Movie, MovieGenre, MovieParentRating, MovieReview


def movies(request):
    if request.method == "GET": 
        movies = Movie.objects.all()
        return JsonResponse([movie.serialize() for movie in movies], safe=False)
    elif request.method == "POST": 
        data = json.loads(request.body)

        genre = data.get("movie_genre", None)
        parent_rating = data.get("movie_parent_rating", None)

        if genre is not None:
            genre = MovieGenre.objects.get(pk=genre)

        if parent_rating is not None:
            parent_rating = MovieParentRating.objects.get(pk=parent_rating)

        movie = Movie(
            name = data.get("movie_name", ""),
            released_year = data.get("movie_release_year", ""),
            genre = genre,
            parent_rating = parent_rating
        )

        movie.save()

        return JsonResponse({"id": movie.id}, status=201)


def movies_detail(request, pk):
    movie = Movie.objects.get(pk=pk)
    return JsonResponse(movie.serialize())


def movies_search(request, searchString):
    movies = Movie.objects.filter(name__icontains=searchString)
    return JsonResponse([movie.serialize() for movie in movies], safe=False)


def movie_genres(request):
    genres = MovieGenre.objects.all()
    return JsonResponse([genre.serialize() for genre in genres], safe=False)


def movie_reviews(request):
    if request.method == "GET":
        movie_reviews = MovieReview.objects.all()
        return JsonResponse([review.serialize() for review in movie_reviews], safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)

        movie = data.get("movie_id", None)

        if movie is not None:
            movie = Movie.objects.get(pk=movie)

        movie_review = MovieReview(
            movie = movie,
            num_rating = data.get("num_rating", None),
            review = data.get("review", None),
            owner = request.user
        )

        movie_review.save()

        return JsonResponse({"id": movie_review.id}, status=201)


def movie_parent_ratings(request):
    movie_parent_ratings = MovieParentRating.objects.all()
    return JsonResponse([rating.serialize() for rating in movie_parent_ratings], safe=False)