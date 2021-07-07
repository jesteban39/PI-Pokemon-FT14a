module.exports = function toNum(num) {
  num = new String(num);
  num = parseInt(num.replace(/[^0-9]/g, ""));
  if (!num || num <= 0 || num >= 1000) num = 1;
  return num;
};
