import { z } from "zod";

export const ZBook = z.object({
  name: z.string().max(100),
  userId: z.string(),
});

export type TBook = z.infer<typeof ZBook>;
