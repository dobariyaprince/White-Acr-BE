const Joi = require("joi");

/**
 * validating options for Joi
 */
const options = {
  abortEarly: false,
};

const email = (value, helper) => {
  const domain = value.split("@");
  if (domain[1] === `yopmail.com`) {
    return helper.error("any.invalid");
  }
  return value;
};

// const passwordSchema = Joi.string()
//   .empty()
//   .required()
//   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
//     name: "required",
//   })
//   .message(
//     `Enter a password with minimum one upper case, lower case and number, ranging from 8-15 characters`
//   )
//   .min(8)
//   .max(15)
//   .messages({
//     "string.base": `Enter a password with minimum one upper case, lower case and number, ranging from 8-15 characters`,
//     "string.empty": `Password is required`,
//     "string.min": `Password must have a minimum of {#limit} characters`,
//     "string.max": `Password can have a maximum of {#limit} characters`,
//     "any.required": `Password is required`,
//   });
const passwordSchema = Joi.string().empty().required().messages({
  "string.empty": `Password is required`,
  "any.required": `Password is required`,
});

// const mobileSchema = Joi.number()
//   .integer()
//   .empty()
//   .min(1000000000)
//   .max(9999999999)
//   .required()
//   .messages({
//     "number.base": `Mobile number must be a number`,
//     "number.empty": `Mobile number is required`,
//     "number.integer": `Mobile number must be an integer`,
//     "number.min": `Mobile number must be at least 10 digits long`,
//     "number.max": `Mobile number cannot exceed 10 digits`,
//     "any.required": `Mobile number is required`,
//   });

const mobileSchema = Joi.number().integer().required().messages({
  "number.base": `Mobile number must be a number`,
  "number.empty": `Mobile number is required`,
  "number.integer": `Mobile number must be an integer`,
  "any.required": `Mobile number is required`,
});

const emailSchema = Joi.string()
  .empty()
  .custom(email, "custom validation")
  .message("Invalid Email")
  .email({ tlds: { allow: true } })
  .max(256)
  .required()
  .messages({
    "string.base": `Enter your email address in format: yourname@example.com`,
    "string.email": `Enter your email address in format: yourname@example.com`,

    "string.empty": `Email is required`,
    "string.min": `Email must have minimum of {#limit} characters`,
    "string.max": `Email can have maximum of {#limit} characters`,
    "any.required": `Email is required`,
    "any.invalid": `Invalid Email`,
  });
const emailPasswordSchema = Joi.object()
  .keys({
    email: emailSchema,
    password: passwordSchema,
  })
  .unknown(true);

const emailVerifySchema = Joi.object().keys({
  otp: Joi.string().empty().messages({
    "string.base": `otp must be a type of string`,
    "string.empty": `otp is required`,
    "string.min": `otp must have minimum of {#limit} characters`,
    "string.max": `otp can have maximum  of {#limit} characters`,
    "any.required": `otp is required`,
    "any.optional": `otp is optional`,
  }),
  email: emailSchema,
});

const companyNameSchema = Joi.string().max(150).required().messages({
  "string.base": `Company name must be a string`,
  "string.max": `Company name cannot exceed {#limit} characters`,
  "any.required": `Company name is required`,
});

const contactNameSchema = Joi.string().max(150).required().messages({
  "string.base": `Contact name must be a string`,
  "string.max": `Contact name cannot exceed {#limit} characters`,
  "any.required": `Contact name is required`,
});

const contactNumberSchema = Joi.string()
  .pattern(/^(?:\+?[1-9]\d{1,14}|[0-9]{10})$/) // Supports international and national formats
  .required()
  .messages({
    "string.pattern.base": `Contact number must be a valid national (10 digits) or international format (+1234567890)`,
    "any.required": `Contact number is required`,
  });

// --------------
// !-*-*-*-*-*-*-*-*-*-*-!
// --------------

