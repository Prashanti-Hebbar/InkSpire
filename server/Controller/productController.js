const productTable = require("../Models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, categoryId } = req.body;
    const pimage = req.file ? req.file.filename : null;
    const productDetails = new productTable({
      name,
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
    const allProducts = await productTable.find();
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
    const product = await productTable
      .findById(productId)
      .populate("categoryId", "name");
    console.log(product);
    res.status(200).json({ message: "Product data by id", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const deleteProductId = req.params.id;
    const deletedProduct =
      await productTable.findByIdAndDelete(deleteProductId);
    console.log(deletedProduct);
    res
      .status(200)
      .json({
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
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    //  Build update object manually
    const updateData = {
      name: req.body.name,
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

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
};
