import mongoose from "mongoose";

const questionBank= new mongoose.Schema({
     question:String,
     dateGenerated: { type: Date, default: Date.now }
})
 export const QuestionBank = mongoose.model("QuestionBank",questionBank);