import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  res.json({ "user from get all products": req.user });

  try {
    const product = Product.find({}); // get all products

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in product controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) return res.json(JSON.parse(featuredProducts));

    // lean() function return a plain js object instead of mongodb object and enhanced performance.
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts)
      return res.status(404).json({ message: "No product found" });

    await redis.set("featured_product", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getfeatureProducts fx", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image)
      return (cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      }));

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "https://placehold.co/200x200",
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const publidId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products${publidId}`);
        console.log("Product image deleted from cloudinary");
      } catch (error) {
        console.log(
          "Error deleting product image from cloudinary",
          error.message
        );
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in delete product controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          description: 1,
          image: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductByCateogory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

async function updateFeaturedProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in saving featured products in redis", error.message);
  }
}
