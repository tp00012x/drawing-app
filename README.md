# Drawing app - React

This application lets the user participate in a drawing by entering a unique code of their choosing.
An administrator is able to select random winners from a pool of participants and give them the chance to win
a limited edition item.  

## Getting Started

Clone repo into desired location.

### Prerequisites

Install Brew:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install Node:

```
brew install node
```

### Local Setup

Install all project's prerequisites by running: 

```
npm install
```

Cd into the drawing-app folder and run:

```
npm run dev
```

*This will start the React application, and you should be redirected to the home page.*

### Navigation

1. If you are an an admin, click on admin, and click on "Select Random Winners". This will grab a set of random
   participants and display the winners on the UI. However, if there are less than 5 participants, the "Select Random 
   Winners" button should be disabled and you will see an error message that will communicate that there are not enough 
   participants to select Random winners.

1. If you are a user, you can either participate or check the status of your code to see if you've won. However, there 
   are a couple of details and edges cases that you should be aware of:
    - If random winners were already generated, you can only check the status of a participant by entering your code. If
    you want to participate again, click on the "Reset Winners" button, and submit your *unique* code to participate.
    - Validations are set up, so you can only have unique codes, and alphanumeric characters.
    - If winners haven't been generated yet, you can't check if you are one of the lucky winners. In addition, you will
    get a message informing you that winners haven't been selected yet.
    - If a set of winners have been generated, you should be able to check if you've won with no problem. Just make sure
    to enter your code participant code, else, you will get a validation error that your code does not exist.
    - There are validations to check if your code is alphanumeric, unique and 6 characters long.

### API
You can find all the API endpoints inside the server.js. Express was used to make this possible.

### Improvements

Per the instructions, here are a list of improvements I would make if I had more time:

1. Inside the server.js file, I would encapsulate the methods, and create a class containing a set of class methods that
   I can re-use perhaps in the future. Either way, I would like my logic inside one file and not inside the server.js
   file.
2. I would separate my API request methods, found inside the react components unto a different file for organizational
   purposes.
3. I would use the new React Context API manager to make state values more global, so props don't need to be passed down
into multiple levels. One example for this is the **winners** state found inside the App.js file.
4. I would look into using Pure Components to render methods so they don't get triggered unnecessarily.
5. Remove some state variables, to make it less crowed and more readable. I'm sure there are things that I can simplify.
6. Farther improve the algorithms inside the server.js when trying to set random winners, reset participants, etc. In
addition I would spend more time on re-naming the variables used to improve code readability. 
7. Improve the css by adding more styling to the app.
8. Look into decomposing some components even more to make the app more lean.
9. Make sure that the async and await calls are being resolved correctly.
10. Add a backend with Django Rest Framework to store our data using PostgreSQL. Another solution for persisting data
    would be use the native Local Storage available.
11. Improve the naming convention of the API end points. We should have 1 /api/participants endpoint that will support
    PATCH, GET, POST, DELETE accordingly. Instead for now to be more verbose. I created a different URL for selecting
    random winners, getting winners, getting participants, etc.
12. For future scaling, I would also integrate Redis to queue participants into a list and then have workers resolve the 
    queue to keep track of sign-up times, etc. In addition, Redis have caching features that would be helpful for
    speeding up the app.
13. Last but the most important, I would add TESTS!

## Authors

* **Anthony Torres**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
