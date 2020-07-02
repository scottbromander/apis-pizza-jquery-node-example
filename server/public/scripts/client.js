$(document).ready(init);

const pizzaObject = {
  topping: '',
  size: '',
};

function init() {
  $('#js-topping-cheese').on('click', clickCheese);
  $('#js-topping-pepperoni').on('click', clickPepperoni);
  $('#js-topping-sausage').on('click', clickSausage);

  $('#js-size-small').on('click', clickSmall);
  $('#js-size-medium').on('click', clickMedium);
  $('#js-size-large').on('click', clickLarge);

  $('#js-btn-submit').on('click', clickSubmit);
}

function clickCheese() {
  pizzaObject.topping = 'cheese';
  renderOrder();
}

function clickPepperoni() {
  pizzaObject.topping = 'pepperoni';
  renderOrder();
}

function clickSausage() {
  pizzaObject.topping = 'sausage';
  renderOrder();
}

function clickSmall() {
  pizzaObject.size = 'small';
  renderOrder();
}

function clickMedium() {
  pizzaObject.size = 'medium';
  renderOrder();
}

function clickLarge() {
  pizzaObject.size = 'large';
  renderOrder();
}

function renderOrder() {
  console.table(pizzaObject);
  $('#js-order').text(`${pizzaObject.size} ${pizzaObject.topping}`);
}

function clickSubmit() {
  console.log('click');

  if (pizzaObject.topping === '' || pizzaObject.size === '') {
    alert('Gotta pick yo toppins!');
    return;
  }

  $.ajax({
    type: 'POST',
    url: '/pizza',
    data: pizzaObject,
  }).then((response) => {
    console.log(response);
    getOrders();
  });
}

function getOrders() {
  $.ajax({
    type: 'GET',
    url: '/pizza',
  }).then((response) => {
    console.table(response);
    renderOrders(response);
  });
}

function renderOrders(orders) {
  $('#js-all-orders').empty();

  // {size, topping, cost}
  for (let order of orders) {
    $('#js-all-orders').append(
      `<p>${order.size} ${order.topping} - $${order.cost}</p>`
    );
  }
}
