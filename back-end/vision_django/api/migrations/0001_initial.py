# Generated by Django 2.1.3 on 2018-11-11 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('left', models.CharField(max_length=200)),
                ('right', models.CharField(max_length=200)),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]