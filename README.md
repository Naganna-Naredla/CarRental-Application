Car Rental Service Application
Project Overview
The Car Rental Service Application is a comprehensive web-based platform designed to 
facilitate car rentals for customers while providing administrators with robust tools to manage inventory, 
handle bookings, and oversee customer interactions. This application includes core functionalities for car rental booking, 
real-time inventory management, map-based car tracking, car rating and review systems, and a notification system to keep users and admins informed.

Table of Contents
  Project Overview
  Features
  Technology Stack
  Installation
  Usage
  API Endpoints
  Demo

  Features
Level 0: Basic Inventory Creation and Car Rental Booking
Car Inventory Management: Admins can add, view, update, and delete car details in the inventory. Cars are searchable by Make, Model, Year (MMY), and Registration number.
Car Rental Booking: Customers can browse available cars, filter by MMY, fuel type, and rent range, and book cars for specific durations with validation to prevent double-booking.

Level 1: Real-Time Inventory Availability, Map View, and Car Rating
Real-Time Inventory Management: Ensures car availability is updated in real-time across all user interfaces. Once a car is booked, it is marked as "Booked."
Map View: Displays cars on a map with markers indicating their status ("In Trip" in green, "In Garage" in red). This feature is visible only to admins.
Car Rating and Booking Cancellation: Customers can rate cars post-rental, with ratings aggregated in the car's profile. A booking cancellation system triggers admin review.


Level 2: Handling Race Conditions When Booking the Same Vehicle
Final Availability Check: Ensures a vehicle's availability before completing the booking to prevent race conditions when multiple users attempt to book the same car.
User Feedback: Provides clear feedback if a booking conflict occurs and offers alternative vehicles.

Level 3: Notification System
Email Notifications: Sends email notifications to customers and admins upon booking confirmation, cancellation, and other important events.

Technology Stack
Frontend: HTML, CSS, JavaScript, React
Backend: Node.js, Express.js, MongoDB, Mongoose
Email Service: Nodemailer with Gmail SMTP

Installation

  Prerequisites
    Node.js and npm installed
    MongoDB Atlas or a local MongoDB instanc

Usage

  Booking Process
    Customers search for available cars and book a vehicle for a future date.
    Upon booking, the car becomes unavailable for other customers, and the status shows as "Booked" to the admin.
  Trip Management
    On the booking start date, customers start the ride, changing the car's status to "In Trip" on both the customer and admin interfaces.
  Cancellation Process
    Customers can cancel a ride, sending a cancellation request to the admin for confirmation. Once confirmed, the car is marked as available again.
  Admin Management
    Admins manage the car inventory, track cars in real-time on a map, and view ratings for each car.
 API Endpoints
  GET /api/events: Fetch all events
  POST /api/events: Create a new event
  POST /api/users/register: Register a new user
  POST /api/users/login: Login a user
  GET /api/reviews: Fetch all reviews
  POST /api/reviews: Create a new review
Demo
  A video demonstration of the working project is available here.
  link: https://drive.google.com/file/d/1Ll_jQ0amkD4Dba2jzLYXLN9DhBSk5_cV/view?usp=sharing

