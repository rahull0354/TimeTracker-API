# Freelancer Time Tracker API - Development Roadmap

## Project Overview
A RESTful API to help freelancers track time spent on projects and generate work summaries.

---

## Data Models Structure

You'll need **3 main models** for this project:

### 1. User Model
For authentication and user management

**Fields to include:**
- `username` - String, required, unique (for login)
- `email` - String, required, unique (for contact)
- `password` - String, required (will be hashed with bcryptjs)
- `fullName` - String (optional, for display)
- `createdAt` - Date (auto-generated)
- `updatedAt` - Date (auto-generated)

**Key points:**
- Use mongoose's `pre-save` hook to hash password before saving
- Use `bcryptjs` library (already installed) for hashing
- Don't store plain passwords!

---

### 2. Project Model
To store project information

**Fields to include:**
- `name` - String, required (e.g., "Website Redesign")
- `description` - String (optional, project details)
- `clientName` - String (optional, who is it for?)
- `hourlyRate` - Number (optional, for billing calculations)
- `status` - String, default: "active" (can be: active, completed, archived)
- `user` - ObjectId (reference to User who owns this project)
- `createdAt` - Date (auto-generated)
- `updatedAt` - Date (auto-generated)

**Key points:**
- This is a **one-to-many** relationship: One user can have many projects
- Use `ref: 'User'` to create the relationship

---

### 3. TimeEntry Model
To log time spent on projects

**Fields to include:**
- `project` - ObjectId (reference to Project, required)
- `user` - ObjectId (reference to User, required)
- `description` - String, required (what work was done?)
- `duration` - Number, required (time in minutes)
- `startTime` - Date, required (when did work start?)
- `endTime` - Date, required (when did work end?)
- `date` - Date (for easy querying by date)
- `createdAt` - Date (auto-generated)
- `updatedAt` - Date (auto-generated)

**Key points:**
- This links to both User and Project (many-to-one relationships)
- Store duration in minutes for easier calculations
- Keep both startTime and endTime for accuracy

---

## Model Relationships

```
User (1) ──────┬──────> (Many) Projects
              │
              └──────> (Many) TimeEntries

Project (1) ───────> (Many) TimeEntries
```

---

## Development Roadmap

### Phase 1: Foundation (Current Setup)
**Difficulty:** Easy
**Estimated Time:** 2-3 hours

**Libraries already installed:**
- [x] `express` - Web framework
- [x] `mongoose` - MongoDB ORM
- [x] `dotenv` - Environment variables
- [x] `bcryptjs` - Password hashing
- [x] `jsonwebtoken` - JWT authentication
- [x] `cors` - Enable cross-origin requests
- [x] `cookie-parser` - Parse cookies
- [x] `nodemon` - Auto-restart server

**Tasks:**
1. [ ] Set up database connection in `index.js`
2. [ ] Create folder structure: `models/`, `controllers/`, `routes/`, `middleware/`
3. [ ] Create the 3 models (User, Project, TimeEntry)
4. [ ] Test models in MongoDB Compass or using console

**Learning Focus:**
- Understanding Mongoose schemas
- MongoDB connections
- Basic Node.js/Express setup

---

### Phase 2: User Authentication
**Difficulty:** Easy
**Estimated Time:** 3-4 hours

**Additional libraries needed:**
```bash
npm install express-validator
```

**Tasks:**
1. [ ] Create auth routes (register, login)
2. [ ] Create auth controller
3. [ ] Create middleware to protect routes (`verifyToken`)
4. [ ] Implement JWT token generation
5. [ ] Test with Postman or Thunder Client

**API Endpoints to Create:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user and get token

**Learning Focus:**
- Password hashing with bcrypt
- JWT token creation and verification
- Middleware pattern in Express
- Request validation

---

### Phase 3: Project Management
**Difficulty:** Easy
**Estimated Time:** 2-3 hours

**Additional libraries needed:**
- None (use existing)

**Tasks:**
1. [ ] Create project routes (CRUD operations)
2. [ ] Create project controller
3. [ ] Implement: Create, Read (all & by id), Update, Delete projects
4. [ ] Add authentication middleware to protect routes
5. [ ] Test endpoints

**API Endpoints to Create:**
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all user's projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Learning Focus:**
- RESTful API design
- CRUD operations
- Working with referenced documents
- Authentication middleware usage

---

### Phase 4: Time Logging
**Difficulty:** Easy
**Estimated Time:** 3-4 hours

**Additional libraries needed:**
- None (use existing)

**Tasks:**
1. [ ] Create timeEntry routes
2. [ ] Create timeEntry controller
3. [ ] Implement: Log time, Get entries (by project, by date range), Update, Delete
4. [ ] Add validation for time entries (endTime > startTime)
5. [ ] Test endpoints

**API Endpoints to Create:**
- `POST /api/time-entries` - Log time entry
- `GET /api/time-entries` - Get all user's time entries
- `GET /api/time-entries/:id` - Get single time entry
- `GET /api/time-entries/project/:projectId` - Get entries by project
- `GET /api/time-entries/date-range?start=&end=` - Get entries by date range
- `PUT /api/time-entries/:id` - Update time entry
- `DELETE /api/time-entries/:id` - Delete time entry

**Learning Focus:**
- Query parameters handling
- Date manipulation in JavaScript
- More complex MongoDB queries
- Validating time data

---

### Phase 5: Summary Reports
**Difficulty:** Medium
**Estimated Time:** 3-4 hours

**Additional libraries needed:**
- None initially

