// @ts-nocheck
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { message } from "antd";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    message.error(
      payload?.data?.error?.message ??
        "Something went wrong while making the request!"
    );
  } else if (isFulfilled(action)) {
    const { payload } = action;
    if (payload?.message) {
      message.success(`${payload.message}`);
    }
  }

  return next(action);
};
