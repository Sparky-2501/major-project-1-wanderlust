<h1>Wanderlust – Full-Stack Airbnb-Style MERN Project</h1>

Wanderlust is a full-stack web application inspired by Airbnb, built using Node.js, Express, MongoDB, EJS, Cloudinary, Passport Authentication, and Mapbox Maps.
The project includes CRUD listings, authentication, reviews, image uploads, form validation, flash messages, authorization, deployment, and full MVC architecture.
<hr>

<h5>🚀 Tech Stack</h5>

Backend: Node.js, Express.js<br>
Templating: EJS + EJS-Mate<br>
Database: MongoDB Atlas, Mongoose<br>
Auth: Passport.js (Local Strategy), express-session, connect-flash<br>
File Upload: Multer + Cloudinary Storage<br>
Map Integration: Mapbox Geocoding API + Mapbox GL JS<br>
Validation: Joi<br>
Deployment: Render<br>
CSS: Bootstrap + Custom CSS
<hr>

<h5>📁 Project Features</h5>

<h4>Listings</h4>
Create / Read / Update / Delete listings<br>
Upload images (Cloudinary)<br>
Map view powered by Mapbox<br>
Owner-based access control<br>
Server-side + Client-side validation

<h4>Reviews</h4>
Add reviews with rating<br>
Delete reviews<br>
Review authorization (only author can delete)<br>
Authentication<br>
Signup, Login, Logout<br>
Session handling<br>
Flash messages<br>
Redirect to previously attempted page after login<br>


<h4>UI/UX</h4>
Responsive Bootstrap layout<br>
Navbar, footer, card grids<br>
Form styling, star ratings<br>
Custom animations & overlays<br>

<h4>MVC Architecture</h4>
Models → Listings, Users, Reviews<br>
Views → EJS Templates<br>
Controllers → All logic separated into controllers folder<br>
Routers → Modular routing for listings, reviews, users<br>

<h4>Deployment</h4>

MongoDB Atlas integration<br>
Render deployment<br>
Environment variables<br>
Cloudinary + Mapbox external services<br>
Session Store using connect-mongo<br>

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
