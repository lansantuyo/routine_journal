from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class JournalEntry(models.Model):
    title = models.CharField(blank=True, null=True, max_length=100)
    date = models.DateField()
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="journal_entries")

    def __str__(self):
        return f"{self.title} | {self.date}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'author')
        verbose_name_plural = "Categories"


class ActivityType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="activity_types")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activity_types")

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'author')
        verbose_name = "Activity Type"
        verbose_name_plural = "Activity Types"



class MetricType(models.Model):
    activity_type = models.ForeignKey(ActivityType, related_name="metric_types", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} for {self.activity_type.name}"

    class Meta:
        unique_together = ('name', 'activity_type')
        verbose_name = "Metric Type"
        verbose_name_plural = "Metric Types"


class Activity(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.ForeignKey(ActivityType, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.activity_type.name} for Entry on {self.journal_entry.date}"


class Metric(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='metrics')
    metric_type = models.ForeignKey(MetricType, on_delete=models.CASCADE)
    value = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.metric_type.name}: {self.value}"
