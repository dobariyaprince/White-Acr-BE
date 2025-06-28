const ContactUs = require("../../model/contactUs");
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

    const banner = getFilePath("banner");
    const description = body.description || null;

    const contactDetails = {
      address: body["contactDetails.address"] || null,
      phone: body["contactDetails.phone"] || null,
      email: body["contactDetails.email"] || null,
      mapEmbedUrl: body["contactDetails.mapEmbedUrl"] || null,
    };

    const formFields = [];

    const formFieldCount = Object.keys(body)
      .filter((key) => key.startsWith("formFields[") && key.endsWith("][label]"))
      .length;

    for (let i = 0; i < formFieldCount; i++) {
      formFields.push({
        label: body[`formFields[${i}][label]`] || null,
        name: body[`formFields[${i}][name]`] || null,
        placeholder: body[`formFields[${i}][placeholder]`] || null,
        type: body[`formFields[${i}][type]`] || "text",
        required: body[`formFields[${i}][required]`] === "true",
      });
    }

    const payload = {
      banner,
      description,
      contactDetails,
      formFields,
    };

    const existing = await ContactUs.findOne();
    const result = existing
      ? await ContactUs.findByIdAndUpdate(existing._id, payload, { new: true })
      : await ContactUs.create(payload);

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
