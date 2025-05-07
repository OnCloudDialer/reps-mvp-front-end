import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { GetUserAuthToken } from "../helpers";
import { Config } from "../config";
const baseUrl = Config.baseApiUrl;

export const RTKCustomFetchBase = fetchBaseQuery({
  baseUrl,
  headers: {
    Authorization: `Bearer ${GetUserAuthToken()}`,
  },
});
