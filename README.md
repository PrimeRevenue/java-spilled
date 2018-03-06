# Java Spilled Code Exercise Base Project

This git repo has a base API built with jHipster, http://www.jhipster.tech/. However, the focus is just on the API portion of the application. The API presents a list of Chuck Norris facts in JSON format.

## NOTE

You are encouraged and allowed to use Google or any other online resource for research and assistance during this.

## How to get, build and run the project

1. Install `Java 8`

2. Open a terminal and get a copy of this project:

     `git clone https://github.com/PrimeRevenue/java_spilled`

3. From your terminal, go to the project directory:

     `cd java_spilled`

4. Run the following commands in that terminal

    `./gradlew`

## Your project should be up and running now like below:

```
----------------------------------------------------------
        Application 'java_spilled' is running! Access URLs:
        Local:          http://localhost:8080
        External:       http://10.8.10.227:8080
        Profile(s):     [swagger, dev]
----------------------------------------------------------
```

1. Open a browser, to API in browser to test:

      `http://localhost:8080/api/chuck-norris-facts`

You should see a JSON response like this:

```
[
  {
    "id": 1,
    "fact": "Chuck Norris can compile syntax errors.",
    "karatepower": 135,
    "created_at": "2017-07-20T16:34:05-04:00"
  },
  {
    "id": 2,
    "fact": "The programs that Chuck Norris writes don't have version numbers because he only writes them once. If a user reports a bug or has a feature request they don't live to see the sun set.",
    "karatepower": 788,
    "created_at": "2017-03-16T07:39:33-04:00"
  }
]
```

## Next steps

Your interviewer will send you a link with the exact details on the coding exercise.


