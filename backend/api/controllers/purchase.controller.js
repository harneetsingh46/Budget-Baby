import { Purchase } from "../model/purchase.schema.js";
import { Budget } from "../model/budget.schema.js";

export const createPurchase = async (req, res, next) => {
  try {
    const { title, amount,note, date, budgetId } = req.body;
    if (!title || !amount || !date || !budgetId || !note) {
      return res.status(400).json({
        message: "All fields are required !",
      });
    }
    const budget = await Budget.findOne({
      _id: budgetId,
      user: req.user._id,
    });
    if (!budget) {
      return res.status(400).json({
        message: "No budget found!",
      });
    }
    
    const purchase = await Purchase.create({
      user: req.user._id,
      budget: budget._id,
      category: budget.category,
      title: title.trim(),
      amount: Number(amount),
      note: note ? note.trim() : "",
      date: date ? new Date(date) : new Date(),
      month: budget.month,
      year: budget.year,
    });
    return res.status(200).json({
      message: "Purchase Created Successfully !",
      date: purchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPurchasesByBudget = async (req, res, next) => {
  try {
    const { budgetId } = req.params;

    console.log(budgetId)

    const purchases = await Purchase.find({
      budget: budgetId,
      user: req.user._id,
    })

    if(!purchases){
      return res.status(400).json({
        message: "No Purchase Found !"
      })
    }
    return res.status(200).json({
      purchases,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deletePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Purchase.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Purchase not found",
      });
    }

    return res.status(200).json({
      message: "Purchase deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
