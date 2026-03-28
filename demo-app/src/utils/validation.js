// Validation utilities for form fields

// Email validation - check format and required
export function validateEmail(email) {
  if (!email?.trim()) return "Email is required";
  if (!email.includes("@") || !email.includes(".")) return "Please enter a valid email address";
  return "";
}

// Password validation - check length and required
export function validatePassword(password, minLength = 6) {
  if (!password?.trim()) return "Password is required";
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  return "";
}

// Name validation - check length and required
export function validateName(name, minLength = 2) {
  if (!name?.trim()) return "Name is required";
  if (name.trim().length < minLength) return `Name must be at least ${minLength} characters`;
  return "";
}

// Department validation - check length and required
export function validateDepartment(department, minLength = 2) {
  if (!department?.trim()) return "Department is required";
  if (department.trim().length < minLength) return `Department must be at least ${minLength} characters`;
  return "";
}

// Main form validation - handles all scenarios
export function validateForm(formData, rules) {
  const errors = {};
  let hasError = false;
  
  // Validate each field
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    let result = { isValid: true, message: "" };
    
    switch (rule.type) {
      case 'email':
        result = { isValid: !validateEmail(value), message: validateEmail(value) };
        break;
      case 'password':
        result = { isValid: !validatePassword(value, rule.minLength), message: validatePassword(value, rule.minLength) };
        break;
      case 'name':
        result = { isValid: !validateName(value, rule.minLength), message: validateName(value, rule.minLength) };
        break;
      case 'department':
        result = { isValid: !validateDepartment(value, rule.minLength), message: validateDepartment(value, rule.minLength) };
        break;
    }
    
    if (!result.isValid) {
      errors[field] = result.message;
      hasError = true;
    }
  });
  
  return {
    isValid: !hasError,
    errors,
    hasError
  };
}
