const axios = require("axios");
const cheerio = require("cheerio");

const { mentorUrl } = require("./common/constants");

async function fetchExercismStats(username) {
  const testimonials = await axios.get(`${mentorUrl}${username}/testimonials`);
  const solutions = await axios.get(`${mentorUrl}${username}/solutions`);

  const $testimonials = cheerio.load(testimonials.data);
  const $solutions = cheerio.load(solutions.data);

  const {
    request: {
      options: {
        initial_data: { results },
      },
    },
    tracks,
  } = JSON.parse(
    $solutions("div.c-react-wrapper-profile-community-solutions-list")[0]
      .attribs["data-react-data"]
  );

  const exerciseCount = tracks.find(({ title }) => title === "All Tracks")[
    "num_solutions"
  ];

  const exercises = results.map(
    ({ published_at: publishedAt, exercise, track }) => {
      return {
        exerciseIcon: exercise.icon_url,
        title: exercise.title,
        track: track.title,
        timestamp: new Date(publishedAt),
      };
    }
  );

  const mentoringStats = $testimonials("div.stat");
  const mentoredCount = $testimonials(mentoringStats[0])
    .find("div.number")
    .text();

  return {
    exercises,
    mentoredCount,
    exerciseCount,
  };
}

module.exports = fetchExercismStats;
