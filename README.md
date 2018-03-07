# Java Spilled Code Exercise Base Project

This git repo has a base API built with jHipster, http://www.jhipster.tech/. However, the focus is just on the API portion of the application. The API presents a list of Chuck Norris facts in JSON format.

## NOTE

You are encouraged and allowed to use Google or any other online resource for research and assistance during this.

## How to get, build and run the project

1. From your terminal, go to the project directory:

     `cd java_spilled`

2. Run the following commands in that terminal

    `./gradlew`
    
3. If you plan to edit the UI open up another terminal and navigate to the same java_spilled directory.  Then type the following command:

    `yarn start`

## Your project should be up and running now like below in the first terminal:

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

## Cloud9 Environment Details

When running in a Cloud9 environment you can click the link produced by the application and it will open a new tab to access the running application:
![Click Open](https://s3.amazonaws.com/uploads.hipchat.com/23379/4762553/mp65ifW3E6PaRWg/Screenshot%202018-03-07%2012.13.38.png)

![Running Application](https://s3.amazonaws.com/uploads.hipchat.com/23379/4762553/GcSEzDKz4Ilh8ln/Screenshot%202018-03-07%2012.16.28.png)


## Next steps

Your interviewer will send you a link with the exact details on the coding exercise.


