const Enquiry = require("../../model/enquiry");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");
const { enquiryValidate } = require("../../helper/joi-validation");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { error } = enquiryValidate(req.body);
    if (error) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: error.details[0].message,
      };
      return Response.error(obj);
    }

    const payload = req.body;

    const newEnquiry = await Enquiry.create(payload);

    return Response.success({
      req,
      res,
      status: STATUS_CODE.CREATED,
      msg: INFO_MSGS.CREATED,
      data: newEnquiry,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
