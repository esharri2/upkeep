const defaults = (token) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //todo not sure?
  };
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }
  return defaultOptions;
};

const getDefaults = {
  method: "GET",
};

const postDefaults = {
  method: "POST",
};

const deleteDefaults = {
  method: "DELETE",
};

const getOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...getDefaults, ...options };
};

const postOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...postDefaults, ...options };
};

const deleteOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...deleteDefaults, ...options };
};

const handleResponse = async (response) => {
  let json;
  try {
    json = await response.json();
  } catch (error) {
    console.error(error);
    console.error("Response does not contain json.");
    throw new Error();
  }
  if (!response.ok) throw json;
  return json;
};

// AUTH / ACCOUNT

export const postLogin = async (token, body) => {
  const response = await fetch("/api/login", postOptions(body, token));
  return await handleResponse(response);
};

export const postSignUp = async (body) => {
  const response = await fetch("/api/account", postOptions(body));
  return await handleResponse(response);
};

export const postPassword = async (token, body) => {
  const response = await fetch("/api/password", postOptions(body, token));
  return await handleResponse(response);
};

export const postForgotPassword = async (body) => {
  const response = await fetch("/api/forgot-password", postOptions(body));
  return await handleResponse(response);
};

export const postResetPassword = async (body) => {
  const response = await fetch("/api/reset-password", postOptions(body));
  return await handleResponse(response);
};

export const deleteAccount = async (token, email) => {
  const response = await fetch(
    `/api/account/${email}`,
    deleteOptions(null, token)
  );
  return await handleResponse(response);
};
// END AUTH / ACCOUNT

// REFRESH TOKEN

export const getToken = async () => {
  const response = await fetch("/api/token", getOptions());
  return await handleResponse(response);
};

// DASHBOARD

export const getDashboard = async (path, token) => {
  const response = await fetch(path, getOptions(null, token));
  return await handleResponse(response);
};

// ASSETS

export const getAssets = async (path, token) => {
  const response = await fetch(path, getOptions(null, token));
  return await handleResponse(response);
};

export const postAssets = async (token, body, id) => {
  const response = await fetch(
    `/api/assets${id ? `/${id}` : ""}`,
    postOptions(body, token)
  );
  return await handleResponse(response);
};

// TASKS

export const getTasks = async (path, token) => {
  debugger;
  const response = await fetch(path, getOptions(null, token));
  return await handleResponse(response);
};

export const postTasks = async (token, body, taskId, assetId = "") => {
  const response = await fetch(
    `/api/tasks${taskId ? `/${taskId}?assetId=${assetId}` : ""}`,
    postOptions(body, token)
  );
  return await handleResponse(response);
};

// INSTANCES

export const postInstances = async (token, body, taskId) => {
  const response = await fetch(
    `/api/instances?taskId=${taskId}`,
    postOptions(body, token)
  );
  return await handleResponse(response);
};
