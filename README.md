# 🎬 MovieMaster Pro

A full-stack movie management platform where users can browse movies, manage their personal collection, and explore detailed information with a clean UI and smooth experience.

## 🔗 Live Site
## Live Link: https://mellow-pixie-ba5e05.netlify.app/

## client repo link: https://github.com/Md-Abdullahil-Kafi/moviemaster-client.git

## server repo link: https://github.com/Md-Abdullahil-Kafi/moviemaster-pro-server.git

---

## ⭐ Key Features

* Dynamic movie carousel showcasing featured/latest movies
* Full CRUD movie management system
* Secure authentication with Firebase
* User-specific collection (My Collection)
* Protected routes (Add Movie, My Collection, Update Movie)
* Watchlist system
* Responsive and mobile-friendly UI

---

## 🧱 1. Layout Structure

### **Main Layout**

* **Header:** Navigation links — *Home*, *All Movies*, *My Collection*, *Login/Register*
* **Search Bar:** Global movie search *(optional)*
* **User Profile Dropdown:** Visible when logged in
* **Authentication Buttons:** Login/Register (if logged out), Logout (if logged in)

### **Footer**

* Copyright
* Quick Links
* Social Media Icons

### **Mobile Layout**

* Hamburger menu
* Collapsible sidebar navigation

---

## 🏠 2. Home Page Structure

### **Hero Section**

* Dynamic carousel from latest movies (from database)

### **Statistics Section**

* Displays total number of movies
* Total users (from API)

### **Top Rated Movies**

* Shows top 5 highest-rated movies

### **Recently Added**

* Displays 6 newest movies

### **Genre Section**

* Includes Action, Comedy, Drama, Sci-Fi, Romance, Horror, etc.

### **About Platform**

* Static overview of MovieMaster Pro platform

### **Animations**

* Smooth, eye-catching animations using Framer Motion

---

## 🔐 3. Authentication System

### **Login Page**

* Email & Password fields
* Google Login button
* Redirect on success / toast on error

### **Register Page**

* Name, Email, Photo URL, Password
* Password validations:

  * 1 uppercase letter
  * 1 lowercase letter
  * Minimum 6 characters
* Google Login
* Redirect on success

---

## 🎬 4. CRUD: Movie Management System

### **Routes**

| Path                    | Description         | Protected       |
| ----------------------- | ------------------- | --------------- |
| `/movies`               | Display all movies  | ❌               |
| `/movies/add`           | Add new movie       | ✔️              |
| `/movies/my-collection` | User's added movies | ✔️              |
| `/movies/update/:id`    | Update movie        | ✔️ (owner only) |
| `/movies/:id`           | Movie details       | ❌               |

### **Movie JSON Structure**

```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": 2010,
  "director": "Christopher Nolan",
  "cast": "Leonardo DiCaprio, Joseph Gordon-Levitt",
  "rating": 8.8,
  "duration": 148,
  "plotSummary": "A thief who steals corporate secrets through dream-sharing technology...",
  "posterUrl": "https://i.ibb.co/example.jpg",
  "language": "English",
  "country": "USA",
  "addedBy": "user@example.com"
}
```

### **Page Breakdown**

* **All Movies Page:** Show poster, title, genre, rating, release year & details button
* **Movie Details:** Full data + Edit/Delete for owner
* **My Collection:** Only logged-in user’s movies with quick edit/delete
* **Add Movie Page:** Full input form
* **Update Page:** Pre-filled form (except "Added By")
* **Delete:** Confirmation modal & real-time UI update

---

## 🧩 5. Additional Features

### **Loading States**

* Spinners during API calls

### **Error Handling**

* Custom 404 page
* Error boundaries

### **Toast Notifications**

* CRUD success/error feedback

### **Protected Routes**

* `/movies/add`
* `/movies/my-collection`
* `/movies/update/:id`

---

## 🚀 Advanced Features (Implemented)

### **Advanced Filtering**

* Filter by genre using `$in`
* Rating range filter using `$gte` and `$lte`

### **Watchlist Feature**

* Add movies to watchlist
* Dedicated Watchlist page

### **Theme Toggle (Dark/Light)**

* Entire UI changes theme instantly

---

## 🛠 Optional Enhancements (If Time Allowed)

* User Reviews
* Debounced search
* Firebase Admin route protection

---

## 💻 Tech Stack

### **Frontend:**

* React + Vite
* Firebase Auth
* React Router DOM
* Tailwind CSS
* Framer Motion

### **Backend:**

* Node.js
* Express.js
* MongoDB
* JWT for protected routes

### **Deployment:**

Frontend → Netlify Backend → Vercel / Render (depending on setup)

---

## 📄 License

This project is created for educational purposes.
