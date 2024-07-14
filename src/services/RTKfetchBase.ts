import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BuildUrl, GetUserAuthToken } from "../helpers";
import { Config } from "../config";
const baseUrl = BuildUrl(Config.baseApiUrl, "/auth");

export const RTKCustomFetchBase = fetchBaseQuery({
  baseUrl,
  headers: {
    Authorization: `Bearer ${GetUserAuthToken()}`,
  },
});
