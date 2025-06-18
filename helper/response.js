const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("./constant");

const response = {
  statusCode: STATUS_CODE.OK,
  msg: INFO_MSGS.SUCCESS,
  errorMessage: ERROR_MSGS.INTERNAL_SERVER_ERROR,
  success: async function ({ res, status, msg, data, total_count }) {
    const isSuccessful =
      (status || this.statusCode) >= 200 && (status || this.statusCode) < 300;

    if (!data) {
      this.statusCode = STATUS_CODE.NO_CONTENT;
    }

    // logToFile(
    //   "success",
    //   res.req.originalUrl,
    //   status || this.statusCode,
    //   msg || this.msg
    // );

    return res.status(status || this.statusCode).json({
      status: isSuccessful, // true if 200-299, false otherwise
      statusCode: status || this.statusCode,
      msg: msg || this.msg,
      total_count: total_count,
      data: data,
    });
  },
  error: async function ({ res, status, msg, data }) {
    const isSuccessful =
      (status || this.statusCode) >= 200 && (status || this.statusCode) < 300;

    // logToFile(
    //   "error",
    //   res.req.originalUrl,
    //   status || this.statusCode,
    //   msg || this.msg
    // );

    return res.status(status || 400).json({
      status: isSuccessful,
      statusCode: status || 400,
      msg: msg || this.errorMessage,
      data: data,
    });
  },
};

module.exports = response;
