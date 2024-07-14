// @ts-nocheck
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "../../components/common/Toast";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    toast({
      title: "Oops!",
      colorScheme: "red",
      position: "top",
      description: payload?.data?.error
        ? payload?.data.error.message
        : "Something Went Wrong! While Making Request!",
    });
  } else if (isFulfilled(action)) {
    const { payload } = action;
    if (payload.message) {
      toast({
        title: "Yay!",
        colorScheme: "green",
        position: "top",
        description: payload.message,
      });
    }
  }

  return next(action);
};
