import mongoose from "mongoose";

const customerAddressSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    customerId: {
      type: String,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

customerAddressSchema.static("findByCustomerId", async function (customerId) {
  try {
    const results = await CustomerAddress.find({
      customerId,
    });
    return results;
  } catch (e) {
    return [];
  }
});

const CustomerAddress = mongoose.model(
  "CustomerAddress",
  customerAddressSchema
);

export default CustomerAddress;
