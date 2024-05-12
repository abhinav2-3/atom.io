# Social Media Platform - Atom.io

## Description
This project is a social media platform where users can connect with each other, share posts, like and comment on posts, bookmark posts for later reference, and update their profiles. It also includes features for user authentication and profile management.

## Key Features
- **Create a Post**: Users can create and share posts with text, images, or videos.
- **Feed**: Users have a personalized feed where they can view posts from users they follow.
- **Like**: Users can like posts to show appreciation.
- **Bookmarks**: Users can bookmark posts to save them for later viewing.
- **Comment**: Users can comment on posts to engage in discussions.
- **Edit Profile**: Users can edit their profile information such as name, bio, and contact details.
- **Update Profile Picture**: Users can upload and update their profile picture.
- **Add/Remove Connection**: Users can add or remove other users as connections/friends.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (React.js)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation
1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**: 
   ```bash
   cd social-media-platform
   npm install
   ```
3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=<port-number>
     MONGODB_URI=<mongodb-uri>
     JWT_SECRET=<jwt-secret>
     ```

## Usage
1. **Run the Server**:
   ```bash
   npm start
   ```
2. **Access the Application**: 
   - Open your web browser and go to `http://localhost:<port-number>`.

## Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login an existing user.

### User Profile
- **GET /api/profile**: Get current user's profile information.
- **PUT /api/profile**: Update current user's profile information.
- **PUT /api/profile/avatar**: Update current user's profile picture.

### Posts
- **GET /api/posts**: Get all posts.
- **POST /api/posts**: Create a new post.
- **GET /api/posts/:id**: Get a specific post by ID.
- **PUT /api/posts/:id**: Update a specific post by ID.
- **DELETE /api/posts/:id**: Delete a specific post by ID.
- **POST /api/posts/:id/like**: Like a specific post by ID.
- **POST /api/posts/:id/comment**: Comment on a specific post by ID.

## Contributors
- Abhinav (github.com/abhinav2-3)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
