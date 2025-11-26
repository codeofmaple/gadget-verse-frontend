'use client';

import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavLoader from '../components/NavLoader';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <Navbar />
          <NavLoader />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </body>
    </html>
  );
}