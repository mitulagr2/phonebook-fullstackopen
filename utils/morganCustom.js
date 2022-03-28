const customFormat = (tokens, req, res) => {
  let method = tokens.method(req, res);
  return [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    method === "POST" ? JSON.stringify(req.body) : "",
  ].join(" ");
};

module.exports = customFormat;
