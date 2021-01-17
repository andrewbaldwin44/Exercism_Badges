const monthMap = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};

const mentorUrl = "https://exercism.io/profiles/";
const EXTRACT_URL = /[url]{3}[(']{2}(.*?)'[)]{1}/;

module.exports = {
  monthMap,
  mentorUrl,
  EXTRACT_URL
};
