const AboutUs = require("../../model/aboutUs");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { STATUS_CODE, INFO_MSGS } = require("../../helper/constant");

module.exports = async (req, res) => {
  const { logger } = req;
  try {
    const { body, files = [] } = req;

    const getFilePath = (fieldname) => {
      const file = files.find((f) => f.fieldname === fieldname);
      return file ? `/uploads/${file.filename}` : null;
    };

    const parseJSON = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val || [];
      } catch {
        return [];
      }
    };

    const banner = getFilePath("banner");
    const intro = body.intro || null;
    const sections = parseJSON(body.sections);

    if (Array.isArray(sections)) {
      sections.forEach((section, i) => {
        section.image = getFilePath(`sections[${i}][image]`);
      });
    }

    const payload = { banner, intro, sections };

    const existing = await AboutUs.findOne();
    const result = existing
      ? await AboutUs.findByIdAndUpdate(existing._id, payload, { new: true })
      : await AboutUs.create(payload);

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
