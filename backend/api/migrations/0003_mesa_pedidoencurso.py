# Generated by Django 5.1.3 on 2024-12-05 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_mesa_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='mesa',
            name='pedidoencurso',
            field=models.CharField(blank=True, max_length=36, null=True),
        ),
    ]
