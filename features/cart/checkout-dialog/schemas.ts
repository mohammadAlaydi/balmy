import z from "zod";

export const formSchema = z.object({
    billing: z.object({
      first_name: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name is too long"),
      last_name: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name is too long"),
      email: z.string().email("Enter a valid email address"),
      address1: z
        .string()
        .min(1, "Street address is required")
        .max(200, "Address is too long"),
      city: z.string().min(1, "City is required").max(100, "City is too long"),
      phone: z
        .string()
        .min(1, "Phone is required")
        .regex(/^[+]?[- 0-9()]{7,30}$/i, "Enter a valid phone number"),
    }),
    shipping: z.object({
      address1: z
        .string()
        .min(1, "Street address is required")
        .max(200, "Address is too long"),
      city: z.string().min(1, "City is required").max(100, "City is too long"),
      phone: z
        .string()
        .min(1, "Phone is required")
        .regex(/^[+]?[- 0-9()]{7,30}$/i, "Enter a valid phone number"),
    }),
    payment: z.object({
      method: z.enum(["cashondelivery", "creditcard", "paypal"]),
    }),
    shipping_method: z.enum([
      "flatrate_flatrate",
      "freeshipping_freeshipping",
      "tablerate_bestway",
    ]),
    same_as_billing: z.boolean(),
  });
  