const Enquiry = require("../../model/enquiry");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: enquiries,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
