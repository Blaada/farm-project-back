const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const calibreRoute = require('./calibre.route');
const cropsRoute = require('./crops.route');
const expenseRoute = require('./expense.route');
const expenseTypeRoute = require('./expense.type.route');
const outgoingRoute = require('./outgoing.route');
const parcelRoute = require('./parcel.route');
const rootStockRoute = require('./rootStock.route');
const rootTypeRoute = require('./rootType.route');
const varietyRoute = require('./variety.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/calibers',
    route: calibreRoute,
  },
  {
    path: '/crops',
    route: cropsRoute,
  },
  {
    path: '/expenses',
    route: expenseRoute,
  },
  {
    path: '/expense-types',
    route: expenseTypeRoute,
  },
  {
    path: '/outgoings',
    route: outgoingRoute,
  },
  {
    path: '/parcels',
    route: parcelRoute,
  },
  {
    path: '/rootstocks',
    route: rootStockRoute,
  },
  {
    path: '/root-type',
    route: rootTypeRoute,
  },
  {
    path: '/varieties',
    route: varietyRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
