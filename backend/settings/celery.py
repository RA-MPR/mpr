import os

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
    'every-minute': {
        'task': 'hello_world',
        'schedule': crontab(),
    },
}


@app.task(bind=True, name="hello_world")
def hello_world(self):
    print('Hello world!')


@app.task(name="send_notification_email", bind=True, default_retry_delay=300, max_retries=2)
def send_notification_email(self):

    try:
        send_mail(
            subject="subject",
            html_message="message",
            from_email=None,
            recipient_list=["your@email.com"],
            fail_silently=False,
            message=None)
        print("Email send")
    except Exception as e:
        print("Error")
        print(e)
        send_notification_email.retry()
