# 🚀 GadgetVerse -- Tech & Gadget Product Explorer (Next.js)

A modern, responsive, and feature--rich **tech & gadget mini e-commerce
application** built with **Next.js App Router**, featuring
authentication, protected pages, product management, and polished UI
throughout.

🔗 **Live Website:** https://gadgetverse-gold.vercel.app/\
🗄️ **Backend API:** https://gadget-verse-backend.vercel.app/\
💻 **Frontend Repo:**
https://github.com/codeofmaple/gadget-verse-frontend\
🛠️ **Backend Repo:** https://github.com/codeofmaple/gadget-verse-backend

------------------------------------------------------------------------

## 📌 Project Overview

**GadgetVerse** is a sleek gadget-focused mini e-commerce application
built using **Next.js (App Router)** and **NextAuth.js**.\
Users can browse tech products, view details, log in via Google or
credentials, and securely access protected pages like **Add Product**
and **Manage Products**.

This project focuses on:

-   Clean UI & layout consistency\
-   Professional responsiveness\
-   Protected pages with authentication\
-   Smooth UX interactions

------------------------------------------------------------------------

## 🧱 Features Breakdown

### **1. 🌐 Landing Page (7 Sections)**

✔ Fully responsive & polished\
✔ Sticky navbar with login/register\
✔ After login → user dropdown with: - Profile info - Add Product -
Manage Products\
✔ Hero section (headline, subtitle, CTA)\
✔ 4+ themed sections (features, items, testimonials, etc.)\
✔ Uniform cards with hover states\
✔ Modern footer

------------------------------------------------------------------------

### **2. 🔐 Authentication (NextAuth.js)**

-   Google login\
-   Email/password login\
-   Redirect to homepage after login\
-   Protected routes enforced in server/client

------------------------------------------------------------------------

### **3. 🛒 Product List Page**

-   Page title + description\
-   Search bar\
-   Optional category UI\
-   Grid of 6+ product cards\
-   Card includes:
    -   Image
    -   Title
    -   Short description (ellipsis)
    -   Price/meta
    -   **Details** button

------------------------------------------------------------------------

### **4. 📄 Product Details Page**

-   Large banner/product image\
-   Title + full description\
-   Meta info (price/date)\
-   Back button\
-   Clean layout

------------------------------------------------------------------------

### **5. ➕ Add Product (Protected Page)**

Only logged-in users can access.

Includes form fields:

-   Title\
-   Short description\
-   Full description\
-   Price/date/priority\
-   Image URL (optional)

✔ On submit → Toast message\
✔ Redirect or success feedback

------------------------------------------------------------------------

### **6. 🗂️ Manage Products (Protected Page)**

-   Grid/table layout\
-   View & Delete actions\
-   Clean, responsive UI

------------------------------------------------------------------------

### **7. 🎨 UI/UX & Design Consistency**

-   Smooth animations (Framer Motion)\
-   Hover & focus states\
-   Mobile/tablet/desktop optimized\
-   Reusable components (Cards, Buttons, Loaders)

------------------------------------------------------------------------

## 🛠️ Tech Stack

### **Frontend**

-   Next.js 16 (App Router)
-   React 19
-   Tailwind CSS 4
-   NextAuth.js
-   Framer Motion
-   React Icons / Lucide Icons
-   React Toastify
-   SweetAlert2

### **Backend**

-   Node.js / Express\
-   Hosted on Vercel\
-   REST API for product management

------------------------------------------------------------------------

## 📦 Dependencies Used

  Package                 Purpose
  ----------------------- ---------------------
  `next`                  Core framework
  `next-auth`             Authentication
  `react` / `react-dom`   UI
  `tailwindcss`           Styling
  `framer-motion`         Animations
  `react-icons`           Icons
  `lucide-react`          Icon set
  `sweetalert2`           Interactive alerts
  `react-toastify`        Toast notifications

------------------------------------------------------------------------

## 📁 Project Structure (Frontend)

    src/
     ├─ app/
     │   ├─ about/
     │   ├─ login/
     │   ├─ register/
     │   ├─ add-product/   (Protected)
     │   ├─ manage-products/ (Protected)
     │   ├─ products/
     │   │    └─ [id]/
     │   ├─ api/
     │   ├─ layout.jsx
     │   └─ page.jsx
     ├─ components/
     │   ├─ layout/
     │   ├─ ui/
     │   ├─ cards/
     │   └─ homePage/
     ├─ contexts/
     ├─ lib/
     │   ├─ api.js
     │   └─ auth.js
     ├─ styles

------------------------------------------------------------------------

## ⚙️ Installation & Setup Guide

### **1. Clone the project**

``` bash
git clone https://github.com/codeofmaple/gadget-verse-frontend
cd gadget-verse-frontend
```

### **2. Install dependencies**

``` bash
npm install
```

### **3. Add environment variables**

Create `.env.local`:

    NEXTAUTH_SECRET=your_secret
    NEXTAUTH_URL=http://localhost:3000

    GOOGLE_CLIENT_ID=xxxx
    GOOGLE_CLIENT_SECRET=xxxx

    BACKEND_URL=https://gadget-verse-backend.vercel.app

### **4. Run development server**

``` bash
npm run dev
```

App runs at:

    http://localhost:3000

------------------------------------------------------------------------

## 🌐 Deployment

This project is fully compatible with:

-   ✔ Vercel\
-   ✔ Netlify (SSR setup needed)\
-   ✔ Any Node hosting

Make sure environment variables are configured correctly.

------------------------------------------------------------------------

## 📑 Route Summary

  Route                Type        Description
  -------------------- ----------- -------------------------------
  `/`                  Public      Landing page
  `/login`             Public      Login with Google/Credentials
  `/register`          Public      Register page
  `/products`          Public      All products list
  `/products/[id]`     Public      Product details
  `/add-product`       Protected   Add new product
  `/manage-products`   Protected   Manage product list

------------------------------------------------------------------------

## 👨‍💻 Author / Credits

**Developer:** CodeOfMaple\
GitHub: https://github.com/codeofmaple

------------------------------------------------------------------------

## 🪪 License

MIT License © 2025 GadgetVerse

------------------------------------------------------------------------

## ⭐ Enjoying the project?

Consider giving the repository a **GitHub star** ⭐
