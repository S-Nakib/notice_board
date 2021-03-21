This project uses Next.js(frontend and backend) and mongodb server.

## To run this project on your local machine:

-   You need to install [mongodb](https://docs.mongodb.com/manual/administration/install-community/) and then start mongodb server on port 27017 which is the default port of mongodb.  
    If your server is password protected or you want to use another port then you can change the setting from [here](./backend_utils/mongodb.ts)

-   You also need node and npm

Now clone this project and run `npm run dev` from the root. This will start the server on http://localhost:3000

Some features may not work since we use HTTPS. I have written a blog about how to use HTTPS on next.js local development server [here](https://dev.to/nakib/using-https-on-next-js-local-development-server-bcd)

So if you are using HTTPS, you can proceed.

Now go to the https://localhost:3000/admin page and log in using "admin" as both username and password.

Then go to the https://localhost:3000

Now you can create, read, update and delete notices.

## Working with the code.

For the react developers who don't know next.js, I am giving a short overview of the code so that they can understand.

On the **pages** directory, we have defined the pages of the site. index is for / page and admin is for /admin. They are react functional components.  
The routing structure of the site will be the same as the pages directory.

By the way here **\_app.tsx** is not a page but it is a functional component that gets all the pages as props. Here the common code of all pages is defined.

The pages/api directory contains all the backend API serverless functions.  
On next.js we just need to define serverless functions as regular asynchronous functions.
