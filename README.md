# 🧠 Talent Trek - Job Portal Application

A modern Job Portal Web Application inspired by platforms like **Naukri**, **Apna**, and **Indeed**, designed to streamline job hunting for students and simplify job posting for employees. This project features separate dashboards for **Students** and **Employees**, with intuitive UI and full-stack functionalities including authentication, email communication, and CRUD operations.

---

## 🚀 Live Demo

> 💡 Frontend deployment link 
`🔗 https://talent-trek-7ieo.vercel.app/

---

## 📌 Key Features

### 👨‍🎓 Student View

- ✅ Register & Login with email and password
- ✅ Navbar shows "Login" and "Employee" buttons
- ✅ Once logged in, username appears in Navbar with styled color
- ✅ Pages:
  - **Home Page** – Header, Trending, Brands, Category cards, Static counter for student registrations
  - **About Page** – Details about the platform
  - **Contact Page** – Google Maps, FAQs, Contact form
  - **Find a Job Page**:
    - See only jobs posted by employees
    - Latest jobs appear at the top
    - Search bar with filters (Company, Location, Skills)
    - Pagination with Previous/Next buttons and numbered pages
    - Apply for jobs with real-time email confirmation
- ✅ Email Authentication:
  - Job application confirmation email
  - Password reset via email for both students and employees

---

### 🧑‍💼 Employee View

- ✅ Employee Registration:
  - On successful registration, receives a unique `Emp_ID` via `alert()`
  - `Emp_ID` + Password required for login
  - Password visibility toggle option
- ✅ Pages after login:
  - **Profile Page** – View profile details
  - **Create Job Page** – Post new jobs (Job Date auto-set via `new Date().toISOString()`)
  - **Posted Jobs Page** – View and Edit only jobs posted by that employee
    - On edit, job's `postedDate` also updates
  - **Settings Page** – Profile and UI settings
  - **Logout** – Returns to student/public view
- ✅ Company Selector:
  - Dropdown to select existing companies
    - Shows company details with "Edit" and "Cancel" options
    - Inline editing with Cancel reverting to original values
  - Option to select `Other` to add a new company
    - Form for name, image, founder, size, website, and more

---
