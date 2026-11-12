require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid, authToken);

const messageRestaurant = () => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Hi! You have received an order! Respond to this message with the amount of time it'll take to complete the order. (ex. entering 30 would mean 30 minutes)`
  })
  .then((message) => console.log(message.sid));
}

const messageCustomer = (phone, body, res) => {
  client.messages.create({
    to: phone,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Dear customer, Your order will be ready in ${body} minutes`
  })
  .then((message) => console.log(message.sid));
}

const messageCustomerComplete= (customerName) => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Hi ${customerName}! Your order is now ready for pickup. Enjoy! :)`
  })
  .then((message) => console.log(message.sid));
}



module.exports = {messageCustomerComplete, messageCustomer, messageRestaurant};
