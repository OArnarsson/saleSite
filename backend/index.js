const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require("cors");
const _          = require("lodash");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json

// A helper function to create a seller object.
function createSeller(id, name, category, img) {
	return {
		id: id,
		name: name,
		category: category,
		imagePath: img
	};
}

// Another helper function.
function createProduct(sellerid, id, productName, price, quantitySold, quantityInStock, path) {
	return {
		id: sellerid,
		product: {
			id: id,
			name: productName,
			price: price,
			quantitySold: quantitySold,
			quantityInStock: quantityInStock,
			imagePath: path
		}
	};
}

// Initial data.
var sellers = [
	createSeller(1, "Hannyrðaþjónusta Hannesar", "Fatnaður", "http://i.imgur.com/OYVpe2W.jpg?fb"),
	createSeller(2, "Smíðaverkstæði Sigríðar", "Skartgripir", "https://i.imgur.com/ywaPivVh.jpg"),
	createSeller(3, "Sælgætisgerð Sjonna og Súsí", "Matvörur", "http://i.imgur.com/IuL474x.jpg"),
	createSeller(4, "Leirkeraverkstæði Lomma", "Keramik", "https://upload.wikimedia.org/wikipedia/commons/6/67/Potter_at_work,_Jaura,_India.jpg")
];

