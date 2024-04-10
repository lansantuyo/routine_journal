from django.db import models


class Journal(models.Model):
    entry_name = models.CharField(max_length=50)
    entry_description = models.TextField(max_length=1000)
    entry_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.entry_name
