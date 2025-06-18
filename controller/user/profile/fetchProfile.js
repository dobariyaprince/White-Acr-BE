const User = require("../../../model/user/user");
const { handleException } = require("../../../helper/exception");
const Response = require("../../../helper/response");
const { ObjectId } = require("mongoose").Types;
const {
  STATUS_CODE,
  ERROR_MSGS,
  INFO_MSGS,
} = require("../../../helper/constant");

const fetchProfile = async (req, res) => {
  let { logger, userId } = req;
  try {
    let getData = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "references",
          localField: "_id",
          foreignField: "clientRelationId",
          as: "commercialReference",
        },
      },
      {
        $project: {
          __v: 0,
          password: 0,
          forgotPassword: 0,
          token: 0,
          "commercialReference.__v": 0,
          "commercialReference.createdAt": 0,
          "commercialReference.updatedAt": 0,
        },
      },
    ]);

    getData = getData[0];
    const statusCode = getData ? STATUS_CODE.OK : STATUS_CODE.OK;
    const message = getData ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

    return Response[statusCode === STATUS_CODE.OK ? "success" : "error"]({
      req,
      res,
      status: statusCode,
      msg: message,
      data: getData,
    });
  } catch (error) {
    console.error("error-->", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  fetchProfile,
};
