const Projects = require("../../model/projects");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");
const { Types } = require("mongoose");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { projectId } = req.params;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: "Valid project ID is required",
      };
      return Response.error(obj);
    }

    const project = await Projects.findById(projectId);
    if (!project) {
      const obj = {
        res,
        status: STATUS_CODE.NOT_FOUND,
        msg: "Project not found",
      };
      return Response.error(obj);
    }

    await Projects.findByIdAndDelete(projectId);

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: "Project deleted successfully",
      data: null,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
