const Home = require("../../model/home");
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

    const getFilePathsArray = (fieldname) =>
      files.filter((f) => f.fieldname === fieldname).map((f) => `/uploads/${f.filename}`);

    const parseJSON = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val || [];
      } catch {
        return [];
      }
    };

    const sections = parseJSON(body.sections);
    const projects = parseJSON(body.projects);
    const socialSection = parseJSON(body.socialSection);

    const banner = getFilePath("banner");

    if (Array.isArray(sections)) {
      sections.forEach((sec, i) => {
        sec.image = getFilePath(`sections[${i}][image]`);
      });
    }

    if (Array.isArray(projects)) {
      projects.forEach((project, pIdx) => {
        if (Array.isArray(project.testimonials)) {
          project.testimonials.forEach((testimonial, tIdx) => {
            const multiImages = getFilePathsArray(`projects[${pIdx}][testimonials][${tIdx}][img][]`);
            if (multiImages.length) {
              testimonial.img = multiImages;
            } else {
              const singleImage = getFilePath(`projects[${pIdx}][testimonials][${tIdx}][img]`);
              testimonial.img = singleImage ? [singleImage] : [];
            }
          });
        }
      });
    }

    if (Array.isArray(socialSection)) {
      socialSection.forEach((sec, i) => {
        sec.post = getFilePath(`socialSection[${i}][post]`);
      });
    }

    const payload = {
      banner,
      sections,
      projects,
      socialSection,
    };

    const existing = await Home.findOne();
    const result = existing
      ? await Home.findByIdAndUpdate(existing._id, payload, { new: true })
      : await Home.create(payload);

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
