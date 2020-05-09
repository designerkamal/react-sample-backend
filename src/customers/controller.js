import Customer from "./models/customer";
import CustomerAddress from "./models/customer_address";

import shortid from "shortid";
import faker from "faker/locale/en";
import { random, add } from "lodash";

export async function getCustomers() {
  try {
    let customers = await Customer.find();
    return customers;
  } catch (e) {
    return [];
  }
}

export async function getCustomerAddressesById(customerId) {
  try {
    let customer = await Customer.findById(customerId);
    let addresses = await CustomerAddress.findByCustomerId(customerId);
    return {
      customer: customer.toJSON(),
      addresses,
    };
  } catch (e) {
    return [];
  }
}

export async function seedCustomersData(
  customersCount = 20,
  addressCountMax = 15
) {
  const sexValues = ["Male", "Female"];
  const customers = [];
  const customerAddresses = [];
  for (let customerIndex = 0; customerIndex < customersCount; customerIndex++) {
    let fakeUser = faker.helpers.userCard();
    let customer = {
      _id: shortid.generate(),
      name: fakeUser.name,
      age: random(24, 38),
      sex: sexValues[random(0, 1)],
    };
    customers.push(customer);

    let addressCount = random(0, addressCountMax);
    for (let addressIndex = 0; addressIndex < addressCount; addressIndex++) {
      let address = {
        customerId: customer._id,
        title: `Address ${addressIndex + 1}`,
        street: faker.address.streetAddress(true),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        zipCode: faker.address.zipCode(),
      };
      customerAddresses.push(address);
    }
  }
  const customersResult = await Customer.insertMany(customers);
  const customerAddressesResult = await CustomerAddress.insertMany(
    customerAddresses
  );
  return {
    customers: customersResult,
    customerAddresses: customerAddressesResult,
  };
}
