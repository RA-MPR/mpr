# Generated by Django 3.1.7 on 2021-03-29 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_auto_20210327_1427'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='status_color',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
