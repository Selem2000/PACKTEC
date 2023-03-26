const express = require("express");
const cors = require("cors");

const {
  Register,
  Login,
  getAllUsers,
  getUserByID,
  deleteUser,
  updateUser,
} = require("../controllers/user.controllers");
const Auth = require("../middleware/authorization");

const router = express.Router();

/*
@method: POST
@ path:http:localhost:4000/api/user/register
@ parameter: req.body  
public
*/
router.post("/register", Register);

/*
@method: POST
@ path:http:localhost:4000/api/user/login
@ parameter: req.body  
public
*/
router.post("/login", cors(), Login);

/*
@method: GET
@ path:http:localhost:4000/api/user/current
@ parameter: req.headers  
public
*/
router.get("/current", cors(), Auth, (req, res) => {
  res.send({ msg: "authorized", user: req.user });
});

/*
@method: GET
@ path:http:localhost:4000/api/user/
@ parameter
public
*/
router.get("/", cors(), getAllUsers);

/*
@method: GET
@ path:http:localhost:4000/api/user/:id
@ parameter
public
*/
router.get("/:id", cors(), getUserByID);

/*
@method: DELETE
@ path:http:localhost:4000/api/user/:id
@ parameter
public
*/
router.delete("/:id", deleteUser);

/*
@method: PUT
@ path:http:localhost:4000/api/user/:id
@ parameter: body 
public
*/
router.put("/:id", cors(), updateUser);

module.exports = router;
