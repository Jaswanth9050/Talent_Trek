what are need to add to this website(web application ) is 
->jobseaker register to db.json file and check wheather user already register are not if register show aleart already register if not store the data in db.json file 
->jobseaker login page it need to check weather that user is register or not if register then show website as user login otherwise show aleart inned to register 
-> in login page show forgot link when user click on it in need to show forgot page in that page show email with verfication button if verifiation success then user can change the password and agin render to login page then he can enter details and password is new password then login to  else throw an aleart
->in application page the data need to store in db.json and add another functionality that if apply the job then  he again going to register same job aplication then throw an error message in aleart and not to store in db.json file that already exited 
->in employee page that job seaker (user) applied data need to show the employee paage but need to show that employee posted company job only not all appled data it need to show ony the employee post jobs only and add two button to it one delete and another button is next step button when employee click on delete button then the data need to delete from db.json file also send an email accoding to it, if he click on next step button then it send an email accoding to it

->if need to add capche(random char and number) in down need to check given is correct are not
->while seeing application need to show count of the application also
->can add admin page in that page only admin can access all the things like all applications, employee register,employee posted jobs ,job seaker registion,what are the job need to show in job page and soon etc can access by admin 
->to access admin page you need to change url, that not buttons in normal website,while chaning url then you can see the admin page when admin page visiable first show login page in login page we can see create a admin register page but in admin register page the user need to enter the id of the website which already existed by creating from starting (need to create)




✅ 1. Job Seeker Registration Page
Create a registration form for job seekers to input their details (e.g., name, email, password, etc.).

On form submission:

Check if the user already exists in db.json (based on email or unique ID).

If user exists:
👉 Show an alert: "You are already registered."

If user does not exist:
👉 Save the new user data to db.json.

✅ 2. Job Seeker Login Page
Create a login form (email and password).

On form submission:

Check if the entered email exists in the job seeker data from db.json.

If user exists and password matches:
👉 Log in the user and redirect to the job portal.

If email does not exist:
👉 Show an alert: "You are not registered. Please register first."

✅ 3. Forgot Password Functionality
On the login page, include a "Forgot Password?" link.

On clicking the link:

Redirect to the Forgot Password page.

On this page:

Show an input field for email.

Add a "Verify" button.

If the entered email is found in db.json:
👉 Allow the user to reset the password.
👉 On successful password change, redirect to the Login page.
👉 User can now log in with the new password.

If email not found:
👉 Show an alert: "Email not registered."

✅ 4. Job Application Page
When a logged-in user applies for a job:

Check if the user has already applied to the same job.

If already applied:
👉 Show an alert: "You have already applied to this job."
👉 Do not store the duplicate application in db.json.

If not applied:
👉 Save the application data in db.json.

✅ 5. Employee Page – Manage Applications
Each employee can view only the job applications that were made to jobs they posted (match company or employee ID).

For each application:

Show two buttons:
🔴 Delete
🔵 Next Step

Delete Button Functionality:

Remove the application from db.json.

Send an email to the job seeker:
✉️ "Your application has been rejected."

Next Step Button Functionality:

Keep the application.

Send an email to the job seeker:
✉️ "Your application has been moved to the next step in the hiring process."

