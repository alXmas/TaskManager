# Dualboot Learn

This is the RoR and React application for
[*Dualboot Learn*](https://fullstack-learning.firebaseapp.com/)
by [Dualboot Partners](https://dualbootpartners.com/).

## Getting started

To get started with the app, clone the repo and build docker container:

```
$ docker-compose build
```

Next, create and migrate the database:

```
$ docker-compose run --rm web bash -c "rails db:create db:migrate"
```

Finally, run the test suite to verify that everything is working correctly:

```
$ docker-compose run --rm web bash -c "rails test"
```

If the test suite passes, you'll be ready to run the app in a local server:

```
$ docker-compose up
```

For more information, see the
[*Dualboot Learn*](https://fullstack-learning.firebaseapp.com/).