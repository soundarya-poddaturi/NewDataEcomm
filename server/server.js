// // const express = require('express');
// const Products = require('./Products');
// const Data = require('./Data');
// const Category = require('./Categories');
// const Users = require('./Users');
// const Orders = require('./Orders');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Enable CORS for all routes
// app.use(cors());



// app.get('/products', (req, res) => {
//     console.log("products")
//   res.json(Products);
// });

// app.get('/products/:id', (req, res) => {
//     console.log("in specific product")
//   const productId = parseInt(req.params.id);
//   const product = Products.find(product => product.id === productId);
  
//   if (!product) {
//     res.status(404).json({ error: 'Product not found' });
//   } else {
//     res.json(product);
//   }
// });

// app.get('/categories', (req, res) => {
//     console.log("in categories");
//   res.send(Category);
// });

// app.get('/products/category/:category', (req, res) => {
//     console.log(":category");
//   const category = req.params.category.toLowerCase();
//   const productsByCategory = Products.filter(product => product.category.toLowerCase() === category);
  
//   if (productsByCategory.length === 0) {
//     res.status(404).json({ error: 'Category not found' });
//   } else {
//     res.json(productsByCategory);
//   }
// });

// app.get('/users', (req, res) => {
//     console.log("users");
//   res.json(Users);
// });

// app.get('/users/:id', (req, res) => {
//     console.log(":users");
//   const userId = parseInt(req.params.id);
//   const user = Users.find(user => user.id === userId);

//   if (!user) {
//     res.status(404).json({ error: 'User not found' });
//   } else {
//     res.json(user);
//   }
// });

// app.get('/orders/:userId', (req, res) => {
//     console.log("userr orders");
//   const userId = parseInt(req.params.userId);
//   const userOrders = Orders.filter(order => order.userId === userId);
//     console.log(userOrders);
//   if (userOrders.length === 0) {
//     res.status(404).json({ error: 'User orders not found' });
//   } else {
//     res.json(userOrders);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
// const express = require('express');
const Products = require('./Products');
const Data = require('./Data');
const Category = require('./Categories');
const Users = require('./Users');
const Orders = require('./Orders');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());



app.get('/products', (req, res) => {
    // console.log("products")
  res.json(Data);
});

app.get('/products/:id', (req, res) => {
    // console.log("in specific product")
  const productId = parseInt(req.params.id);
  const product = Data.find(product => product.id === productId);
  
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

app.get('/categories', (req, res) => {
    // console.log("in categories");
  res.send(Category);
});

app.get('/products/category/:category', (req, res) => {
    // console.log(":category");
  const category = req.params.category.toLowerCase();
  const productsByCategory = Data.filter(product => product.category.toLowerCase() === category);
  
  if (productsByCategory.length === 0) {
    res.status(404).json({ error: 'Category not found' });
  } else {
    res.json(productsByCategory);
  }
});

app.get('/users', (req, res) => {
    // console.log("users");
  res.json(Users);
});

app.get('/users/:id', (req, res) => {
    // console.log(":users");
  const userId = parseInt(req.params.id);
  const user = Users.find(user => user.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
});

app.get('/orders/:userId', (req, res) => {
    // console.log("userr orders");
  const userId = parseInt(req.params.userId);
  const userOrders = Orders.filter(order => order.userId === userId);
    // console.log(userOrders);
  if (userOrders.length === 0) {
    res.status(404).json({ error: 'User orders not found' });
  } else {
    res.json(userOrders);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
