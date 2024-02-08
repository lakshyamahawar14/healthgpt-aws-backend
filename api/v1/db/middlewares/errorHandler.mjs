export const sendInvalidRouteError = (req, res, statusMsg = "error") => {
  console.log("error");
  res
    .status(404)
    .json({ status: statusMsg, message: "Not Found", statusCode: 404 });
};

export  const sendNoParametersSentError = (req, res, statusMsg = "error") => {
  console.log(statusMsg);
  res.status(400).json({
    status: statusMsg,
    message: "Bad Request - No Parameters Sent",
    statusCode: 400,
  });
};

export const sendInternalServerError = (req, res, statusMsg = "error") => {
  console.log(statusMsg);
  res.status(500).json({
    status: statusMsg,
    message: "Internal Server Error",
    statusCode: 500,
  });
};
