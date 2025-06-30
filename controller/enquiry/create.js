const Enquiry = require("../../model/enquiry");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
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
