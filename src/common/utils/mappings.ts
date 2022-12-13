const toErrorMessage = error => {
  if (error.message) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return JSON.stringify(error);
  }
};

export const toErrorMessages = error => {
  const response = error.response;

  if (!response) {
    return [error.message || error.statusText || error];
  } else if (response.errors) {
    return response.errors.map(toErrorMessage);
  } else if (response.error || response.message) {
    return [toErrorMessage(response.error || response.message)];
  } else if (typeof response === 'string' || typeof response === 'number') {
    return [response.toString()];
  } else {
    return [JSON.stringify(response)];
  }
};
