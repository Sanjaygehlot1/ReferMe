import "express";

export interface JWTPayload {
  id: string;
  email: string;
  name?: string;
}


declare module "express-serve-static-core" {
  interface Request {
    user?: JWTPayload; 
  }
}
