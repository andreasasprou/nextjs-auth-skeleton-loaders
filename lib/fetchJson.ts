export class CustomError extends Error {
  response: Response;
  data?: any;

  constructor(message) {
    super(message);
  }
}

export const fetchJson: <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<JSON> = async (...args) => {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new CustomError(response.statusText);

    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }

    throw error;
  }
};
