// TODO find a good path
export const findById = (data, id) => data.find((item) => item.id === id);

export const isNil = (value) => typeof value === "undefined" || value === null;

export const isNumber = (value) => typeof value == "number" && !isNaN(value);

export const isBoolean = (value) => value === true || value === false;

export const isString = (value) =>
  typeof value === "string" || value instanceof String;

export const isDateString = (value) => {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
};

export const convertType = (value) => {
  if (isNumber(value)) {
    return value.toString();
  }

  if (isDateString(value)) {
    return convertDateString(value);
  }

  if (isBoolean(value)) {
    return value ? "1" : "-1";
  }

  return value;
};

export const convertDateString = (value) =>
  value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);

export const sortRows = (data, orderBy, order) => {
  return data.sort((a, b) => {
    if (isNil(a[orderBy])) return 1;
    if (isNil(b[orderBy])) return -1;

    const aLocale = convertType(a[orderBy]);
    const bLocale = convertType(b[orderBy]);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
};

export const loadData = (rows, index) => {
  if (index > rows.length) index = rows.length;
  return [...rows].slice(0, index);
};
