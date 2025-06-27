const Admin = require("../../model/admin");
const { handleException } = require("../../helper/exception");
const Response = require("../../helper/response");
const { ObjectId } = require("mongoose").Types;
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../helper/constant");

const fetchProfile = async (req, res) => {
  let { logger, adminId } = req;
  try {
    let [getData] = await Admin.aggregate([
      {
        $match: {
          _id: new ObjectId(adminId),
        },
      },
      {
        $project: {
          __v: 0,
          password: 0,
          forgotPassword: 0,
          token: 0,
        },
      },
    ]);
    let result = await Admin.aggregate([
      {
        $match: { _id: new ObjectId(adminId) },
      },
      {
        $lookup: {
          from: "adminroles",
          localField: "roleByAdmin",
          foreignField: "_id",
          as: "adminRoles",
        },
      },
      { $unwind: "$adminRoles" },
      {
        $unwind: {
          path: "$adminRoles.access",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "menuaccesses",
          localField: "adminRoles.access.menuId",
          foreignField: "_id",
          as: "menuDetails",
        },
      },
      {
        $unwind: {
          path: "$menuDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: null,
          menuDetails: {
            $addToSet: {
              menuId: "$adminRoles.access.menuId",
              menuTitle: "$menuDetails.menuTitle",
              to: "$menuDetails.to",
              add: "$adminRoles.access.add",
              read: "$adminRoles.access.read",
              edit: "$adminRoles.access.edit",
              delete: "$adminRoles.access.delete",
            },
          },
          roleTitle: { $first: "$adminRoles.roleTitle" },
        },
      },
      {
        $project: {
          _id: 0,
          menuDetails: 1,
          roleTitle: 1,
        },
      },
    ]).then(([result]) => result);

    const statusCode = getData ? STATUS_CODE.OK : STATUS_CODE.OK;
    const message = getData ? INFO_MSGS.SUCCESS : ERROR_MSGS.DATA_NOT_FOUND;

    return Response[statusCode === STATUS_CODE.OK ? "success" : "error"]({
      req,
      res,
      status: statusCode,
      msg: message,
      data: { ...getData, ...result },
    });
  } catch (error) {
    console.error("error-->", error);
    return handleException(logger, res, error);
  }
};

module.exports = {
  fetchProfile,
};
