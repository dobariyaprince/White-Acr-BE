const WhiteArc = require("../../model/whiteArc");
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
    const sections = parseJSON(body.sections);
    const projects = parseJSON(body.projects);
    const socialSection = parseJSON(body.socialSection);

    if (Array.isArray(sections)) {
      sections.forEach((section, i) => {
        section.image = getFilePath(`sections[${i}][image]`);
      });
    }

    if (Array.isArray(projects)) {
      projects.forEach((project, i) => {
        project.img = getFilePath(`projects[${i}][img]`);
      });
    }

    if (Array.isArray(socialSection)) {
      socialSection.forEach((social, i) => {
        social.post = getFilePath(`socialSection[${i}][post]`);
      });
    }

    const payload = {
      banner,
      sections,
      projects,
      socialSection,
    };

    const existing = await WhiteArc.findOne();
    const result = existing
      ? await WhiteArc.findByIdAndUpdate(existing._id, payload, { new: true })
      : await WhiteArc.create(payload);

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
