from django.contrib import admin

from .models import User, Movie, MovieGenre, MovieParentRating, MovieReview


admin.site.register(User)
admin.site.register(Movie)
admin.site.register(MovieGenre)
admin.site.register(MovieParentRating)
admin.site.register(MovieReview)