import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "vars",
  ".env"
);

dotenv.config({ path: envPath });

import NewsAPI from "newsapi";
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = async (req, res, searchQuery, numberOfResults) => {
  const response = await newsapi.v2.everything({
    q: searchQuery,
    language: "en",
    pageSize: numberOfResults,
  });
  return response.articles;
};

import puppeteer from 'puppeteer';

const fetchArticles = async (req, res, searchQuery, numberOfResults) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (resourceType === 'document') {
        request.continue();
      } else {
        request.abort();
      }
    });
    const url = `https://www.everydayhealth.com/search/?q=${searchQuery}&updateesi=true`;
    const articleTag = '.result-item';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate((articleTag, numberOfResults) => {
      const articleElements = Array.from(document.querySelectorAll(articleTag)).slice(0, numberOfResults);
      const data = [];
      for (const articleElement of articleElements) {
        const titleElement = articleElement.querySelector('.result-item__title > a');
        const descriptionElement = articleElement.querySelector('.result-item__description');
        const dateElement = articleElement.querySelector('.result-item__date');
        const title = titleElement ? titleElement.textContent.trim() : '';
        const url = titleElement ? titleElement.href : '';
        const description = descriptionElement ? descriptionElement.textContent.trim() : '';
        const date = dateElement ? dateElement.textContent.trim() : '';
        data.push({ title, url, description, date });
      }
      return data;
    }, articleTag, numberOfResults);
    await browser.close();
    return data;
  } catch (error) {
    console.error('Error scraping page:', error);
    throw new Error('An error occurred while scraping the page.');
  }
}

export { fetchNews, fetchArticles };
