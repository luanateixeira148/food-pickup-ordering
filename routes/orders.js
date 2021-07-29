const express = require('express');
const router = express.Router();

module.exports = function(db) {

  // GET /orders // grabs all the orders from a single user
  router.get('/', (req, res) => {

    // const orderID = req.params.order_id;
    const queryString = `
      SELECT orders.*, sum(quantity * price) as total_price, sum(quantity) as total_items
      FROM orders
      JOIN order_items ON orders.id = order_id
      JOIN items ON item_id = items.id
      WHERE orders.id = $1
      GROUP BY orders.id
      ORDER BY orders.id DESC;
    `;
    // const values = [orderID];
    const values = [1];

    db.query(queryString, values)
      .then((data) => {
        const orders = data.rows;
        const templateVars = { orders };
        return res.render('orders', templateVars);
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  })
  return router;
};
