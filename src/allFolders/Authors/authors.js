import express from "express";
import { Authors } from "../../DB/db.js";
import createError from "http-errors";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Authors.findAll();
      res.send("Data send successfully");
    } catch (e) {
      console.log(e);
      next(
        createError(500, "Oops something went wrong, please try again later")
      );
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Authors.create(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(
        createError(500, "Oops something went wrong, please try again later")
      );
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Authors.findByPk(req.params.id);
      res.send("Data send successfully");
    } catch (e) {
      console.log(e);
      next(
        createError(500, "Oops something went wrong, please try again later")
      );
    }
  })
  .put(async (req, res, next) => {
    try {
      const author = await Authors.update(req.body, {
        returning: true,
        where: { id: req.params.id },
      });
      res.send("Updated successfully", author);
    } catch (e) {
      console.log(e);
      next(
        createError(500, "Oops something went wrong, please try again later")
      );
    }
  })
  .delete(async (req, res, next) => {
    try {
      const author = await Authors.destroy({ where: { id: req.params.id } });
      res.send("Deleted successfully");
    } catch (e) {
      console.log(e);
      next(
        createError(500, "Oops something went wrong, please try again later")
      );
    }
  });

export default router;
