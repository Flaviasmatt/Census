# Census API

This is a RESTful API for a Census application. It allows an authenticated Admin user to manage participant records, including personal information, employment, and home location details.

## Deployment

The application is deployed on Render and can be accessed at:

**https://census-zu8q.onrender.com**

All requests must be authenticated using HTTP Basic Auth.

**Admin credentials:**
- Username: `admin`
- Password: `P4ssword`

## Technologies Used

- Node.js
- Express.js
- Sequelize
- MySQL (Aiven Cloud)
- Render (Deployment)

## How to Use

### Authentication

All endpoints are protected by Basic Auth. Use the credentials provided above to authenticate every request.

### Add a Participant

**POST** `/participants/add`

Request body (JSON):
```json
{
  "email": "jane.doe@example.com",
  "firstname": "Jane",
  "lastname": "Doe",
  "dob": "1990-05-15",
  "work": {
    "companyname": "Acme Inc.",
    "salary": 55000,
    "currency": "USD"
  },
  "home": {
    "country": "USA",
    "city": "New York"
  }
}

Get All Participants
GET /participants

Get Personal Details of All Participants
GET /participants/details

Get Personal Details by Email
GET /participants/details/:email

Get Work Details by Email
GET /participants/work/:email

Get Home Details by Email
GET /participants/home/:email

Update a Participant
PUT /participants/:email

Same JSON structure as POST /participants/add.

Delete a Participant
DELETE /participants/:email

Validation
All requests are validated on the backend. Fields like email and date of birth must be correctly formatted. Invalid requests will return descriptive error messages in JSON.

Environment Variables

To run the project locally, create a .env file with the following 
variables:

PORT=3000
DB_HOST=your_host
DB_PORT=your_port
DB_NAME=your_db_name
DB_USER=your_user
DB_PASSWORD=your_password
DB_DIALECT=mysql

License
This project is part of a course assignment and is not intended for production use.