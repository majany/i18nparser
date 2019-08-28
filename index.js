const nearley = require("nearley");
const grammar = require("./grammar.js");
const assdefgrammar = require("./grammar_asdef");
let fs = require("fs");

const i18nPropPath = "./test.properties"
const i18nText = fs.readFileSync(i18nPropPath, { encoding: "utf-8" });

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed(i18nText);

if(parser.results.length > 1){
    throw new Error("Grammar is ambigious!")
}
var res = parser.results[0]
var lines = res[0].slice();
lines.push(res[1]);


let parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar))
let startState = parserDefs.save();


lines.forEach(line => {
    if(line && line.lineType === "comment"){
        try {
            parserDefs.feed(line.text);
            console.log("Did good!")
            let def = parserDefs.results[0];
            line.text = def.text;
            line.type = def.type;
            line.lineType = def.lineType;
            line.length = def.length;
            parserDefs.restore(startState)
        } catch (error) {
            // console.log(error.message);
            console.log("Did fail!");
            parserDefs.restore(startState);
            return;
        }
    }
});


// parser.results is an array of possible parsings.
console.log(JSON.stringify(lines)); 
