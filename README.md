Live demo: https://damp-gorge-08802.herokuapp.com/

Node.js app using express, express-session, passport, mongodb/mongoose, and bcryptjs

Sign up which will pass you on to a riddle that you must solve in order to actually gain access to the Secret Message Board. If you would like, you can also gain admin privileges by finding the admin button on the second sign up page, which allows you to delete messages.

Once you are in you will stay logged in so long as you stay in the app, using a passport local strategy and express session and the session data will be stored using mongoStore.

Click the button to create a message. The message objects track user ids but the messages on the message board will only display the title, message body, and time of creation.

Also you can sign out using the sign out button. So fun.

Created as part of The Odin Project Nodejs course
