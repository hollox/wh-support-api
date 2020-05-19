import { ValidationOptions } from "@hapi/joi";

export const requiredOptions = {
  presence: "required",
  abortEarly: false,
  allowUnknown: true
} as ValidationOptions;

export const optionalOptions = {
  presence: "optional",
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
} as ValidationOptions;
