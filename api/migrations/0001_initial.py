# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-26 16:54


import api.models.base
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DataSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('name', models.CharField(max_length=200, unique=True, verbose_name=b'Data Source Name')),
                ('url', models.URLField(max_length=255, unique=True, verbose_name=b'Data Source URL')),
                ('description', models.TextField(help_text=b'Please briefly describe this data source.', verbose_name=b'Data Source Description')),
                ('ehb_service_es_id', models.IntegerField(default=-1, editable=False, verbose_name=b'EHB Service External System ID')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ImmutableKey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('key', models.CharField(blank=True, editable=False, max_length=255, unique=True, verbose_name='Immutable Key')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('subject_id_label', models.CharField(default=b'Record ID', max_length=50, verbose_name=b'Unique Subject Record ID Label')),
                ('immutable_key', models.OneToOneField(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.ImmutableKey')),
            ],
            options={
                'ordering': ['name'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Protocol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('name', models.CharField(max_length=200, unique=True, verbose_name=b'Protocol Name')),
            ],
            options={
                'ordering': ['name'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtocolDataSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('path', models.CharField(max_length=255, verbose_name=b'Path to record collection')),
                ('driver', models.IntegerField(choices=[(0, b'REDCap Client'), (1, b'Nautilus'), (2, b'Phenotype Intake'), (3, b'External Identifiers')], verbose_name=b'Driver Name')),
                ('driver_configuration', models.TextField(blank=True, verbose_name=b'Driver Configuration Options')),
                ('display_label', models.CharField(max_length=50, verbose_name=b'Display Name')),
                ('max_records_per_subject', models.IntegerField(default=-1, verbose_name=b'Maximum Number of Records Allowed Per Subject')),
                ('data_source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.DataSource', verbose_name=b'Data Source')),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protocol_data_sources', to='api.Protocol')),
            ],
            options={
                'ordering': ['protocol'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtocolDataSourceLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('linker', models.CharField(max_length=200, verbose_name=b'Linking Plugin')),
                ('pds_one', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pds_one_set', to='api.ProtocolDataSource', verbose_name=b'Protocol Data Source')),
                ('pds_two', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pds_two_set', to='api.ProtocolDataSource', verbose_name=b'Protocol Data Source')),
            ],
        ),
        migrations.CreateModel(
            name='ProtocolUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('role', models.IntegerField(choices=[(0, b'Research Coordinator')])),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Protocol')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['user'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProtocolUserCredentials',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Creation DateTime')),
                ('modified', api.models.base.AutoDateTimeField(default=django.utils.timezone.now, help_text='Please use date format: <em>YYYY-MM-DD</em>', verbose_name='Record Last Modified DateTime')),
                ('data_source_username', models.CharField(blank=True, max_length=50, verbose_name=b'Username for Data Source')),
                ('data_source_password', models.CharField(max_length=128, verbose_name=b'Password for Data Source')),
                ('data_source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ProtocolDataSource', verbose_name=b'Protocol Data Source')),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Protocol', verbose_name=b'Protocol')),
                ('protocol_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ProtocolUser', verbose_name=b'Protocol User')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name=b'User')),
            ],
            options={
                'ordering': ['protocol'],
                'abstract': False,
                'verbose_name': 'Protocol User Credentials',
                'verbose_name_plural': 'Protocol User Credentials',
            },
        ),
        migrations.AddField(
            model_name='protocol',
            name='data_sources',
            field=models.ManyToManyField(through='api.ProtocolDataSource', to='api.DataSource'),
        ),
        migrations.AddField(
            model_name='protocol',
            name='immutable_key',
            field=models.OneToOneField(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.ImmutableKey'),
        ),
        migrations.AddField(
            model_name='protocol',
            name='organizations',
            field=models.ManyToManyField(blank=True, to='api.Organization'),
        ),
        migrations.AddField(
            model_name='protocol',
            name='users',
            field=models.ManyToManyField(blank=True, through='api.ProtocolUser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='protocolusercredentials',
            unique_together=set([('data_source', 'user', 'protocol')]),
        ),
        migrations.AlterUniqueTogether(
            name='protocoluser',
            unique_together=set([('protocol', 'user')]),
        ),
    ]
