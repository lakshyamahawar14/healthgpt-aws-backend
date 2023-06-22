const sendSuccessResponse = (req, res, data, Msg, statusMsg = "success") => {
  console.log(statusMsg);
  res.status(200).json({
    status: statusMsg,
    message: Msg,
    statusCode: 200,
    data: data,
  });
};

const sendFailureResponse = (req, res, Msg, statusMsg = "failure") => {
  console.log(statusMsg);
  res.status(200).json({
    status: statusMsg,
    message: Msg,
    statusCode: 200,
    data: null,
  });
};

export { sendSuccessResponse, sendFailureResponse };
