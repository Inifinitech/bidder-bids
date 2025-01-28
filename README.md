# Product Bidding App

A web application that allows users to place bids on products, with an admin dashboard to add products. 

## Features

- Admin Dashboard to add new products with details like name, description, starting price, and end time.
- Users can view products and place bids on them.
- A bidding system to ensure the highest bid is updated in real-time.

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Toast Notifications**: react-hot-toast for user feedback

## How to Set Up

### Backend (Django)

1. Clone the repository and navigate to the `backend` directory.
2. Create a Python virtual environment and activate it:
3. Install Dependencies
    ```pip install > requirements.txt```
4. Apply Migrations
    ```./manage.py migrate```
5. Run the server
    ```./manage.py runserver```
    The backend will be running on ```http://127.0.0.1:8000```

### Frontend (React)

1. Clone the repository and navigate to the ```bidding_frontend``` directory.
2. Install Dependencies
    ```npm install```
3. Start the React development server:
    ```npm run dev```


