const nearley = require("nearley");
const grammar = require("./grammar.js");
const assdefgrammar = require("./grammar_asdef");
const fs = require("fs");

class I18NPropertiesFile {

    i18nParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar))
    mLines = []
    mProperties = {}

    constructor() {
        this.mStartState = this.i18nParser.save();
        this.mStartStateDef = this.parserDefs.save();
    }

    addFile(sI18nFilePath) {
        const i18nFileText = fs.readFileSync(sI18nFilePath, {
            encoding: "utf-8"
        });
        this.i18nParser.feed(i18nFileText);
        this._resetParser();

        if (this.i18nParser.results.length > 1) {
            throw new Error("Fatal Error: Grammar is ambigious!");
        }
        let result = this.i18nParser.results[0];
        let lines = result[0].slice();
        lines.push(result[1]); // add last line
        this.mLines = this._parseDefinitions(lines);
        this._addToPropertiesBag(this.mLines);
    }

    _parseDefinitions(lines){
        return lines.forEach(line => {
            if (line && line.lineType === "comment") {
                try {
                    this.parserDefs.feed(line.text);
                    console.log("is a definition!")
                    let def = this.parserDefs.results[0];
                    line.text = def.text;
                    line.type = def.type;
                    line.lineType = def.lineType;
                    line.length = def.length;
                    this.parserDefs.restore(this.mStartStateDef)
                } catch (error) {
                    console.log("Is not a definition!");
                    // TODO: find out where the error is and save it
                    this.parserDefs.restore(this.mStartStateDef);
                    return;
                }
            }
        });
    }

    _addToPropertiesBag(lines) {
        this.mLines.forEach( (line, index) => {
            if(line.lineType === "assignment"){
                this.mProperties[line.key] = {
                    text: line.text,
                    line: index,
                    fileName: "TODO: insert name"
                };
            }
        });
    }

    clear() {
        this.mProperties = {};
    }

    _resetParser() {
        this.i18nParser.restore(this.mStartState);
    }
}




const i18nPropPath = "./test.properties"
const i18nText = fs.readFileSync(i18nPropPath, {
    encoding: "utf-8"
});

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse something!
parser.feed(i18nText);

if (parser.results.length > 1) {
    throw new Error("Grammar is ambigious!")
}
var res = parser.results[0]
var lines = res[0].slice();
lines.push(res[1]);


let parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar))
let startState = parserDefs.save();


lines.forEach(line => {
    if (line && line.lineType === "comment") {
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


console.log(lines);
