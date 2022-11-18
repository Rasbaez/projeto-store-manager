const saleRegisterRequest = [
  {
    "productId": 3,
    "quantity": 1
  },
  {
    "productId": 3,
    "quantity": 1
  }
];

const saleRegistredResult = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 3,
      "quantity": 1
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
};

const salesList = [
  {
    "saleId": 1,
    "date": "2022-11-18T14:04:27.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-18T14:04:27.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-18T14:04:27.000Z",
    "productId": 3,
    "quantity": 15
  },
  {
    "saleId": 3,
    "date": "2022-11-18T14:04:38.000Z",
    "productId": 3,
    "quantity": 1
  },
  {
    "saleId": 3,
    "date": "2022-11-18T14:04:38.000Z",
    "productId": 3,
    "quantity": 1
  },
  {
    "saleId": 4,
    "date": "2022-11-18T14:05:08.000Z",
    "productId": 3,
    "quantity": 1
  },
  {
    "saleId": 4,
    "date": "2022-11-18T14:05:08.000Z",
    "productId": 3,
    "quantity": 1
  }
];

const requestedSaleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-18T14:04:27.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-18T14:04:27.000Z"
  }
];

module.exports = {
  saleRegisterRequest,
  saleRegistredResult,
  salesList,
  requestedSaleById
};
