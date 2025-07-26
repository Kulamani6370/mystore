import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";
export const getAllProducts = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;

  const productsPromise = Product.find(query).skip(skip).limit(parseInt(limit));

  const countPromise = Product.countDocuments(query);

  const [products, totalProducts] = await Promise.all([
    productsPromise,
    countPromise,
  ]);

  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({
    products,
    totalProducts,
    numOfPages,
  });
};

export const addProduct = async (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILES:", req.files);

  try {
    const { name, description, category, price, markedprice, stock, unit } =
      req.body;

    const images = req.files.map((file) => ({
      url: file.path,
      alt: file.originalname,
    }));

    const product = await Product.create({
      name,
      description,
      category,
      price,
      markedprice,
      stock,
      unit,
      images,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating product" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ msg: `no product with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // build updatedFields object from req.body
    const updatedFields = { ...req.body };

    // if new images are uploaded, process them
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        url: file.path,
        alt: file.originalname,
      }));
      updatedFields.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const removedProduct = await Product.findByIdAndDelete(id);
  if (!removedProduct) {
    return res.status(404).json({ msg: `no product with the id ${id}` });
  }

  res.status(StatusCodes.OK).json({ product: removedProduct });
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });

    res.status(StatusCodes.OK).json({
      products: featuredProducts,
      totalFeatured: featuredProducts.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching featured products" });
  }
};
