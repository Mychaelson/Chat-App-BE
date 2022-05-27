const { Op } = require("sequelize");
const { User } = require("../lib/sequelize");
const bcrypt = require("bcrypt");

const userControllers = {
  getAllUser: async (req, res) => {
    try {
      const result = await User.findAll({
        where: {
          ...req.query,
          [Op.not]: [{ id: req.token.id }],
        },
      });

      if (!result.length) {
        return res.status(400).json({
          message: "User not Found!",
        });
      }

      return res.status(200).json({
        message: "User Found!",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  },
};

module.exports = userControllers;
