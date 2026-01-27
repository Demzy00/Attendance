const e = require("express");
const conn = require("../config");
const utils = require("util");
const query = utils.promisify(conn.query).bind(conn);

const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    // const image = reg.file ? req.file.fileman : null;
    // console.log(image);

    if (!name || !email || !age) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    console.log("gottt");
    theemail = "SELECT email FROM register WHERE email = ?";
    const existingEmail = await query(theemail, [email]);

    if (existingEmail.length > 0) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const userSql = "INSERT INTO register (name, email, age) VALUE(?,?,?)";
    const postQuery = await query(userSql, [name, email, age]);
    return res
      .status(201)
      .json({ msg: "You have successfully added to register" });
  } catch (error) {
    console.log("Error in createUser");
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getSql = "SELECT * FROM register";
    const dataQuery = await query(getSql);
    if (dataQuery.length === 0) {
      return res.status(404).json({ msg: "You do not have anybody here" });
    }
    return res.status(201).json(dataQuery);
  } catch (error) {
    return res.status.json({ msg: "Error in get all users" });
  }
};

const editUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const { id } = req.params;

    if (!name || !age) {
      return res.status(401).json({ msg: "Please fill in all fileds" });
    }

    const postSql = "SELECT * FROM register WHERE id=?";
    const postQuery = await query(postSql, [id]);

    // check if post doesn't exist for this user
    if (postQuery.length === 0) {
      return res.status(404).json({ msg: "Post not found!!" });
    }

    const eSql = "UPDATE register SET name = ?, age = ? WHERE id = ?";
    const eQuery = await query(eSql, [name, age, id]);
    return res.status(200).json(eQuery);
  } catch (error) {
    return res.status(500).json({ msg: "Error in update controller" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const dSql = "DELETE FROM register WHERE id = ?";
    const dQuery = await query(dSql, [id]);
    if (dQuery === 0) {
      res.status(404).json({ msg: "User not found!" });
    }
    return res.status(200).json(dQuery);
  } catch (error) {
    console.log("error in delete");
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { createUser, getAllUsers, editUser, deleteUserById };
