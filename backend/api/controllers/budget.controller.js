import { Budget } from "../model/budget.schema.js";

export const createBudget = async (req, res, next) => {
  try {
    const { category, amount, month, year } = req.body;
    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "All fields are Required !",
      });
    }
    const isBudgetExists = await Budget.findOne({
      user: req.user._id,
      category: category,
      month: month,
      year: year,
    });

    if (isBudgetExists) {
      return res.status(409).json({
        message: "Budget of this category is already exists !",
      });
    }
    const budgetData = await Budget.create({
      user: req.user._id,
      category,
      amount,
      month,
      year,
    });
    return res.status(201).json({
      message: "Budget created Successfully !",
      data: {
        budget: budgetData._id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getBudget = async (req, res, next) => {
  try {
    const budgetData = await Budget.find({
      user: req.user._id, 
    }).populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "category",
      },
    ]).sort({createdAt: -1});
    if (budgetData.length === 0) {
      return res.status(400).json({
        message: "Budget not found!",
      });
    }
    return res.status(200).json({
      budgetData,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getOneBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const budgetData = await Budget.findById(id).populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "category",
      },
    ]);
    if (budgetData.length === 0) {
      return res.status(400).json({
        message: "Budget not found!",
      });
    }
    return res.status(200).json({
      budgetData,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
