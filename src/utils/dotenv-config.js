module.export = require("dotenv").config({
  path: process.env.NODE_ENV === "local" ? ".env.local" : ".env",
});
