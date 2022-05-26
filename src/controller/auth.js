const { Op } = require("sequelize");
const { User } = require("../lib/sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");

const authController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, fullname, email } = req.body;

      const checkUsernameAndEmail = await User.findOne({
        where: {
          [Op.or]: [{ username, email }],
        },
      });

      if (checkUsernameAndEmail) {
        return res.status(400).json({
          message:
            "Username or email has been taken, please use another username or email!",
        });
      }

      const hashedPass = bcrypt.hashSync(password, 5);

      await User.create({
        username,
        password: hashedPass,
        email,
        fullname,
      });

      return res.status(201).json({
        message: "Account has been Registered",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { credential, password } = req.body;

      console.log(req);

      const checkCredential = await User.findOne({
        where: {
          [Op.or]: [{ username: credential }, { email: credential }],
        },
      });

      if (!checkCredential) {
        return res.status(400).json({
          message: "Username or password is wrong, please try again!",
        });
      }

      const checkPassword = bcrypt.compareSync(
        password,
        checkCredential.dataValues.password
      );

      if (!checkPassword) {
        return res.status(400).json({
          message: "Username or password is wrong, please try again!",
        });
      }

      const cookie = generateToken({ id: checkCredential.id });

      delete checkCredential.dataValues.password;

      return res.status(200).json({
        message: "User Logged in",
        result: { checkCredential, cookie },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error!",
      });
    }
  },
};

module.exports = authController;
