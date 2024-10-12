# GigLink

## Project Overview

GigLink is a web-based platform that connects job posters with skilled individuals and shops in a specific area. Job posters can post part-time jobs, and registered bidders can bid on those jobs. The poster can select a bidder from the available candidates. GigLink aims to create a seamless and efficient way for individuals to find part-time work in their local communities.

## Features

- **Job Posting**: Job posters can create job listings under various categories.
- **Bidding System**: Registered bidders can submit bids on posted jobs.
- **Selection Process**: Job posters can review and select a bidder from the list of applicants.
- **Payment**: No online payment system is involved; payment is made in cash after completing the job.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/giglink.git
   ```

2. Navigate to the project directory:

   ```bash
   cd giglink
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the necessary environment variables for MySQL and JWT configuration.

5. Start the application:

   ```bash
   npm run start
   ```

The application will start using `nodemon` on `http://localhost:3000`.

## Prerequisites

- **Operating System**: Windows 10/11 or Linux
- **Browser**: Any Chromium-based browser
- **Back-End**: Node.js
- **Front-End**: HTML, CSS, Bootstrap
- **Database**: MySQL

## Dependencies

The project utilizes the following packages:

- `bcrypt`: ^5.1.0
- `body-parser`: ^1.20.2
- `cookie-parser`: ^1.4.6
- `dotenv`: ^16.0.3
- `ejs`: ^3.1.9
- `express`: ^4.18.2
- `hbs`: ^4.2.0
- `jsonwebtoken`: ^9.0.0
- `multer`: ^1.4.5-lts.1
- `mysql`: ^2.18.1
- `nodemon`: ^2.0.22

## Project Planning

The development of GigLink is structured over 12 weeks:

- **Weeks 1-4**: Front-end development, including login, signup, profile, job posting, and admin pages.
- **Weeks 5-10**: Back-end development, database design, and integration with front-end components.
- **Week 11**: Testing and quality assurance across various devices and browsers.
- **Week 12**: Deployment and final launch of the website.

## Contributing

Feel free to contribute to the project by submitting a pull request or opening an issue.

## License

This project is licensed under the ISC License.
