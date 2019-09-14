const nearley = require("nearley");
const grammar = require("./grammar.js");
const assdefgrammar = require("./grammar_asdef");
const fs = require("fs");

class I18NPropertiesFile {

    constructor() {
        this.i18nParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        this.parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar));
        this.mStartState = this.i18nParser.save();
        this.mStartStateDef = this.parserDefs.save();
        this.mLines = [];
        this.mProperties = {};
    }

    addFile(sI18nFilePath) {
        const i18nFileText = fs.readFileSync(sI18nFilePath, {
            encoding: "utf-8"
        });
        this.i18nParser.feed(i18nFileText);
        if (this.i18nParser.results.length > 1) {
            throw new Error("Fatal Error: Grammar is ambigious!");
        }
        this.mLines = this._getPostProcessedParserResult(this.i18nParser.results);
        this._resetParser();
        this._addToPropertiesBag(this.mLines, sI18nFilePath);
    }

    _getPostProcessedParserResult(results) {
        let result = results[0];
        let lines = result[0].slice();
        lines.push(result[1]); // add last line
        this._parseDefinitions(lines);
        return lines;
    }

    _parseDefinitions(lines) {
        return lines.forEach(line => {
            if (line && line.lineType === "comment") {
                try {
                    this.parserDefs.feed(line.text);
                    console.log("Is a definition!")
                    let def = this.parserDefs.results[0];
                    line.text = def.text;
                    line.type = def.type;
                    line.lineType = def.lineType;
                    line.length = def.length;
                    this._resetDefParser();
                } catch (error) {
                    console.log("Is not a definition!");
                    // TODO: find out where the error is and save it
                    this._resetDefParser();
                    return;
                }
            }
        });
    }

    _addToPropertiesBag(lines, sI18nFilePath) {
        lines.forEach((line, index) => {
            if (line && (line.lineType === "assignment")) {
                this.mProperties[line.key] = {
                    text: line.text,
                    line: index,
                    fileName: sI18nFilePath
                };
                let previousLine = lines[index - 1];
                if (previousLine && previousLine.lineType === "assignmentdef") {
                    this.mProperties[line.key].def = previousLine;
                }
            }
        });
    }

    clear() {
        this.mProperties = {};
        this.mLines = [];
    }

    _resetParser() {
        this.i18nParser.restore(this.mStartState);
    }

    _resetDefParser() {
        this.parserDefs.restore(this.mStartStateDef);
    }

    getLines() {
        return this.mLines.slice();
    }

    getKeyMap() {
        return this.mProperties;
    }
}


const i18nPropPath = "./test.properties"

let props = new I18NPropertiesFile();

props.addFile(i18nPropPath);

console.log(JSON.stringify(props.mLines));


// const i18nText = fs.readFileSync(i18nPropPath, {
//     encoding: "utf-8"
// });

// // Create a Parser object from our grammar.
// const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// // Parse something!
// parser.feed(i18nText);

// if (parser.results.length > 1) {
//     throw new Error("Grammar is ambigious!")
// }
// var res = parser.results[0]
// var lines = res[0].slice();
// lines.push(res[1]);


// let parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar))
// let startState = parserDefs.save();


// lines.forEach(line => {
//     if (line && line.lineType === "comment") {
//         try {
//             parserDefs.feed(line.text);
//             console.log("Did good!")
//             let def = parserDefs.results[0];
//             line.text = def.text;
//             line.type = def.type;
//             line.lineType = def.lineType;
//             line.length = def.length;
//             parserDefs.restore(startState)
//         } catch (error) {
//             // console.log(error.message);
//             console.log("Did fail!");
//             parserDefs.restore(startState);
//             return;
//         }
//     }
// });


// console.log(lines);
