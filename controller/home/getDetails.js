const Home = require("../../model/home");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS, ERROR_MSGS } = require("../../helper/constant");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const home = await Home.findOne();

    return Response.success({
      req,
      res,
      status: home ? STATUS_CODE.OK : STATUS_CODE.NOT_FOUND,
      msg: home ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND,
      data: home,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
