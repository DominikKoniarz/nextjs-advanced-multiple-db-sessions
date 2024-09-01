import { z } from "zod";

const invalidateSessionSchema = z.object({
    sessionId: z.string().min(1, { message: "Session ID is required" }),
});

export default invalidateSessionSchema;
