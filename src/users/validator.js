import passwordStrengthValidator from 'password-validator'
import { Joi } from 'express-validation'

const validatePasswordStrength = (password) => {
  const schema = new passwordStrengthValidator()
  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(32)                                  // Maximum length 32
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit

  return schema.validate(password)
}

export default  {
  create: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().custom((password, helper) => {
        if (!validatePasswordStrength(password)) {
          return helper.message('Password must be 8 to 32 characters long, and it must contain at least a lowercase letter, an uppercase letter, and a digit.')
        }

        return true
      }).required(),
    }),
  },
}
