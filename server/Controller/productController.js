const productTable = require("../Models/productModel");
const categoryTable = require("../Models/categoryModel");

const createProduct = async (req, res) => {
  try {
    const { name, author, price, quantity, description, categoryId } = req.body;
    if (
      !name ||
      !author ||
      !price ||
      !quantity ||
      !description ||
      !categoryId
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (price < 0 || quantity < 0) {
      return res.status(400).json({ message: "Invalid values" });
    }
    const categoryExists = await categoryTable.findById(categoryId);

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const pimage = req.file ? req.file.filename : null;

    const productDetails = new productTable({
      name,
      author,
      price,
      quantity,
      description,
      categoryId,
      productimage: pimage,
    });

    await productDetails.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: productDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await productTable
      .find()
      .populate("categoryId", "name");
    console.log(allProducts);
    res
      .status(200)
      .json({ message: "All products data", products: allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // ✅ ADD THIS (you skipped this — bad move)
    if (!productId || !productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await productTable
      .findById(productId)
      .populate("categoryId", "name");

    // ✅ ADD THIS (you also skipped this)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product data by id", product });
  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const deleteProductId = req.params.id;
    const deletedProduct =
      await productTable.findByIdAndDelete(deleteProductId);
    console.log(deletedProduct);
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    // ✅ VALIDATION
    if (
      !req.body.name ||
      !req.body.author ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (req.body.price < 0 || req.body.quantity < 0) {
      return res.status(400).json({ message: "Invalid values" });
    }
    // ✅ CATEGORY CHECK
    if (req.body.categoryId) {
      const categoryExists = await require("../Models/categoryModel").findById(
        req.body.categoryId,
      );

      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }
    }
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    //  Build update object manually
    const updateData = {
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      categoryId: req.body.categoryId,
    };

    // ✅ Handle image update ONLY if new file is uploaded
    if (req.file) {
      updateData.productimage = req.file.filename;
    }

    const updatedProduct = await productTable.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const { categoryId, productId } = req.params;

    if (!categoryId || !productId) {
      return res.status(400).json({ error: "Missing params" });
    }

    const products = await productTable
      .find({
        categoryId,
        _id: { $ne: productId },
      })
      .populate("categoryId", "name")
      .limit(4);

    res.json({ products });
  } catch (err) {
    console.log("RELATED ERROR:", err); // 🔥 SEE REAL ERROR
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  getRelatedProducts,
};
