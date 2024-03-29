const Product = require('../models/product');
//const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products, 
            pageTittle: 'All Products', 
            path: '/products',
        });
    })
    .catch(err => {
        console.log(err);
    }); 
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    /*Product.findAll({where: {id: prodId } })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0], 
                pageTittle: products[0].tittle,
                path: '/products'
            });
        
        })
        .catch(err => {
            console.log(err);
        })*/
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product, 
                pageTittle: product.tittle,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/index', {
            prods: products, 
            pageTittle: 'Shop', 
            path: '/',
        }); 
    })
    .catch(err => {
        console.log(err);
    }); 
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTittle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
  };

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    //const product = req.body.productId;
    Product.findByPk(prodId).then(product => {
        return req.user.addToCart(product)
        
    }).then(result => {
        console.log(result);
        res.redirect('/cart')
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders'); 
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    req.user
    .getOrders()
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTittle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => console.log(err))
    
};

/*exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTittle: 'Checkout'
    });
};
*/