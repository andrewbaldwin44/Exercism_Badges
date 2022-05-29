const {
  renderError,
  parseBoolean,
  parseArray,
  clampValue,
  CONSTANTS,
} = require("../src/common/utils");
const fetchExercismStats = require("../src/exercism.fetcher");

const renderStatsCard = require("../src/cards/stats-card");

const DEFAULT_AMOUNT = 4;

module.exports = async (req, res) => {
  const {
    username,
    amount = DEFAULT_AMOUNT,
    hide,
    hide_title,
    hide_border,
    show_icons,
    line_height,
    title_color,
    text_color,
    bg_color,
    theme,
    cache_seconds,
    custom_title,
    disable_animations,
  } = req.query;

  res.setHeader("Content-Type", "image/svg+xml");

  try {
    const exercismStats = await fetchExercismStats(username);
    exercismStats.exercises = [...exercismStats.exercises.slice(0, amount)];

    const cacheSeconds = clampValue(
      parseInt(cache_seconds || CONSTANTS.TWO_HOURS, 10),
      CONSTANTS.TWO_HOURS,
      CONSTANTS.ONE_DAY
    );

    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);

    return res.send(
      renderStatsCard(exercismStats, {
        hide: parseArray(hide),
        show_icons: parseBoolean(show_icons),
        hide_title: parseBoolean(hide_title),
        hide_border: parseBoolean(hide_border),
        line_height,
        title_color,
        text_color,
        bg_color,
        theme,
        custom_title,
        disable_animations: parseBoolean(disable_animations),
      })
    );
  } catch (error) {
    return res.send(renderError(error.message, error.secondaryMessage));
  }
};
