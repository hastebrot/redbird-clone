const hmrPollIntervalMillis = 250;
let lastTimestampText = null;
const checkTimestamp = (next) => {
  fetch("/hmr", { method: "get" })
    .then((res) => res.text())
    .then((text) => {
      if (text === null || text === "") {
        next();
        return;
      }
      if (lastTimestampText !== null && lastTimestampText !== text) {
        location.reload();
      }
      lastTimestampText = text;
      next();
    })
    .catch(() => next());
};
addEventListener("DOMContentLoaded", () => {
  const next = () => {
    setTimeout(() => {
      checkTimestamp(next);
    }, hmrPollIntervalMillis);
  };
  next();
});
