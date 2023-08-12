import * as z from "zod";

export const RecordSchema = z.object({
  fileName: z.string().nonempty({ message: "Image is Required!" }),
  file: z.string().nonempty({ message: "Image is Required!" }),
});