**Tasks:**
1. [ ] Create report routes
2. [ ] Create report controller
3. [ ] Implement:
   - Total hours per project
   - Total hours for date range
   - Daily/weekly/monthly summaries
4. [ ] Add aggregation queries using MongoDB pipeline
5. [ ] Test with different date ranges

**API Endpoints to Create:**
- `GET /api/reports/project-hours` - Total hours per project
- `GET /api/reports/daily-summary?date=` - Summary for specific day
- `GET /api/reports/weekly-summary?start=` - Summary for a week
- `GET /api/reports/monthly-summary?month=&year=` - Summary for a month
- `GET /api/reports/custom-range?start=&end=` - Custom date range summary

**Learning Focus:**
- MongoDB aggregation pipeline
- Date range queries
- Grouping and summarizing data
- Complex data transformations

---

### Phase 6: Export Functionality
**Difficulty:** Easy
**Estimated Time:** 2-3 hours

**Additional libraries needed:**
```bash
npm install json2csv
# Optional for more formats:
npm install pdfkit exceljs
```

**Tasks:**
1. [ ] Add export endpoint
2. [ ] Generate CSV reports
3. [ ] Optionally add PDF/Excel export
4. [ ] Add proper headers for file downloads
5. [ ] Test file downloads

**API Endpoints to Create:**
- `GET /api/reports/export/csv?start=&end=` - Export to CSV
- `GET /api/reports/export/pdf?start=&end=` - Export to PDF (optional)
- `GET /api/reports/export/excel?start=&end=` - Export to Excel (optional)

**Learning Focus:**
- File generation in Node.js
- Setting response headers for downloads
- Data formatting for exports

---

### Phase 7: Advanced Features (Optional)
**Difficulty:** Medium
**Estimated Time:** 4-6 hours

**Additional libraries:**
```bash
npm install helmet express-rate-limit morgan
npm install --save-dev jest supertest
```

**Tasks:**
1. [ ] Add input validation middleware
2. [ ] Add rate limiting to prevent abuse
3. [ ] Add HTTP request logging
4. [ ] Write unit tests with Jest
5. [ ] Deploy to Render/Railway/Heroku

**Security Enhancements:**
- Rate limiting with `express-rate-limit`
- Security headers with `helmet`
- Request logging with `morgan`
- Environment variable validation
- Input sanitization

**Learning Focus:**
- API security best practices
- Testing with Jest
- Deployment process
- Production considerations

---

## Complete Library List

### Already Installed
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.4",
  "dotenv": "^17.2.3",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.3",
  "cors": "^2.8.6",
  "cookie-parser": "^1.4.7",
  "nodemon": "^3.1.11"
}
```

### To Install (Phase by Phase)

**Phase 2:**
```bash
npm install express-validator
```

**Phase 6:**
```bash
npm install json2csv
# Optional:
npm install pdfkit exceljs
```

**Phase 7:**
```bash
npm install helmet express-rate-limit morgan
npm install --save-dev jest supertest
```

---

## Project Structure (Recommended)

```
freelancer-time-tracker/
├── models/
│   ├── User.js
│   ├── Project.js
│   └── TimeEntry.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── timeEntryController.js
│   └── reportController.js
├── routes/
│   ├── auth.js
│   ├── projects.js
│   ├── timeEntries.js
│   └── reports.js
├── middleware/
│   ├── auth.js
│   ├── validateRequest.js
│   └── errorHandler.js
├── config/
│   └── db.js
├── utils/
│   └── helpers.js
├── index.js
├── .env
├── .gitignore
└── package.json
```

---

## Development Tips

1. **Start Simple**: Don't try to build everything at once. Follow the phases sequentially.

2. **Test Each Phase**: Use Postman, Thunder Client (VS Code extension), or Insomnia to test your APIs after each phase.

3. **Use MongoDB Compass**: Visualize your data to ensure it's being stored correctly.

4. **Version Control**: Commit after completing each phase with meaningful messages.

5. **Error Handling**: Add proper try-catch blocks and meaningful error messages.

6. **Documentation**: Document your API endpoints as you build them.

7. **Console Logging**: Use `console.log()` during development to understand data flow (remove in production).

---

## Common Issues & Solutions

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check your `.env` file has correct connection string

### JWT Authentication Not Working
- Verify `JWT_SECRET` is set in `.env`
- Check token is being sent in headers: `Authorization: Bearer <token>`

### Date Queries Not Working
- Store dates in ISO format
- Use JavaScript `Date` object for consistency
- Remember MongoDB stores dates in UTC

---

## Testing Checklist

After completing each phase, test:

- [ ] Can create new user account?
- [ ] Can login and receive JWT token?
- [ ] Protected routes reject requests without token?
- [ ] Can create/read/update/delete projects?
- [ ] Can log time entries?
- [ ] Can filter time entries by date?
- [ ] Can generate summary reports?
- [ ] Can export data as CSV?

---

## Next Steps

1. **Start with Phase 1** - Create the models one by one
2. **Use Mongoose Schema** - Define fields, types, and validation
3. **Test in MongoDB** - Check if data saves correctly
4. **Move to Phase 2** - Once models work, add authentication
5. **Build incrementally** - Complete one phase before moving to the next

---

## Additional Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Best Practices](https://jwt.io/introduction)
- [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [REST API Design Best Practices](https://restfulapi.net/)

---

**Good luck with your project! Remember: Build incrementally, test thoroughly, and don't hesitate to ask for help when stuck.**
