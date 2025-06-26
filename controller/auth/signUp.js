const Admin = require("../../model/admin");
const { handleException } = require("../../helper/exception");
const { encrypt, decrypt } = require("../../helper/encrypt-decrypt");
const Response = require("../../helper/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helper/constant");

/**
 * Register a new admin with email and password
 */
const signUp = async (req, res) => {
  const { logger, body } = req;
  try {
    const { email, password } = body;
    const adminEmailExist = await Admin.findOne({
      email: email,
    });
    if (adminEmailExist) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.ACCOUNT_EXISTS,
      };
      return Response.error(obj);
    }

    const passwordHash = encrypt(password, process.env.PASSWORD_ENCRYPTION_KEY);

    body.password = passwordHash;
    await Admin.create(body);

    const obj = {
      res,
      status: STATUS_CODE.CREATED,
      msg: INFO_MSGS.SUCCESSFUL_REGISTER,
    };
    return Response.success(obj);
  } catch (error) {
    console.log("error--->", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  signUp,
};
