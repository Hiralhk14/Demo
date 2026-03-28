export const STORAGE_KEYS = {
    employees: 'ems_employees',
    loggedInUser: 'ems_logged_in_user',
}

export const EMPLOYEE_STATUS = {
    pending: 'Pending',
    active: 'active',
    blocked: 'blocked',
}

export const DEFAULT_ADMIN = {
    id: 1,
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin123',
    status: EMPLOYEE_STATUS.active,
    role: 'admin',
}