const commercialReferenceSchema = Joi.object({
  companyName: Joi.string().required().messages({
    "any.required": "Company name for the commercial reference is required",
    "string.empty": "Company name for the commercial reference is required",
  }),
  contactName: Joi.string().required().messages({
    "any.required": "Contact name for the commercial reference is required",
    "string.empty": "Contact name for the commercial reference is required",
  }),
  emailAddress: Joi.string().email().required().messages({
    "string.email":
      "A valid email address is required for the commercial reference",
    "any.required": "Email address for the commercial reference is required",
    "string.empty": "Email address for the commercial reference is required",
  }),
  countryCode: Joi.string().pattern(/^\d+$/).required().messages({
    "string.pattern.base":
      "Country code for the commercial reference must be numeric",
    "any.required": "Country code for the commercial reference is required",
    "string.empty": "Country code for the commercial reference is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number for the commercial reference is required",
    "string.empty": "Contact number for the commercial reference is required",
  }),
}).optional();

const uNameSchema = Joi.string().max(150).required().messages({
  "string.base": `User name must be a string`,
  "string.max": `User name cannot exceed {#limit} characters`,
  "any.required": `User name is required`,
});

const signUpSchema = Joi.object().keys({
  uName: uNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPass: passwordSchema,
});

const emailVerify = Joi.object().keys({
  email: emailSchema,
});

const loginWithEmailSchema = Joi.object()
  .keys({
    email: emailSchema,
    password: passwordSchema,
  })
  .unknown(true);

const GoogleSchema = Joi.object().keys({
  tokenId: Joi.string().empty().required().messages({
    "string.base": `token must be a type of string`,
    "string.empty": `token is required `,
    "string.min": `token must have minimum of {#limit} characters`,
    "string.max": `token can have maximum  of {#limit} characters`,
    "any.required": `token is required `,
    "any.optional": `token is optional `,
  }),
});

// Function

const projectSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    "any.required": "Project title is required",
    "string.empty": "Project title is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Project description is required",
    "string.empty": "Project description is required",
  }),
  type: Joi.string().required().messages({
    "any.required": "Project type is required",
    "string.empty": "Project type is required",
  }),
  location: Joi.string().required().messages({
    "any.required": "Project location is required",
    "string.empty": "Project location is required",
  }),
  completionDate: Joi.number().required().messages({
    "any.required": "Completion date is required",
    "number.base": "Completion date must be a number",
  }),
  images: Joi.array().items(Joi.string()).optional(),
});

const enquirySchema = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),
  email: emailSchema,
  phone: Joi.string().required().messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number is required",
  }),
  siteLocation: Joi.string().required().messages({
    "any.required": "Site location is required",
    "string.empty": "Site location is required",
  }),
  projectType: Joi.string().required().messages({
    "any.required": "Project type is required",
    "string.empty": "Project type is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description is required",
  }),
});

const signUpSchemaValidate = (data) => {
  return signUpSchema.validate({ ...data }, options);
};

const projectValidate = (data) => {
  return projectSchema.validate({ ...data }, options);
};

const enquiryValidate = (data) => {
  return enquirySchema.validate({ ...data }, options);
};

const emailAndPasswordVerification = (data) => {
  return emailPasswordSchema.validate(data, options);
};

const registerWithEmail = (data) => {
  return emailPasswordSchema.validate(data, options);
};
const tokenVerification = (data) => {
  return emailVerifySchema.validate(data, options);
};
const emailVerification = (data) => {
  return emailVerify.validate(data, options);
};
const adminLogin = (data) => {
  return loginWithEmailSchema.validate(data, options);
};

const mobileVerification = (data) => {
  return mobileSchema.validate(data.mobile, options);
};
const validateResetPassword = (data) => {
  return passwordSchema.validate(data.password, options);
};

const google = (data) => {
  return GoogleSchema.validate(data, options);
};

module.exports = {
  emailAndPasswordVerification,
  registerWithEmail,
  tokenVerification,
  emailVerification,
  validateResetPassword,
  google,
  mobileVerification,
  adminLogin,
  signUpSchemaValidate,
  projectValidate,
  enquiryValidate,
};
