const saleRegistred = {
  "id": 4,
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

const saleslist = [
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

const editedSale = {
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 5
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ]
}

const saleById = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-18T15:46:59.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-18T15:46:59.000Z"
  }
]

module.exports = { saleRegistred, saleslist, saleById, editedSale };