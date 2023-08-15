# Mini Social Network

## 1. Introduction
A mini social network using react+vite+redux and strapi

## 2. The Project
The goal of this project is to set up a quasi-Twitter. This app is minimalist and  feature:
- User authentication (Sign up, Log in, Log out)
- Profile display and editing
- The ability to create posts

### 2.1. Features

#### 2.1.1. Registration
- Data: username, email, password

#### 2.1.2. Login
- Data: identifier (email or username), password

#### 2.1.3. Profile

#### 2.1.4. Home Page (and posts)
For logged in users:
- A text input to write a post.
- List of posts in descending order.
- Their own posts among existing ones.
- Clickable usernames that redirect to the writer's profile.
For logged out users: 
- A basic explanatory home page text.

#### 2.1.5. Author's Profile

#### 2.1.6. Other Features
For logged in users:
- Like and unlike posts.
- Delete their own posts.
- Logout.

#### 2.1.7. Optimization Tips
- Sort by creation date


/my-app
├── dist
├── node_modules
├── public
│   └── vite.svg
├── src
│   └── assests
│   └── pages
│   └── assests
│   │   └── images
│   │       └── react.svg
│   └── components
│   │   └── about.jsx
│   │   └── bravo.jsx
│   │   └── contact.jsx
│   │   └── createPost.jsx
│   │   └── faq.jsx
│   │   └── footer.jsx
│   │   └── form.jsx
│   │   └── header.jsx
│   │   └── likes.jsx
│   │   └── login.jsx
│   │   └── posts.jsx
│   │   └── privacy.jsx
│   │   └── profile.jsx
│   │   └── terms.jsx
│   │   └── userProfile.jsx
│   └── style
│   │   └── index.scss
│   └── utilities
│   │   └── userMapping.js
│   └── GlobalStateContext.jsx
│   └── main.jsx
│   └── App.jsx
│   └── state.jsx
│   └── config.js
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── pnpm-lock.yaml
├── package.json
├── README.md
└── vite.config.js