const nearley = require("nearley");
const grammar = require("./grammar_asdef");
let fs = require("fs");

// const i18nPropPath = "./def.txt"
// const def = fs.readFileSync(i18nPropPath, { encoding: "utf-8" });

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed("#XBUT: hallo test");

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results)); 
