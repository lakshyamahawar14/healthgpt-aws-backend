import { fetchArticles, fetchNews } from "../data/dao/newsDao.mjs";
import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../middlewares/responseHandler.mjs";

const getNews = async (req, res) => {
  try {
    let searchQuery = req.query.searchQuery;
    let numberOfResults = req.query.numberOfResults || 5;

    if (!searchQuery) {
      return sendNoParametersSentError(req, res, "error");
    }

    fetchArticles(req, res, searchQuery, numberOfResults)
      .then((response) => {
        let articles = response;
        return sendSuccessResponse(
          req,
          res,
          { articles: articles },
          "News Fetched Successfully",
          "success"
        );
      })
      .catch((error) => {
        return sendFailureResponse(req, res, error.message, "failure");
      });
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

export { getNews };
