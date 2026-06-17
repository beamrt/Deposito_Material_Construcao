from django.test.runner import DiscoverRunner
from django.apps import apps
from django.db import connection

class ManagedModelTestRunner(DiscoverRunner):
    def setup_databases(self, **kwargs):
        for model in apps.get_models():
            if hasattr(model._meta, 'managed') and not model._meta.managed:
                model._meta.managed = True

        old_config = super().setup_databases(**kwargs)

        with connection.cursor() as cursor:
            with connection.schema_editor() as schema_editor:
                for model in apps.get_models():
                    db_table = model._meta.db_table
                    if db_table not in connection.introspection.table_names():
                        schema_editor.create_model(model)

        return old_config