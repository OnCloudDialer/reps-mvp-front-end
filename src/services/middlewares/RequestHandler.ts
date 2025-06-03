// @ts-nocheck
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    toast.error(
      payload?.data?.error?.message ??
        "Something went wrong while making the request!"
    );
  } else if (isFulfilled(action)) {
    const { payload } = action;
    if (payload?.message) {
      toast.success(`${payload.message}`);
    }
  }

  return next(action);
};
