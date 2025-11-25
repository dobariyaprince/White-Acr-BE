const Projects = require("../../model/projects");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");
const { Types } = require("mongoose");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { projectId } = req.params || {};

    let data;
    if (projectId) {
      if (!Types.ObjectId.isValid(projectId)) {
        return Response.error({
          req,
          res,
          status: STATUS_CODE.BAD_REQUEST,
          msg: "Invalid project id",
        });
      }
      data = await Projects.findById(projectId);
    } else {
      data = await Projects.find().sort({ createdAt: -1 });
    }

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: data || (projectId ? {} : []),
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
