import { FlagpoleExecution, HttpResponse } from "flagpole";
import { KeyValue } from "flagpole/dist/interfaces/generic-types";
import { HttpRequestFetch, iHttpRequest } from "flagpole/dist/interfaces/http";
import needle = require("needle");

export const CONTENT_TYPE_GRAPHQL = "application/graphql";
export const CONTENT_TYPE_JSON = "application/json";
export const CONTENT_TYPE_FORM_MULTIPART = "multipart/form-data";
export const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";
export const ENCODING_GZIP = "gzip,deflate";

export const getNeedleOptions = (
  request: iHttpRequest
): needle.NeedleOptions => {
  return {
    agent: request.proxyAgent,
    auth: request.authType,
    compressed: request.headers["Accept-Encoding"] === ENCODING_GZIP,
    cookies: request.cookies,
    follow_max: request.maxRedirects,
    headers: request.headers,
    json: true,
    open_timeout: request.timeout.open,
    output: request.outputFile,
    parse_cookies: true,
    parse_response: false,
    password: request.auth?.password,
    read_timeout: request.timeout.read,
    rejectUnauthorized: request.verifyCert,
    username: request.auth?.username,
    user_agent: "Flagpole",
  };
};

export const fetchWithNeedle: HttpRequestFetch = async (
  request: iHttpRequest,
  opts?: KeyValue
): Promise<HttpResponse> => {
  if (request.options.cacheKey) {
    const response = FlagpoleExecution.global.getCache(
      request.options.cacheKey
    );
    if (response !== null) {
      return response as HttpResponse;
    }
  }
  const rawResponse = await needle(
    "post",
    request.uri || "/",
    request.data || null,
    getNeedleOptions(request)
  );
  const response = HttpResponse.fromNeedle(rawResponse);
  if (request.options.cacheKey) {
    FlagpoleExecution.global.setCache(request.options.cacheKey, response);
  }
  return response;
};
