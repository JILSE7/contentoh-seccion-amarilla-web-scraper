import { Request, Response } from "express";
import { RestaurantServices } from "../services";
import { CustomError } from "../utilities/customError.utilities";

export const SearchRestaurantController = async(req: Request, res: Response) => {
  try {
    const {queryLocation} = req.query;
    const response = await RestaurantServices.SearchRestaurantService(queryLocation as string)
    return res.status(200).json({
      ok: true,
      data: response
    })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(e instanceof CustomError ? e.statusCode : 500).json({
        ok: false,
        error: e.message
      }) 
    }
  }
}

export const RestaurantController =  {
  SearchRestaurantController
}