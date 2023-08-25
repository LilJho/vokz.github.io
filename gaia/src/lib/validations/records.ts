import * as z from "zod";

export const RecordSchema = z.object({
  preview: z.string().nonempty({ message: "Image is Required!" }),
  file: z.any(),
});
