import { Router } from "express";
import {
  getCustomers,
  getCustomerAddressesById,
  seedCustomersData,
} from "./controller";

const router = Router();

router.get("/", function (req, res) {
  getCustomers()
    .then((customers) => {
      res.send({
        success: true,
        total: customers.length,
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

router.get("/:customerId", function ({ params }, res) {
  const { customerId } = params;
  getCustomerAddressesById(customerId)
    .then(({ customer, addresses }) => {
      res.send({
        success: true,
        customer: {
          ...customer,
          addresses,
        },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        error: err.message,
      });
    });
});

router.get("/seed", function (req, res) {
  seedCustomersData(50)
    .then(({ customers, customerAddresses }) => {
      res.send({
        success: true,
        customers,
        customerAddresses,
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
