import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export function getDetailsFromError(error: Joi.ValidationError): string[] {
  return (error.details || []).map(detail => detail.message);
}

export const handleErrors = <T>(
  controller: (req: Request, res: Response) => Promise<T>
) => (req: Request, res: Response, next: NextFunction): Promise<T | void> => {
  return controller(req, res).catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
    logger.error(e);
    next(e);
  });
};
