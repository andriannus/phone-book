module.exports = {
  "*.{js,jsx,ts,tsx,vue}": filenames => {
    const onOneLine = filenames.join(" ");
    return `npm run lint -- ${onOneLine}`;
  },
};
