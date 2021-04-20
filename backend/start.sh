#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

echo "Running celery worker..."
exec celery --app "settings" worker --loglevel=info &

echo "Running celery beat..."
exec celery --app "settings" beat --loglevel=info &

python manage.py runserver 0.0.0.0:8000

