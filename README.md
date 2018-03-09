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

## About Cloud9

* While not a full IDE, [Cloud9](https://aws.amazon.com/cloud9/) does have limited auto-complete, a code editor, a debugger and Linux command line tools.
* You are encouraged [Sign in to](#how-to-get-build-and-run-the-project-in-cloud9) Cloud9 and test out the environment before the interview if you wish.

The PrimeRevenue Dev TEAM will help you navigate and use Cloud9. We do not expect you to be proficient in using Cloud9.

## Coding exercise rules, guidelines and details.

* **You are expected to use the Cloud9 development environment to for the interview.**
* Ask as many questions as you need.
* You CAN use Google, read API Docs, Javadocs or any reference material you wish.

## Project overview

* This repo was built using a Java project called [jHipster](http://www.jhipster.tech/).
* However, the focus of this interview is primarily the REST API portion of the application, the API provides a list of [Chuck Norris Facts](https://en.wikipedia.org/wiki/Chuck_Norris) facts in JSON format.

## How to get, build and run the project in Cloud9

1. Log in to Cloud9 using log in information from the email titled "*PrimeRevenue Hands-on coding exercise invitation*"

2. From the Cloud9 terminal window, go to the project directory:

     `cd java_spilled`

3. Run the following commands in that terminal

    `./gradlew`

## Your project should be up and running now like below in the first terminal:

```
----------------------------------------------------------
        Application 'java_spilled' is running! Access URLs:
        Local:          http://localhost:8080
        External:       http://10.8.10.227:8080
        Profile(s):     [swagger, dev]
----------------------------------------------------------
```


4. To reach the API in a Cloud9 terminal:

      `curl http://localhost:8080/api/chuck-norris-facts`

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

5. **Optional**: If you plan to edit the UI, open up another terminal and navigate to the same java_spilled directory. Type the following command:

    `yarn start`


## Cloud9 Environment Details

When running in a Cloud9 environment you can click the link produced by the application and it will open a new tab to access the running application:
![Click Open](https://s3.amazonaws.com/uploads.hipchat.com/23379/4762553/mp65ifW3E6PaRWg/Screenshot%202018-03-07%2012.13.38.png)

**NOTE:** The IP address will be provided by Cloud9 at the time you click this link.

![Running Application](https://s3.amazonaws.com/uploads.hipchat.com/23379/4762553/GcSEzDKz4Ilh8ln/Screenshot%202018-03-07%2012.16.28.png)


## Next steps

During the interview, the PrimeRevenue Dev TEAM will provide you exact details on the coding exercise.


