const nearley = require("nearley");
const grammar = require("./grammar.js");
let fs = require("fs");

const i18nPropPath = "./test.properties"
const i18nText = fs.readFileSync(i18nPropPath, { encoding: "utf-8" });

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed(i18nText);

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results)); 