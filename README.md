# mpr

Run project with docker-compose
```shell
docker-compose up
```

Backend
--------------
Run migrations `docker exec -it mpr_backend_1 python manage.py migrate`

Create Django superuser `docker exec -it mpr_backend_1 python3 manage.py createsuperuser`

(Optional) Run company tests: `docker exec -it mpr_backend_1 python3 manage.py test company.tests` 

After this, you can sign to Django Admin which is available at http://0.0.0.0:8000/admin/

Backend documentation
---------------------

```
docker run -it --rm -p 1234:80 -v $(pwd)/docs/:/usr/share/nginx/html/docs -e SPEC_URL="docs/spec.yml" redocly/redoc
```

Visit http://localhost:1234/