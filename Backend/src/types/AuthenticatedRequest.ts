import { Request } from "express"


export interface AuthenticatedRequest extends Request{
    cookies:{
        token?:string
    }
    userId?:String,
}