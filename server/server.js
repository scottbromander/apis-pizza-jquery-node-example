const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*
{
    toppings: String,
    size: String,
    total: Number
}
*/
const orderHistory = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/pizza', (req, res) => {
  res.send(orderHistory);
});

app.post('/pizza', (req, res) => {
  // req.body
  const pizza = req.body;
  let cost = 5;

  if (pizza.size === 'small') {
    cost += 0;
  } else if (pizza.size === 'medium') {
    cost += 2;
  } else if (pizza.size === 'large') {
    cost += 4;
  }

  if (pizza.topping === 'cheese') {
    cost += 0;
  } else if (pizza.topping === 'pepperoni') {
    cost += 1;
  } else if (pizza.topping === 'sausage') {
    cost += 2;
  }

  const order = {
    size: pizza.size,
    topping: pizza.topping,
    cost: cost, // Create a key on order called cost and set it to the variable called cost.
  };

  // [ {size, topping, cost}, {} ]
  orderHistory.push(order);

  res.send(201);
});

app.listen(5001, () => {
  console.log(`Listening on port 5001!`);
});
