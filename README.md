# mpr

Run project with docker-compose
```shell
docker-compose up
```

Backend documentation
---------------------

```
docker run -it --rm -p 1234:80 -v $(pwd)/docs/:/usr/share/nginx/html/docs -e SPEC_URL="docs/spec.yml" redocly/redoc
```

Visit http://localhost:1234/