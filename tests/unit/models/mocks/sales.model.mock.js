const salesList = [
  {
    "id": 1,
    "date": "2022-11-17T19:48:03.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "id": 1,
    "date": "2022-11-17T19:48:03.000Z",
    "product_id": 2,
    "quantity": 10
  },
  {
    "id": 2,
    "date": "2022-11-17T19:48:03.000Z",
    "product_id": 3,
    "quantity": 15
  }
];

const saleregistred = {
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

const salesById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-17T20:01:49.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-17T20:01:49.000Z"
  }
]

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


module.exports = { salesList, salesById, saleregistred, saleRegisterRequest };