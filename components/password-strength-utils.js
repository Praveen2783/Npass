const COMMON_PASSWORDS = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "abc123",
  "password123",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "1234567890",
  "iloveyou",
  "princess",
  "rockyou",
  "12345678",
  "sunshine",
  "password1",
  "football",
]

// Common patterns to avoid
const WEAK_PATTERNS = [
  /^(.)\1+$/, // All same character
  /^(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i, // Sequential
  /^(qwe|asd|zxc)/i, // Keyboard patterns
]

/**
 * Analyzes password strength and returns detailed results
 * @param {string} password - The password to analyze
 * @returns {Object} Analysis results with score, strength, feedback, and character checks
 */
export function analyzePasswordStrength(password) {
  const result = {
    score: 0,
    strength: "very-weak",
    feedback: [],
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password),
    length: password.length,
    isCommon: COMMON_PASSWORDS.includes(password.toLowerCase()),
  }

  // Check length
  if (password.length < 6) {
    result.feedback.push("Password is too short (minimum 6 characters)")
  } else if (password.length < 8) {
    result.feedback.push("Password should be at least 8 characters long")
    result.score += 1
  } else if (password.length < 12) {
    result.score += 2
  } else {
    result.score += 3
  }

  // Check character variety
  let varietyScore = 0
  if (result.hasLowercase) varietyScore++
  if (result.hasUppercase) varietyScore++
  if (result.hasNumbers) varietyScore++
  if (result.hasSymbols) varietyScore++

  result.score += varietyScore

  // Provide feedback for missing character types
  if (!result.hasLowercase) result.feedback.push("Add lowercase letters")
  if (!result.hasUppercase) result.feedback.push("Add uppercase letters")
  if (!result.hasNumbers) result.feedback.push("Add numbers")
  if (!result.hasSymbols) result.feedback.push("Add symbols (!@#$%^&* etc.)")

  // Check for common passwords
  if (result.isCommon) {
    result.feedback.push("This is a commonly used password")
    result.score = Math.max(0, result.score - 2)
  }

  // Check for weak patterns
  const hasWeakPattern = WEAK_PATTERNS.some((pattern) => pattern.test(password))
  if (hasWeakPattern) {
    result.feedback.push("Avoid predictable patterns")
    result.score = Math.max(0, result.score - 1)
  }

  // Determine strength level
  if (result.score <= 2) {
    result.strength = "very-weak"
  } else if (result.score <= 4) {
    result.strength = "weak"
  } else if (result.score <= 6) {
    result.strength = "medium"
  } else if (result.score <= 8) {
    result.strength = "strong"
  } else {
    result.strength = "very-strong"
  }

  // Add positive feedback for strong passwords
  if (result.score >= 7 && result.feedback.length === 0) {
    result.feedback.push("Strong password!")
  }

  return result
}

/**
 * Gets the appropriate badge color variant for password strength
 * @param {string} strength - The strength level
 * @returns {string} Badge variant
 */
export function getStrengthColor(strength) {
  switch (strength) {
    case "very-weak":
    case "weak":
      return "destructive"
    case "medium":
      return "secondary"
    case "strong":
    case "very-strong":
      return "default"
    default:
      return "outline"
  }
}

/**
 * Gets the display label for password strength
 * @param {string} strength - The strength level
 * @returns {string} Display label
 */
export function getStrengthLabel(strength) {
  switch (strength) {
    case "very-weak":
      return "Very Weak"
    case "weak":
      return "Weak"
    case "medium":
      return "Medium"
    case "strong":
      return "Strong"
    case "very-strong":
      return "Very Strong"
    default:
      return "Unknown"
  }
}
