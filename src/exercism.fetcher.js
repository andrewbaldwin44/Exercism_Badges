const axios = require("axios");
const cheerio = require("cheerio");

const { monthMap, mentorUrl, EXTRACT_URL } = require("./common/constants");

const compareSolutionsByDate = (a, b) =>
  b.timestamp.getTime() - a.timestamp.getTime();

async function fetchExercismStats(username) {
  const response = await axios.get(`${mentorUrl}${username}`);

  const $ = cheerio.load(response.data);

  let starCount = 0

  const exercises = $("a.solution")
    .map((_i, exercise) => {
      const el$ = $(exercise);
      const date = el$.find("div.published-at").text().trim().split(" ");
      const exerciseIcon = el$.find("div.img").css("background-image").match(EXTRACT_URL)[1];

      starCount += Number(el$.find("div.details").children().last().text());

      return {
        exerciseIcon,
        title: el$.find("div.title").text(),
        track: el$.find("div.track").text().slice(0, -6),
        timestamp: new Date(`${date[2]}-${monthMap[date[0]]}-${date[1]}`),
      };
    })
    .toArray();

  exercises.sort(compareSolutionsByDate);

  const mentoredCount = $("div.count").text();

  return {
    exercises,
    mentoredCount,
    starCount,
  }
}

module.exports = fetchExercismStats;
