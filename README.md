# Startup
CS 260 Startup

## Notes found [here](notes.md)

## Technologies
I will use the required technologies in the following ways
* **HTML** - There are four HTML pages in this application: Sign up/Login, Car Registering, Available Listings, & Car rental History
* **CSS** - The pages will all be styled using CSS to make sure that the application looks good on all sizes of device.
* **JavaScript** - Displays all the available listings recieved from the backend, as well as all the user data. Also provides the login capabilities
* **Service** - There will be backend endpoints for
    * Logging in
    * Available Listings Retrieval
    * Car Registration
    * Account Info Retrieval
* **DB** - We will store the account data for each account in a database in the cloud (username, password, history, location, cars registered)
* **Login** - Each user will have to login with their own unique credentials stored in the cloud.
* **Web Socket** - When a car in rented, the renter will be connected to the vehicle owner
* **React** - Application will later be based on React


## HTML Deliverable
For this deliverable, I added these things to my startup
* **HTML pages** - All the pages of the application are added using HTML code
* **Links** - The links at the top of the page, as well as the link to my GitHub repository are functioning
* **Mock Service Options** - There are mock services shown in the screens of the application
* **Login** - Input boxes and submit button for login.
* **Database** - There is user data and Service options that will be updated using the database
* **WebSocket** - The realtime connection with the server will be done with the messaging page


## CSS Deliverable
I have changed some things about the way the app works. First and foremost, the app is no longer about cars, but instead about generic services that people can offer in the city they live in. Also, instead of a Messaging screen, I have created an Account settings screen. In this screen, we'll establish a web socket to give the user possible ideas of services to think about registering.

For this deliverable, I made the application look better!
* **Header, footer, and main content body**
* **Navigation elements** - All the parts in the nav element look good, and show a bottom border when hovered over
* **Responsive to window resizing** - As you make the window larger or smaller, the text fields and the placement of the elements shifts around
* **Application elements** - There is a good understanding of what is the main body and what is the header and footer
* **Application text content** - Everything is in Arial or Sans serif to give it a modernized, not-to-complex look
* **Application images** - All the images are sized correctly and are shown in a stylized way


## Javascript Deliverable
For this deliverable, I added the following JavaScript functionality:
* **Support for Future Login**
* **Support for a Database** - I used dummy data to be returned, but the database functions are now in place.
* **Support for a future WebSocket** - The web socket will be used with the messaging between the service owner and the service user. (Not sure exactly how that is going to work yet, but the structure is as best I could do).
* **Application is Interactive** - all the sorting dropdowns now work, and going from one place to another is working as intended.


## Service Deliverable
For this deliverable I added backend endpoints.
* **Node.js/Express HTTP service** - done!
* **Static middleware for frontend** - done!
* **Calls to third party endpoints** - I implemented a meow facts clicker on the service tab (it seems completely useless but I'll do what I have to do to get a good grade...)
* **Backend service endpoints** - The endpoints I added are as follows:
    * GET /listing/:query - retrieve listings; a way to look through the listings in the database and return the ones that correlate with the search query
    * GET /services - gets the services being used by the current user
    * POST /listing - registers a new service, owned by the current user; req body holds registered service information. 
    * GET /messages/:otheruser - gets the messages for a current user with some other user
* **Frontend calls service endpoints** - I did this using the fetch function.


## DB Deliverable
For this deliverable, I added the following functionality:
* **MongoDB Atlas** - created, and the server can connect to it using the dbConfig.json file
* **Endpoints for data** - all non-user affiliated endpoints connect to the database appropriately and store/retrieve what they need. I added GET /img/:imageId and POST /img to retrieve images from the DB. GET /listing/:query also works correctly now.
* **Stores data in MongoDB** - done!

**NOTE**: There are some services that require the understanding of how to store user credentials that haven't been completed yet (things affiliated with the user)... I'll get those done in the Login Deliverable

## Login Deliverable
For this deliverable, I added this functionality
* **User registration** - Creates a new account in the database.
* **existing user** - You can log in again if you already have an account
* **Use MongoDB to store credentials** - the listings are associated with the users that made them
* **Restricts functionality** - You cannot create a listing until you have logged in.

## Web Sockets Deliverable
For this deliverable I used webSocket to update the votes on the frontend in realtime.
* **Backend listens for WebSocket connection** - done!
* **Frontend makes WebSocket connection** - done!
* **Data sent over WebSocket connection** - done!
* **WebSocket data displayed** - All the messages from their peers are displayed on the client side
