from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import uuid


class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    def __str__(self):
        return self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }


class Movie(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    created_on = models.DateTimeField(
        auto_now_add=True
    )
    
    modified_on = models.DateTimeField(
        auto_now=True
    )

    name = models.CharField(
        max_length=250,
        null=False,
        blank=False
    )

    released_year = models.CharField(
        max_length=4,
        null=False,
        blank=False
    )

    genre = models.ForeignKey(
        to="MovieGenre",
        on_delete=models.SET_NULL,
        null=True
    )

    parent_rating = models.ForeignKey(
        to="MovieParentRating",
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return self.name

    def serialize(self):
        movie_reviews = [review.serialize() for review in self.moviereview_set.all()]

        return {
            "id": self.id,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "name": self.name, 
            "released_year": self.released_year,
            "genre": self.genre.serialize(),
            "parent_rating": self.parent_rating.serialize(),
            "reviews": movie_reviews
        }


class MovieReview(models.Model):
    # Choice values
    class MovieRatings(models.IntegerChoices):
        ONE_STAR = 1,
        TWO_STAR = 2
        THREE_STAR = 3,
        FOUR_STAR = 4,
        FIVE_STAR = 5,

    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    created_on = models.DateTimeField(
        auto_now_add=True
    )
    
    modified_on = models.DateTimeField(
        auto_now=True
    )

    review = models.CharField(
        max_length=500,
        null=False,
        blank=False,
    )

    movie = models.ForeignKey(
        to=Movie, 
        on_delete=models.CASCADE,
    )

    num_rating = models.IntegerField(
        choices=MovieRatings.choices
    )

    owner = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name="movie_reviews"
    )

    def __str__(self):
        return f"{self.num_rating}, {self.owner.username}: {self.movie.name}"

    def serialize(self):
        return {
            "id": self.id,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "movie": self.movie.id,
            "owner": self.owner.username,
            "review": self.review,
            "num_rating": self.num_rating
        }


class MovieGenre(models.Model):
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    created_on = models.DateTimeField(
        auto_now_add=True
    )
    
    modified_on = models.DateTimeField(
        auto_now=True
    )

    name = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        unique=True
    )

    def __str__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "name": self.name
        }


class MovieParentRating(models.Model):
    # Choice values
    class ParentRatings(models.TextChoices):
        G = 'G', _('G')
        PG = 'PG', _('PG')
        PG13 = 'PG13', _('PG13')
        R = 'R', _('R')

    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )

    created_on = models.DateTimeField(
        auto_now_add=True
    )
    
    modified_on = models.DateTimeField(
        auto_now=True
    )

    parent_rating = models.CharField(
        max_length=5,
        choices=ParentRatings.choices, 
        unique=True
    )

    def __str__(self):
        return self.parent_rating

    def serialize(self):
        return {
            "id": self.id,
            "created_on": self.created_on,
            "modified_on": self.modified_on,
            "parent_rating": self.parent_rating
        }