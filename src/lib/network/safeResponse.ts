import z from "zod";

export const safeResponse = <T>(data: unknown, schema: z.ZodType<T>): T => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("서버 응답이 예상과 다릅니다");
  }

  return parsed.data;
};
