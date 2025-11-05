import z from "zod";

// ✅ Validation Schemas
export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "validation.first-name-required"),
  last_name: z.string().min(1, "validation.last-name-required"),
  email: z.string().email("validation.invalid-email"),
  phone: z.string().min(1, "validation.phone-required"),
});

export const addressSchema = z.object({
  address_id: z.number().nullable().optional(),
  address1: z.string().min(1, "validation.address-required"),
  city: z.string().min(1, "validation.city-required"),
  country: z.string().min(1, "validation.country-required"),
});

export const addressesSchema = z.object({
  addresses: z.array(addressSchema).min(1, "validation.at-least-one-address"),
});
