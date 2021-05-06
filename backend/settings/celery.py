import os
from datetime import datetime

from dateutil.relativedelta import relativedelta
from celery import Celery
from celery.schedules import crontab
from django.core.mail import send_mail

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.settings")

app = Celery()

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'notification-every-10-minutes': {
        'task': 'send_notification_email',
        'schedule': crontab(minute="*/10"),
    },
}


@app.task(name="send_notification_email", bind=True, default_retry_delay=300, max_retries=2)
def send_notification_email(self):
    from event.models import Event

    notification_time = datetime.now() + relativedelta(minutes=+10)
    reminders = (
        Event.objects
            .select_related("user")
            .filter(
                is_active=True,
                reminder=True,
                date=notification_time.date(),
                time__lte=notification_time.time()
            )
    )

    for reminder in reminders:
        send_mail(
            subject=reminder.name,
            from_email=None,
            recipient_list=[reminder.user.email],
            fail_silently=True,
            message=reminder.description,
        )
        reminder.is_active = False
        reminder.save()