var products = [
	createProduct(1,  1, "Ullarvettlingar",  1899, 500, 12, "http://i.imgur.com/MZOmRnH.jpg"),
	createProduct(1,  2, "Ullarsokkar",      2199, 488,  9, "http://i.imgur.com/0XKznD4.jpg?1"),
	createProduct(1,  3, "Trefill",           999, 600, 23, "http://i.imgur.com/50ivFlC.jpg"),
	createProduct(1,  4, "Sjal",             2399, 120, 65, "https://farm6.static.flickr.com/5205/5298302908_fb75ed8e0a.jpg"),
	createProduct(1,  5, "Húfa",             1799, 700, 11, "http://purnahandmade.com/media/catalog/product/cache/1/image/ab49223884317513dca074f3bc642368/p/h/phc_malle_08_orwh.jpg"),
	createProduct(1,  6, "Bjórvettlingar",   2649,  12, 99, "https://img1.etsystatic.com/050/1/5847299/il_214x170.730058347_mt4x.jpg"),
	createProduct(1,  7, "Jakki",            4499,  23, 14, "http://www.newmanmayahandicraft.com.np/wp-content/uploads/2015/10/woolen-jacket-with-multicolored-design.jpg"),
	createProduct(1,  8, "Peysa",            5899, 122,  1, "https://upload.wikimedia.org/wikipedia/commons/7/75/Selburose-sweater.jpg"),
	createProduct(1,  9, "Lambhúshetta",     2499, 322,  4, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Balaclava_3_hole_black.jpg"),
	createProduct(1, 10, "Buxur",            4299,  73,  5, ""),
	createProduct(1, 11, "Grifflur",         1299,  98,  9, ""),
	createProduct(1, 12, "Teppi",             499, 819, 98, "https://pixabay.com/static/uploads/photo/2015/11/07/14/40/fabric-1031932_960_720.jpg"),
	createProduct(1, 13, "Sokkar",            499, 991, 23, "https://upload.wikimedia.org/wikipedia/commons/4/42/HandKnittedWhiteLaceSock.jpg"),
	createProduct(1, 14, "Bindi",             899,  25, 22, ""),
	createProduct(1, 15, "Slaufa",            499, 552, 54, "https://pixabay.com/static/uploads/photo/2015/04/20/21/39/bow-tie-732289_960_720.jpg"),
	createProduct(1, 16, "Hnéháir sokkar",   2499,  93, 42, "https://upload.wikimedia.org/wikipedia/commons/c/cf/Argyle_(PSF).png"),
	createProduct(1, 17, "Barnatrefill",      999,  39, 11, "https://upload.wikimedia.org/wikipedia/commons/a/a4/Well-clothed_baby.jpg"),
	createProduct(1, 18, "Hneppt peysa",     4499,  19,  9, "https://upload.wikimedia.org/wikipedia/commons/4/4d/1940_Trachtenstrickjacke_anagoria.JPG"),
	createProduct(1, 19, "Hvítir vettlingar", 499, 241,  0, "https://pixabay.com/static/uploads/photo/2014/05/05/22/15/gloves-338614_960_720.jpg"),
	createProduct(1, 20, "Úlnliðshlífar",    1499,  34,  0, "https://pixabay.com/static/uploads/photo/2015/11/07/17/20/hands-1032312_960_720.jpg"),
	createProduct(3, 21, "Kókoskúlur",        499, 100, 5000, "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chokladbollar.jpg"),
	createProduct(3, 22, "Brjóstsykur",       499, 200, 4900, ""),
];
// Note: sellers 2 and 4 don't have any products - yet!

// Helper function to find seller by id:
function findSellerById(id) {
	var obj = _.find(sellers, seller => {
		return seller.id === id;
	});

	return obj;
}

// Return all listed sellers:
app.get("/api/sellers", (req, res) => {
	res.type("application/json");
	res.json(sellers);
});

// Return a single seller by its id:
app.get("/api/sellers/:id", (req, res) => {
	var id = parseInt(req.params.id);

	var seller = findSellerById(id);
	if(!seller) {
		res.statusCode = 404;
		return res.send('Error 404: ID not found.');
	}
	res.json(seller);
});

// Add a new seller
app.post("/api/sellers", (req, res) => {
	console.log("About to add a new seller:");

	// Validation:
	if (req.body.name == null) {
		res.statusCode = 400;
		return res.send('Error 400: Seller needs a name!');
	}

	// The rest is optional (but highly encouraged!)
	// I.e. the category and the imagePath.
	let newSeller = {
		name: req.body.name,
		category: req.body.category,
		imagePath: req.body.imagePath
	};

	newSeller.id = sellers[sellers.length - 1].id + 1;
	// Store the new seller:
	sellers.push(newSeller);

	res.statusCode = 201;
	return res.send(newSeller);
});

app.put("/api/sellers/:id", (req, res) => {
	// Check if we can find the seller:
	var seller = findSellerById(req.params.id);
	if (!seller) {
		res.statusCode = 404;
		return res.send('Error 404: No seller found!');
	}

	// Validate data:
	if (!req.body.name) {
		res.statusCode = 400;
		return res.send('Error 400: Seller name is required!');
	}

	// Update individual properties:
	seller.name      = req.body.name;
	seller.category  = req.body.category;
	seller.imagePath = req.body.imagePath;

	res.statusCode = 200;
	return res.send(seller);
});

// Returns the list of products by a given seller:
app.get("/api/sellers/:id/products", (req, res) => {
	var sellerProducts = [];
	var id = parseInt(req.params.id);
	for (var p of products) {
		if (p.id === id) {
			sellerProducts.push(p.product);
		}
	}

	res.statusCode = 200;
	return res.send(sellerProducts);
});

// Adds a product to the catalog of a given seller:
app.post("/api/sellers/:id/products", (req, res) => {

	// Validate seller:
	var seller = findSellerById(parseInt(req.params.id));
	if (!seller) {
		res.statusCode = 404;
		return res.send('Error 404: Seller with the given ID was not found');
	}

	// Validate product name:
	if (!req.body.name) {
		res.statusCode = 400;
		return res.send("Error 400: A product must have a name specified");
	}

	// Calculate new ID (using super complicated method):
	var newId = _.maxBy(products, (p) => p.product.id).product.id + 1;
	newProduct = createProduct(seller.id, newId, req.body.name, req.body.price, 0, req.body.quantityInStock, req.body.path);
	products.push(newProduct);

	// Success!
	res.statusCode = 201;
	return res.send(newProduct);
});

app.put("/api/sellers/:id/products/:prodId", (req, res) => {
	// Validate seller:
	var seller = findSellerById(parseInt(req.params.id));
	if (!seller) {
		res.statusCode = 404;
		return res.send('Error 404: Seller with the given ID was not found');
	}

	// Validate product name:
	if (!req.body.name) {
		res.statusCode = 400;
		return res.send("Error 400: A product must have a name specified");
	}

	// Find the product which should be updated:
	var prodId = parseInt(req.params.prodId);
	var product = _.find(products, p => {
		return p.product.id === prodId;
	});
	if (!product) {
		res.statusCode = 404;
		return res.send("Error: product not found!");
	}

	// Validate that the product does indeed belong to this seller:
	if (product.id !== seller.id) {
		res.statusCode = 400;
		return res.send("400: Product does not belong to this seller!");
	}

	// Validate product name:
	if (!req.body.name) {
		res.statusCode = 400;
		return res.send("Error 400: A product must have a name specified");
	}

	product.product.name = req.body.name;
	product.product.price = req.body.price;
	product.product.imagePath = req.body.imagePath;

	// Success!
	res.statusCode = 200;
	return res.send(product);

});

app.listen(process.env.PORT ||5000);
console.log("Server now listening on port 5000");