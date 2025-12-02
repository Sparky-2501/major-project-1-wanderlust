<h1>Wanderlust – Full-Stack Airbnb-Style MERN Project</h1>

Wanderlust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, EJS, Cloudinary, Passport Authentication, and Mapbox Maps.
The project includes CRUD listings, authentication, reviews, image uploads, form validation, flash messages, authorization, deployment, and full MVC architecture.
<hr>

<h5>🚀 Tech Stack</h5>

Backend: Node.js, Express.js
Templating: EJS + EJS-Mate
Database: MongoDB Atlas, Mongoose
Auth: Passport.js (Local Strategy), express-session, connect-flash
File Upload: Multer + Cloudinary Storage
Map Integration: Mapbox Geocoding API + Mapbox GL JS
Validation: Joi
Deployment: Render
CSS: Bootstrap + Custom CSS
<hr>

<h5>📁 Project Features</h5>

<h4>Listings</h4>
Create / Read / Update / Delete listings
Upload images (Cloudinary)
Map view powered by Mapbox
Owner-based access control
Server-side + Client-side validation

<h4>Reviews</h4>
Add reviews with rating
Delete reviews
Review authorization (only author can delete)
Authentication
Signup, Login, Logout
Session handling
Flash messages
Redirect to previously attempted page after login


<h4>UI/UX</h4>
Responsive Bootstrap layout
Navbar, footer, card grids
Form styling, star ratings
Custom animations & overlays

<h4>MVC Architecture</h4>
Models → Listings, Users, Reviews
Views → EJS Templates
Controllers → All logic separated into controllers folder
Routers → Modular routing for listings, reviews, users

<h4>Deployment</h4>

MongoDB Atlas integration
Render deployment
Environment variables
Cloudinary + Mapbox external services
Session Store using connect-mongo

<h5>🗃 Project Structure</h5>
.<br>
├── controllers/<br>
├── models/<br>
├── routes/<br>
├── public/<br>
│   └── css/<br>
├── views/<br>
│   ├── listings/<br>
│   ├── users/<br>
│   ├── reviews/<br>
│   ├── includes/<br>
│   └── layouts/<br>
├── .env<br>
├── app.js<br>
└── README.md<br>
