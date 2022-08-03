export function set(key: string, value: string) {
  let tmpValue = value;
  if (typeof value === "object") {
    tmpValue = JSON.stringify(value);
  }
  localStorage.setItem(key, tmpValue);
}

export function get(key: string) {
  const data: string | null = localStorage.getItem(key);
  let parsedData;
  try {
    if (data) {
      parsedData = JSON.parse(data);
    } else {
      parsedData = data;
    }
  } catch (error) {
    parsedData = data;
  }
  return parsedData;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
