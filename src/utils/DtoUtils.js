function returnDto(code, status, message) {
  return JSON.stringify({
    code: code,
    status: status,
    message: message,
    createdAt: Date.now(),
  });
}

module.exports = { returnDto };
