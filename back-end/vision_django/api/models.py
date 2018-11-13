# api/models.py

from django.db import models


class User(models.Model):
        user = models.CharField(max_length=200)
        center = models.CharField(max_length=200)
        left = models.CharField(max_length=200)
        right = models.CharField(max_length=200)
        dateCreated = models.DateTimeField(auto_now_add=True)


def __str__(self):
        return self.username
