import Customer from "./models/customer";
import CustomerAddress from "./models/customer_address";

export async function getCustomers() {
  try {
    let customers = await Customer.find({
      limit: 100,
    });
    return customers;
  } catch (e) {
    return [];
  }
}

export async function getCustomersById(customerId) {
  try {
    let customerAddresses = await CustomerAddress.findByCustomerId(customerId);
    return customerAddresses;
  } catch (e) {
    return [];
  }
}

export async function seedCustomersData(
  customersCount = 20,
  addressCount = 20
) {}
