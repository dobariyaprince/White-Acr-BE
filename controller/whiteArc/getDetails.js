const WhiteArc = require("../../model/whiteArc");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const data = await WhiteArc.findOne();

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: data || {},
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
