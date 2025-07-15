# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-07-15

### Added
- Role-based access control with hierarchical roles (Admin, Manager, Supervisor, Employee).
- Department and subdepartment structure integrated into database and backend.
- Employee management updated to include department assignment.
- Shift management enhanced with department-based visibility and permissions.
- Frontend forms updated for creating employees with department selection.
- Schedule page enhanced to filter employees by department and restrict shift creation/editing based on roles.
- JWT authentication updated to include hierarchy level in the token.
- Protected routes and role protection components added on frontend.
- Backend middleware added for role authorization and token verification.
- Departments API endpoints created with secure access.
- User dashboard updated to display user's department information.
- Secure password hashing and user registration improved.
- Environment variables configured for API URL and JWT secret.
- CORS configured for frontend-backend communication.

### Fixed
- Bug fixing in token generation to support ES module imports.
- Error handling improved across controllers.
- Frontend permissions fixed to prevent unauthorized UI actions.
- Corrected database schema to include foreign key constraints for departments.
- UI adjustments on Schedule and User Creation pages for better UX.

### Changed
- Backend routes reorganized for scalability (added department routes).
- Employee queries now support filtering by department.
- Shift queries modified to limit data based on user roles and departments.
- Frontend state management enhanced with React hooks to manage user and token data.

---

## How to update

1. Pull the latest changes from the `feature/roles-and-departments` branch.
2. Run migrations or update your database schema to add departments and their relations.
3. Update your `.env` files with the correct API URLs and secrets.
4. Restart backend and frontend servers.
5. Test role-based features and department assignments thoroughly.

---

## Notes

This update focuses on enhancing the multi-department, multi-role architecture of Shiftwello to better fit complex organizational structures such as hotels with various operational areas.
