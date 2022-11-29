import { z } from "zod";

export const ZBook = z.object({
  id: z.number(),
  name: z.string().max(100),
  author: z.string(),
});

export type TBook = z.infer<typeof ZBook>;
