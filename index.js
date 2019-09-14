const nearley = require("nearley");
const grammar = require("./libs/parser/grammar.js");
const assdefgrammar = require("./libs/parser/grammar_asdef");
const fs = require("fs");

class I18NPropertiesFile {

    constructor() {
        this.i18nParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        this.parserDefs = new nearley.Parser(nearley.Grammar.fromCompiled(assdefgrammar));
        this.mStartState = this.i18nParser.save();
        this.mStartStateDef = this.parserDefs.save();
        this.mFiles = {};
        this.mProperties = {};
    }

    addFile(sI18nFilePath) {
        if(this.mFiles[sI18nFilePath]){
            delete this.mFiles[sI18nFilePath];
        }
        let newLines = this._parseSingleFile(sI18nFilePath);
        this.mFiles[sI18nFilePath] = newLines;
        this._addToPropertiesBag(newLines);
    }

    _parseSingleFile(sI18nFilePath){
        const i18nFileText = fs.readFileSync(sI18nFilePath, {
            encoding: "utf-8"
        });
        this.i18nParser.feed(i18nFileText);
        if (this.i18nParser.results.length > 1) {
            throw new Error("Fatal Error: Grammar is ambigious!");
        }
        let newLines = this._getPostProcessedParserResult(this.i18nParser.results, sI18nFilePath);
        this._resetParser();
        return newLines;
    }

    _getPostProcessedParserResult(results, sI18nFilePath) {
        let result = results[0];
        let lines = result[0].slice();
        lines.push(result[1]); // add last line
        this._parseDefinitions(lines, sI18nFilePath);
        return lines;
    }

    _parseDefinitions(lines, sI18nFilePath) {
        return lines.forEach(line => {
            if(line){
                line.fileName = sI18nFilePath;
            }
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

    _addToPropertiesBag(lines) {
        lines.forEach((line, index) => {
            if (line && (line.lineType === "assignment")) {
                this.mProperties[line.key] = { // possible collision of key names over multiple files
                    text: line.text,
                    line: index,
                    fileName: line.fileName
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
    getKeys(){
        return Object.keys(this.mProperties);
    }
    get(sKey){
        return this.mProperties[sKey];
    }
}

exports.I18NPropertiesFile = I18NPropertiesFile;

// const i18nPropPath = "./test.properties"
// let props = new I18NPropertiesFile();
// props.addFile(i18nPropPath);
// console.log("done!");