<hr/>
# Authentication and Authorization

Add form-based cookie/session authentication.

### We will have 3 types of users:
* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

### Authenticate and authorize users in a server-side application
* [ ] Users can sign up for to the app with a unique email
* [ ] Users cannot sign up for to the app with a duplicate email
* [ ] Users can login to the app with valid email/password
* [ ] Users cannot login to the app with a blank or missing email
* [ ] Users cannot login to the app with a blank or incorrect password
* [ ] There is a resource that can only be seen by logged in users
* [ ] There is a resource that can only be seen by a specific user
* [ ] There is a resource that has some links and content that only appears when logged in / for certain users

### Harden a server-side application against security vulnerabilities
* [ ] Password is hashed in the database using a slow-hashing algorithm
* [ ] Cookies are HTTPOnly
* [ ] Cookies are Secure
* [ ] Cookies are encrypted
* [ ] Encryption keys are set in environment variables

## Authentication
* [ ] Add auth router
* [ ] Create user with POST /auth/register
	* [ ] validate required fields
	* [ ] Check if email is unique
	* [ ] hash password with bcrypt
	* [ ] insert into db
	* [ ] Set a cookie with user_id after creating user
		* [ ] Best Practices
		* [ ] Cross origin cookie!
* [ ] Create sign up form; show errors; redirect;
	* [ ] Validate required fields
* [ ] Login user with POST /auth/login
	* [ ] check if email in db
		* [ ] compare password with hashed password in db
		* [ ] set cookie
* [ ] Create login form; show errors; redirect;
 	* [ ] validate required fields

### Authorization:
* [ ] Visitors can only see the homepage
	* [ ] create middleware to redirect visitors without a user_id cookie set
	* [ ] redirect to sign up form and show an error message
* [ ] Logged in users can only see their page
	* [ ] check user_id cookie in route handler
 	* [ ] show an unauthorized error message
	* [ ] redirect to user page if they visit the homepage

## Admin Page:
* [ ] Admin page that lists all users
	* [ ] admin table with user_id (unique constraint)
	* [ ] de-activate users
* [ ] Admin can see any page on site

## Other ways to auth:
* [ ] Use sessions instead of cookies!
* [ ] Use JWTs instead of sessions!
<hr/>