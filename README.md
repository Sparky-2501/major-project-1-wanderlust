<h1>Wanderlust – Full-Stack Airbnb-Style MERN Project</h1>
<style="color:green">
Wanderlust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, EJS, Cloudinary, Passport Authentication, and Mapbox Maps.
The project includes CRUD listings, authentication, reviews, image uploads, form validation, flash messages, authorization, deployment, and full MVC architecture.
</style>
🚀 Tech Stack

Backend: Node.js, Express.js

Templating: EJS + EJS-Mate

Database: MongoDB Atlas, Mongoose

Auth: Passport.js (Local Strategy), express-session, connect-flash

File Upload: Multer + Cloudinary Storage

Map Integration: Mapbox Geocoding API + Mapbox GL JS

Validation: Joi

Deployment: Render

CSS: Bootstrap + Custom CSS

📁 Project Features
Listings

Create / Read / Update / Delete listings

Upload images (Cloudinary)

Map view powered by Mapbox

Owner-based access control

Server-side + Client-side validation

Reviews

Add reviews with rating

Delete reviews

Review authorization (only author can delete)

Authentication

Signup, Login, Logout

Session handling

Flash messages

Redirect to previously attempted page after login

UI/UX

Responsive Bootstrap layout

Navbar, footer, card grids

Form styling, star ratings

Custom animations & overlays

MVC Architecture

Models → Listings, Users, Reviews

Views → EJS Templates

Controllers → All logic separated into controllers folder

Routers → Modular routing for listings, reviews, users

Deployment

MongoDB Atlas integration

Render deployment

Environment variables

Cloudinary + Mapbox external services

Session Store using connect-mongo

🗃 Project Structure
.
├── controllers/
├── models/
├── routes/
├── public/
│   └── css/
├── views/
│   ├── listings/
│   ├── users/
│   ├── reviews/
│   ├── includes/
│   └── layouts/
├── .env
├── app.js
└── README.md
