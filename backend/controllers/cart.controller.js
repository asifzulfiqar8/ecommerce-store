export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.body;

    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCard controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCardProducts = async (req, res) => {};

export const updateQuantity = async (req, res) => {};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in delete all from card controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
