import { createSafeActionClient } from "next-safe-action";

export class BadRequestError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export class UnauthorizedError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export class ForbiddenError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export const actionClient = createSafeActionClient({
    // TODO: add logging
    handleReturnedServerError(e) {
        if (e instanceof BadRequestError) {
            return e.message;
        }

        if (e instanceof UnauthorizedError) {
            return e.message;
        }

        if (e instanceof ForbiddenError) {
            return e.message;
        }

        return "Internal server error occured! Please try again later.";
    },
    defaultValidationErrorsShape: "flattened",
});
