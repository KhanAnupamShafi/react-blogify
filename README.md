# React Blogify

React Blogify is an API project designed to facilitate learning about integrating APIs with frontend applications, particularly in React. The API provides various endpoints for managing blog posts, user authentication, profile management, and interaction with blog content.

**Key Features:**

1. **User Authentication:** Allows users to register, login, and manage their profiles securely using JWT (JSON Web Tokens) for authentication.
2. **Blog Post Management:** Enables users to create, read, update, and delete their blog posts. Users can also like, comment on, and mark blog posts as favorites.
3. **Profile Management:** Provides endpoints for users to update their profile information, including name, bio, and avatar.

### :electric_plug: Installation

To clone and run this application, you'll need

- [Git](https://git-scm.com) and
- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))
  installed on your computer. From your command line:

```bash
# Clone this repository using
$ git clone

# Go into the repository
$ cd

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

### 📁 Page Structure

```markdown
            |-- pages
            |   |-- BlogDetailPage.jsx
            |   |-- CreateBlogPage.jsx
            |   |-- HomePage.jsx
            |   |-- LoginPage.jsx
            |   |-- NotFoundPage.jsx
            |   |-- ProfilePage.jsx
            |   |-- RegistrationPage.jsx
```

## 💻 Snapshot

[product-screenshot]: public/site.png

[![Product Name Screen Shot][product-screenshot]](public/site.png)

**Endpoints:**

1. **Authentication:**
   - `/auth/register`: Register a new user.
   - `/auth/login`: Log in an existing user and obtain JWT tokens for authentication.
   - `/auth/refresh-token`: Refresh the access token using the refresh token.
2. **Blog Posts:**
   - `/blogs`: Retrieve all blog posts or create a new blog post.
   - `/blogs/:id`: Retrieve, update, or delete a specific blog post by ID.
   - `/blogs/:id/comment`: Add a comment to a specific blog post.
   - `/blogs/:id/like`: Like a specific blog post.
   - `/blogs/:id/favorite`: Mark a specific blog post as a favorite.
3. **Profile Management:**
   - `/profile/:userId`: Retrieve the profile information of a specific user.
   - `/profile/avatar`: Upload or retrieve the avatar image for the user's profile.
   - `/profile`: Update the profile information of the authenticated user.

**Authentication and Authorization:**

- User authentication is implemented using JWT tokens, ensuring secure access to API endpoints.
- Access to certain endpoints, such as creating, updating, or deleting blog posts, requires authentication with valid JWT tokens.

**Usage:**

- Developers can use this API project to learn how to integrate backend APIs with React frontend applications.
- By exploring the provided endpoints, developers can understand how to perform CRUD (Create, Read, Update, Delete) operations on blog posts, manage user authentication, and update user profiles.

React Blogify API serves as an educational resource for developers aiming to enhance their skills in integrating APIs with React applications. With its comprehensive set of endpoints and user-friendly documentation, developers can effectively learn how to build interactive blog websites with React and backend APIs.
