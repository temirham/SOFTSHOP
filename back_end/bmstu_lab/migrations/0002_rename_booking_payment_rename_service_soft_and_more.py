# Generated by Django 4.2.6 on 2023-10-23 23:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bmstu_lab', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Booking',
            new_name='Payment',
        ),
        migrations.RenameModel(
            old_name='Service',
            new_name='Soft',
        ),
        migrations.RenameField(
            model_name='payment',
            old_name='service',
            new_name='soft',
        ),
        migrations.AlterModelTable(
            name='payment',
            table='payment',
        ),
        migrations.AlterModelTable(
            name='soft',
            table='soft',
        ),
    ]
