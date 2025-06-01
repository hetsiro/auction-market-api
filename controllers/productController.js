const Product = require('../models/Product');
const { capitalize } = require('../helpers/capitalize');

exports.getProducts = async (req, res) => {

  try {

    const searchQuery = req.query.q || ''; // Nombre del producto, por defecto retorna todos los productos
    const page = parseInt(req.query.page) || 1; // página actual, por defecto página 1
    const limit = parseInt(req.query.limit) || 5; // limite de productos por página, por defecto 5
    const searchCategory = req.query.category || ''; // filtrar por categoría, por defecto se ignora este filtro

    // Dar formato a la categoría para poder filtrar en la base de datos
    const unMappedCategory = searchCategory.split(' ').join('-').toLowerCase();

    const skip = (page - 1) * limit;

    // Retorna la cantidad de productos que cumplan con el nombre y categoría
    const totalCategoryProducts = await Product.countDocuments({
      title: { $regex: searchQuery, $options: 'i' },
      category: { $regex: unMappedCategory, $options: 'i' },
    });

    // Retorna la cantidad de productos que cumplan con el nombre
    const totalProducts = await Product.countDocuments({
      title: { $regex: searchQuery, $options: 'i' },
    });

    // Retorna todos los productos que cumplan con el nombre
    const allProducts = await Product.find({
      title: { $regex: searchQuery, $options: 'i' },
    });

    // Retorna la cantidad de productos definidos en el limite y en la página según el skip, de los productos que cumplan con el nombre y la categoría
    const products = await Product.find({
      title: { $regex: searchQuery, $options: 'i' },
      category: { $regex: unMappedCategory, $options: 'i' } // búsqueda insensible a mayúsculas
    }).skip(skip).limit(limit);

    // Calcula el total de páginas de los productos que cumplan con el nombre y la categoría
    const totalPages = Math.ceil(totalProducts / limit);
    const totalCategoryPages = Math.ceil(totalCategoryProducts / limit);

    // Se almacenan las categorías en el formato [{title: 'fragrances', count: 3} ...] de mayor a menor según la cantidad
    const categories = [];

    allProducts.forEach((product) => {
      if (!categories.some((category) => {
        if (product.category === category.title) {
          category.count++;
          return true;
        }
      })) {
        categories.push({ title: product.category, count: 1 });
      }
    })

    // Se ordenan las categorías de mayor a menor
    categories.sort((a, b) => b.count - a.count);

    // Se mapean las categorías para convertirlas de "womens-jewellry" a Womens jewellry y se puedan usar en el frontend
    const mappedCategories = categories.map((category) => {
      const capitalizedCategory = capitalize(category.title);
      const separatedStr = capitalizedCategory.split('-');
      const title = separatedStr.join(' ');
      const count = category.count;

      return {
        title,
        count
      };
    })

    res.json({
      totalProducts,
      totalCategoryProducts,
      totalPages,
      totalCategoryPages,
      page,
      limit,
      mappedCategories,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while searching for products', error });
  }
};

// Obtiene la información del producto según el ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching product by id', error });
  }
};

// Obtiene el top 10 de productos según el rating
exports.getTopRatedProducts = async (req, res) => {
  try {

    const allProducts = await Product.find().sort({ rating: -1 }).limit(10);
    res.json(allProducts);

  } catch (error) {
    res.status(500).json({ message: 'Error while fetching best-rated products', error });
  }
};

// Funciones extras que se podrían ocupar
exports.getWorstRatedProducts = async (req, res) => {
  try {

    const allProducts = await Product.find().sort({ rating: 1 }).limit(10);
    res.json(allProducts);

  } catch (error) {
    res.status(500).json({ message: 'Error while fetching best-rated products', error });
  }
};