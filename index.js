const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("The node server is running.");
});

app.post("/token", (req, res) => {
  let userToken = {
    id: req.body.id,
    expTime: req.body.expTime,
  };
  console.log("body====", req.body);
  console.log(userToken);
  const jwtPayload = userToken;
  const jwtData = {
    expiresIn: req.body.expTime,
  };
  const secret = "WinterIsComing2020";
  userToken.token = jwt.sign(jwtPayload, secret, jwtData);
  console.log(userToken);
  token2 = userToken.token;
  res.send(userToken);
});

app.post("/verifyToken", (req, res, next) => {
  const secret = "WinterIsComing2020";
  try {
    console.log("token====", req.body.token);
    let decoded = jwt.verify(req.body.token, secret);
    res.send(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
