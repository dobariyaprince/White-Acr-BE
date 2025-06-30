const Enquiry = require("../../model/enquiry");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS, ERROR_MSGS } = require("../../helper/constant");
const { Types } = require("mongoose");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { enquiryId } = req.params;

    if (!Types.ObjectId.isValid(enquiryId)) {
      return Response.error({
        req,
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.INVALID_ID,
      });
    }

    const data = await Enquiry.findById(enquiryId);

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: data ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND,
      data: data || {},
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
