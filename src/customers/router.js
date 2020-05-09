import { Router } from "express";
import { getCustomers } from "./controller";

const router = Router();

router.get("/", function (req, res) {
  getCustomers()
    .then((customers) => {
      res.send({
        success: true,
        customers,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err.message,
      });
    });
});

export default router;
