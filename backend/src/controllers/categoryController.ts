import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";


export const listCategories = async (req:Request,res:Response) =>{
     try {
    const role = req.headers["x-auth-role"] as string;
    const categories = await categoryService.getCategories(role);
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(401).json({
      message: "categorizes not found",
    }); 
  }
}

export const addCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body.name);
    return res.status(201).json({ message: "Category created", category });
  } catch (error) {
    return res.status(403).json({
      message: "adding category failed",
    });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid category id" });
    }
    const category = await categoryService.updateCategory(id, req.body);
    return res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    return res.status(500).json({
      message: "updating category failed",
    });
  }
};