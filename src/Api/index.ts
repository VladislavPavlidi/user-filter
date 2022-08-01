interface ErrorInterface {
  [x: string]: any;
  message: any;
  abortError?: boolean;
  status?: any;
  data?: any;
}

class API_ERROR extends Error {
  constructor(object: ErrorInterface) {
    super(object.message);
    const { message, ...rest } = object;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context: ErrorInterface = this;
    Object.keys(rest).forEach((key) => {
      context[key] = rest[key];
    });
  }
}

async function get(url: any, options = {}) {
  let response: any;
  try {
    response = await fetch(`${url}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (fetchError: any) {
    if (fetchError.name === "AbortError") {
      throw new API_ERROR({ message: "AbortError", abortError: true });
    }
  }

  if (response?.ok) {
    const data = await response.json();
    return data;
  }

  const { status }: any = response;
  const data = await response.json();

  throw new API_ERROR({ message: data.error, status, data });
}

async function post(url: any, body: any, options = {}, method = "post") {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...options,
  });
  const { status } = response;
  if (response.ok) {
    const data = await response.json();
    if (data.error) {
      throw new API_ERROR({
        message: data.error,
        logicsError: true,
        ...data,
        status,
      });
    }
    return data;
  }
  const data = await response.json();
  throw new API_ERROR({ message: data.error, status, data });
}

export default {
  get,
  post,
};
