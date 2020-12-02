const Card = require("../common/Card");
const { getStyles } = require("../getStyles");
const {
  isEmpty,
  kFormatter,
  getCardColors,
  FlexLayout,
} = require("../common/utils");

const createImageNode = href => {
  return `
    <image href="${href}" />
  `;
};

const createTextNode = ({ label, value, index }) => {
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;

  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5">${label}:</text>
      <text
        class="stat"
        x="140"
        y="12.5"
      >
        ${kValue}
      </text>
    </g>
  `;
};

const createExerciseNode = (
  { exerciseIcon, title, track },
  index,
  show_icons,
) => {
  const bulletPoint = show_icons ? createImageNode(exerciseIcon) : "•";

  return `
    <g transform="translate(55, 0)">
      <text class="stat" y="92.5">
        ${bulletPoint} ${title} in ${track}
      </text>
    </g>
  `;
};

const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const { exercises, mentoredCount, starCount } = stats;

  const {
    hide = [],
    show_icons = false,
    hide_title = false,
    hide_border = false,
    include_all_commits = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme = "default",
    custom_title,
    disable_animations = false,
  } = options;

  const lheight = parseInt(line_height, 10);

  // returns theme based colors with proper overrides and defaults
  const { titleColor, textColor, iconColor, bgColor } = getCardColors({
    title_color,
    icon_color,
    text_color,
    bg_color,
    theme,
  });

  // Meta data for creating text nodes with createTextNode function
  const STATS = {
    stars: {
      label: "Total Stars",
      value: starCount,
    },
    mentored: {
      label: "Total Mentored",
      value: mentoredCount,
    },
  };

  // filter out hidden stats defined by user & create the text nodes
  const statNodes = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({
        ...STATS[key],
        index,
      })
    );

  const exerciseNodes = exercises.map((exercise, index) =>
    createExerciseNode(exercise, index, show_icons)
  );

  const statsHeight = statNodes.length * lheight;
  const exercisesHeight = isEmpty(exerciseNodes) ? 0 : exerciseNodes.length + 1;
  const cardHeight = 45 + (statNodes.length + exercisesHeight + 1) * lheight;
  const staggerDelay = (statNodes.length + 3) * 150;

  const cssStyles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
  });

  const card = new Card({
    customTitle: custom_title,
    defaultTitle: "Exercism Stats",
    width: 495,
    height: cardHeight,
    colors: {
      titleColor,
      textColor,
      iconColor,
      bgColor,
    },
  });

  card.setHideBorder(hide_border);
  card.setHideTitle(hide_title);
  card.setCSS(cssStyles);

  if (disable_animations) card.disableAnimations();

  return card.render(`
    <svg x="0" y="0">
      ${FlexLayout({
        items: statNodes,
        gap: lheight,
      }).join("")}
      ${!isEmpty(exerciseNodes) && `
        <g class="stagger" style="animation-delay: ${staggerDelay}ms">
          <text
            class="stat"
            x="25"
            y="${statsHeight + 0.5 * lheight}"
          >
            Recent Exercises:
          </text>
          ${FlexLayout({
            items: exerciseNodes,
            gap: lheight,
          }).join("")}
        </g>
      `}
    </svg>
  `);
};

module.exports = renderStatsCard;
