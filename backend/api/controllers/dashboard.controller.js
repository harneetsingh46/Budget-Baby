import { Budget } from "../model/budget.schema.js"
import {Purchase} from "../model/purchase.schema.js"


export const getDashboardData = async (req,res,next)=>{
    try {
        const budget = await Budget.find({user:req.user._id}).populate("category")
        const purchase = await Purchase.find({user:req.user._id}).sort({createdAt: -1})

        const totalBudget = budget.reduce((acc,item)=> acc + (item.amount || 0),0)
        const totalSpent = purchase.reduce((acc,item)=> acc + (item.amount || 0),0)
        const remaining = totalBudget - totalSpent

        return res.status(200).json({
            totalBudget,
            totalSpent,
            remaining,
            totalBudgets: budget.length,
            totalPurchases:purchase.length,
            budget,
            recentPurchase : purchase.slice(0,5)
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}