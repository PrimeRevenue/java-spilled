# PrimeRevenue Java Hands-on coding interview, "Java Spilled"

![Spilled Java](./java_spilled.jpg)

## Welcome

This is the PrimeRevenue Development in-person interview repo. The project
is the basis for a hands-on coding interview. Please review the details of
interview and project below.

## Help and Questions

If you have any questions about the interview or this repo please reply back to the email you received inviting you to this project.

## Interview Format

* The PrimeRevenue Dev TEAM member(s) and yourself will be communicating using
[Bluejeans](https://bluejeans.com) for chat and video conferencing (you should
have an invite for this already).
* The exercise is focused on developing small feature(s) against a JSON REST API endpoint in this project, "Java Spilled".

## Environment Requirement
1. Java 8
2. git latest is fine
3. node v8.11.4
4. npm 5.6.0
5. yarn latest is fine (optional, need it for UI) 

## Project Overview

* This repo was built using a Java project called [jHipster](http://www.jhipster.tech/).
* However, the focus of this interview is primarily the REST API portion of the application, the API provides a list of [Chuck Norris Facts](https://en.wikipedia.org/wiki/Chuck_Norris) facts in JSON format.


## Build and Run Project
Go to project folder, and run the following commands in that terminal

    `./gradlew`
    
Your project should be up and running now like below in the first terminal:

```
----------------------------------------------------------
        Application 'java_spilled' is running! Access URLs:
        Local:          http://localhost:8080
        External:       http://10.8.10.227:8080
        Profile(s):     [swagger, dev]
----------------------------------------------------------
```


To reach the API, open a browser and type:

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

**Optional**: If you plan to edit the UI, open up another terminal and navigate to the same java_spilled directory. Type the following command:

    `yarn start`

## Next steps

During the interview, the PrimeRevenue Dev TEAM will provide you exact details on the coding exercise.


