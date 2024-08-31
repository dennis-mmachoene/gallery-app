# Gallery App with Multer

This is a simple gallery application built with Node.js, Express, MySQL, Sequelize, and EJS. It allows users to create accounts, log in, upload images, and view images uploaded by other users. The application uses Multer for file storage.

## Features

- User registration and login
- Image upload with Multer
- View and manage uploaded images
- View images uploaded by other users

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend
- **Express**: Web framework for Node.js
- **MySQL**: Relational database management system
- **Sequelize**: ORM for interacting with MySQL
- **EJS**: Templating engine for rendering HTML
- **Multer**: Middleware for handling file uploads

## Installation

### Clone the Repository

```bash
git clone https://github.com/dennis-mmachoene/gallery-app.git
cd gallery-app
```

## Install Dependencies

```bash
npm install
```

## Configure the Database 

1. Create a MySQL database named gallery_db.
2. Update the database configuration in config/db.js with your MySQL credentials.


## Running the Application

1. Start the server:
```
bash 
npx nodemon app.js
```
2. Open your browser and navigate to http://localhost:3000.
 

## Usage

1. Register: Create a new user account.
2. Login: Log in to your account.
3. Upload Images: Use the upload form to add new images.
4. View Gallery: See images uploaded by all users.
5. My Pictures: View images you have uploaded.


## File Storage with Multer
This application uses Multer to handle file uploads. Multer stores uploaded files in the public/uploads directory.
The upload route in routes/image.js handles the image upload process:

```javascript 
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
```

## Contributing
Feel free to fork the repository and submit pull requests with improvements or bug fixes.

## Contact
If you have any questions, please contact dennismmachoene@gmail.com