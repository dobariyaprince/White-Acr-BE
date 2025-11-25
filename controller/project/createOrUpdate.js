const Projects = require("../../model/projects");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");
const { Types } = require("mongoose");
const { projectValidate } = require("../../helper/joi-validation");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { error } = projectValidate(req.body);
    if (error) {
      const obj = {
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: error.details[0].message,
      };
      return Response.error(obj);
    }

    const { body, files = [] } = req;

    const uploadedImages = files
      .filter((f) => f.fieldname === "images")
      .map((f) => f.location); // S3 returns location property with the URL

    const coerceArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try {
        const parsed = typeof val === "string" ? JSON.parse(val) : val;
        return Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
      } catch {
        return [val];
      }
    };

    const existingImagePaths = coerceArray(body.images);

    const payload = {
      title: body.title,
      description: body.description,
      type: body.type,
      completionDate: parseInt(body.completionDate),
      images: [...existingImagePaths, ...uploadedImages].filter(Boolean),
    };

    let result;
    if (body.id && Types.ObjectId.isValid(body.id)) {
      result = await Projects.findByIdAndUpdate(body.id, payload, { new: true });
    } else {
      result = await Projects.create(payload);
    }

    return Response.success({
      req,
      res,
      status: STATUS_CODE.OK,
      msg: INFO_MSGS.SUCCESS,
      data: result,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};
