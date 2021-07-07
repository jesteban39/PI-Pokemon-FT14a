module.exports = function verifyName(name) {
  name = name
    .toLowerCase()
    .replace(/[^a-z\s\-]/g, "") // elinina todo caracter que no sea alfabetico " " o "-"
    .replace(/\-+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
  if (name.length < 3) return "";
  else return name;
}