import z from "zod";

export const formSchema = z
  .object({
    billing: z.object({
      first_name: z.string().min(1, "validation.first-name-required").max(50),
      last_name: z.string().min(1, "validation.last-name-required").max(50),
      email: z.string().email("validation.invalid-email"),
      address1: z.string().min(1, "validation.street-address-required").max(200),
      city: z.string().min(1, "validation.city-required").max(100),
      phone: z
        .string()
        .min(1, "validation.phone-required")
        .regex(/^[+]?[- 0-9()]{7,30}$/i, "validation.phone-invalid"),
      use_for_shipping: z.boolean(),
    }),
    shipping: z.object({
      address1: z
        .string()
        .min(1, "validation.street-address-required")
        .max(200)
        .optional()
        .or(z.literal("")),
      city: z
        .string()
        .min(1, "validation.city-required")
        .max(100)
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .min(1, "validation.phone-required")
        .regex(/^[+]?[- 0-9()]{7,30}$/i, "validation.phone-invalid")
        .optional()
        .or(z.literal("")),
    }),
    payment: z.object({
      method: z.enum(["cashondelivery", "creditcard", "paypal"]),
    }),
    shipping_method: z.enum([
      "flatrate_flatrate",
      "freeshipping_freeshipping",
      "tablerate_bestway",
    ]),
  })
  .superRefine((data, ctx) => {
    if (!data.billing.use_for_shipping) {
      if (!data.shipping.address1 || data.shipping.address1.trim() === "") {
        ctx.addIssue({
          path: ["shipping", "address1"],
          code: z.ZodIssueCode.custom,
          message: "validation.street-address-required",
        });
      }
      if (!data.shipping.city || data.shipping.city.trim() === "") {
        ctx.addIssue({
          path: ["shipping", "city"],
          code: z.ZodIssueCode.custom,
          message: "validation.city-required",
        });
      }
      if (!data.shipping.phone || data.shipping.phone.trim() === "") {
        ctx.addIssue({
          path: ["shipping", "phone"],
          code: z.ZodIssueCode.custom,
          message: "validation.phone-required",
        });
      }
    }
  });
