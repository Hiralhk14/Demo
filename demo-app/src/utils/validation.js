// Common validation handler for forms
export function validateEmail(email) {
  if (!email?.trim()) return { isValid: false, message: "Email is required" };
  if (!email.includes("@") || !email.includes("."))
    return { isValid: false, message: "Please enter a valid email address" };
  return { isValid: true, message: "" };
}

export function validatePassword(password, minLength = 8) {
  if (!password?.trim()) return { isValid: false, message: "Password is required" };
  if (password.length < minLength)
    return { isValid: false, message: `Password must be at least ${minLength} characters` };
  return { isValid: true, message: "" };
}

export function validateName(name, minLength = 2) {
  if (!name?.trim()) return { isValid: false, message: "Name is required" };
  if (name.trim().length < minLength)
    return { isValid: false, message: `Name must be at least ${minLength} characters` };
  return { isValid: true, message: "" };
}

export function validateDepartment(department, minLength = 2) {
  if (!department?.trim()) return { isValid: false, message: "Department is required" };
  if (department.trim().length < minLength)
    return { isValid: false, message: `Department must be at least ${minLength} characters` };
  return { isValid: true, message: "" };
}

// validation function 
export function validateForm(formData, rules) {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    let result = { isValid: true, message: "" };

    switch (rule.type) {
      case 'email':      result = validateEmail(value); break;
      case 'password':   result = validatePassword(value, rule.minLength); break;
      case 'name':       result = validateName(value, rule.minLength); break;
      case 'department': result = validateDepartment(value, rule.minLength); break;
    }

    if (!result.isValid) errors[field] = result.message;
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Login form validation rules
export const loginValidationRules = {
  email:    { type: 'email' },
  password: { type: 'password', minLength: 8 }
};

// Registration form validation rules
export const registrationValidationRules = {
  name:       { type: 'name', minLength: 3 },
  email:      { type: 'email' },
  password:   { type: 'password', minLength: 8 },
  department: { type: 'department', minLength: 3 }
};

// employee form validation rules
export const employeeValidationRules = {
  name:       { type: 'name', minLength: 3 },
  email:      { type: 'email' },
  password:   { type: 'password', minLength: 8 },
  department: { type: 'department', minLength: 3 }
};