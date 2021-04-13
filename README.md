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

(Optional) Test whether SMTP settings are correct: `docker exec -it mpr_backend_1 python3 manage.py sendtestemail`

After this, you can sign to Django Admin which is available at http://0.0.0.0:8000/admin/

Backend documentation
---------------------

```
docker run -it --rm -p 1234:80 -v $(pwd)/docs/:/usr/share/nginx/html/docs -e SPEC_URL="docs/spec.yml" redocly/redoc
```

Visit http://localhost:1234/

Integration testing
-----------
1. `docker-compose up` - start the project (to update your containers run with
   `docker-compose up --build`)
2. `cd frontend`
3. `npm run cypress:open` - open the Cypress GUI and run tests interactively
4. `npm run cypress:test` - batch run all tests
5. You can find the screenshots and videos generated during testing in `frontend/cypress/screenshots`
