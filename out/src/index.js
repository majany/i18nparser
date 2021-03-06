"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = require("nearley");
const i18nCompGrammar = require("./libs/parser/grammar");
const i18nCompDefinitionGrammar = require("./libs/parser/grammar_asdef");
const fs = require("fs");
var LineType;
(function (LineType) {
    LineType["assignment"] = "assignment";
    LineType["assignmentdef"] = "assignmentdef";
    LineType["comment"] = "comment";
    LineType["error"] = "error";
})(LineType || (LineType = {}));
class I18NPropertiesFile {
    constructor() {
        this.i18nParser = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(i18nCompGrammar));
        this.parserDefs = new nearley_1.Parser(nearley_1.Grammar.fromCompiled(i18nCompDefinitionGrammar));
        this.mStartState = this.i18nParser.save();
        this.mStartStateDef = this.parserDefs.save();
        this.mFiles = {};
        this.mFileBags = {};
        this.mProperties = {};
    }
    addFile(sI18nFilePath) {
        let newLines;
        try {
            newLines = this._parseSingleFile(sI18nFilePath);
        }
        catch (error) {
            this._resetParser();
            return error;
        }
        this.mFiles[sI18nFilePath] = newLines;
        let filePropertiesBag = this.makePropertiesBag(newLines, true);
        this.mFileBags[sI18nFilePath] = filePropertiesBag;
    }
    removeFile(sI18nFilePath) {
        delete this.mFiles[sI18nFilePath];
        delete this.mFileBags[sI18nFilePath];
        this._constructMergedFileBag();
    }
    _constructMergedFileBag() {
        // reconstructs whole properties bag because of possible key collision
        this.mProperties = {};
        for (const sFileName in this.mFileBags) {
            const bag = this.mFileBags[sFileName];
            Object.assign(this.mProperties, bag);
        }
    }
    _parseSingleFile(sI18nFilePath) {
        const i18nFileText = fs.readFileSync(sI18nFilePath, {
            encoding: "utf-8"
        });
        const fileLines = i18nFileText.split(/\r\n|\r|\n/);
        const parsedLines = fileLines.map((line, index) => {
            if (!line) {
                return null;
            }
            try {
                this.i18nParser.feed(line);
            }
            catch (error) {
                this._resetParser();
                return {
                    lineType: LineType.error,
                    error: error,
                    line: index
                };
            }
            if (this.i18nParser.results.length > 1) {
                this._resetParser();
                throw new Error("Fatal Error: Grammar is ambigious!");
            }
            let res = this.i18nParser.results[0];
            this._resetParser();
            return res[1]; // single line result;
        });
        this._parseDefinitions(parsedLines, sI18nFilePath);
        return parsedLines;
    }
    _parseDefinitions(lines, sI18nFilePath) {
        return lines.forEach(line => {
            if (line) {
                line.fileName = sI18nFilePath;
            }
            if (line && line.lineType === LineType.comment) {
                try {
                    this.parserDefs.feed(line.text);
                    let parsedLine = this.parserDefs.results[0];
                    line.text = parsedLine.text;
                    line.type = parsedLine.type;
                    line.lineType = parsedLine.lineType;
                    line.length = parsedLine.length;
                }
                catch (error) {
                    line.defError = error;
                    return;
                }
                finally {
                    this._resetDefParser();
                }
            }
        });
    }
    makePropertiesBag(lines, addToGlobal = false) {
        let bag = {};
        lines.forEach((line, index) => {
            if (line && (line.lineType === "assignment")) {
                let assignmentLine = line;
                let newEntry = {
                    text: assignmentLine.text,
                    line: index,
                    fileName: assignmentLine.fileName
                };
                if (bag[assignmentLine.key]) {
                    // duplicate in same file possible
                    let original = assignmentLine.key;
                    assignmentLine.key = assignmentLine.key + "_duplicate_" + Math.floor((Math.random() * Number.MAX_SAFE_INTEGER));
                    newEntry.duplicateOf = original;
                }
                bag[assignmentLine.key] = newEntry;
                let previousLine = lines[index - 1];
                if (previousLine) {
                    if (previousLine.lineType === LineType.assignmentdef) {
                        bag[assignmentLine.key].def = previousLine;
                    }
                    else if (previousLine.lineType === LineType.comment) {
                        bag[assignmentLine.key].defError = previousLine.defError;
                    }
                }
                if (addToGlobal) {
                    // possible collision of key names over multiple files
                    this.mProperties[assignmentLine.key] = bag[assignmentLine.key];
                    this.mProperties[assignmentLine.key].def = bag[assignmentLine.key].def;
                }
            }
        });
        return bag;
    }
    clear() {
        this.mProperties = {};
        this.mFiles = {};
    }
    _resetParser() {
        this.i18nParser.restore(this.mStartState);
    }
    _resetDefParser() {
        this.parserDefs.restore(this.mStartStateDef);
    }
    getKeyMap() {
        return this.mProperties;
    }
    getKeys() {
        return Object.keys(this.mProperties);
    }
    get(sKey) {
        return this.mProperties[sKey];
    }
    getFromFile(sKey, sI18nFilePath) {
        const bag = this.mFileBags[sI18nFilePath];
        return bag && bag[sKey];
    }
    getKeysFromFile(sI18nFilePath) {
        const bag = this.mFileBags[sI18nFilePath];
        return bag && Object.keys(bag);
    }
    getErrorLines(sI18nFilePath) {
        const bag = this.mFiles[sI18nFilePath];
        return bag && bag.filter(line => line && line.lineType === LineType.error);
    }
    getLine(sI18nFilePath, line) {
        const bag = this.mFiles[sI18nFilePath];
        return bag[line];
    }
    getContainedFiles() {
        return Object.keys(this.mFiles);
    }
}
exports.I18NPropertiesFile = I18NPropertiesFile;
// const i18nPropPath = "./test.properties";
// const i18nPropPathCopy = "./test_copy.properties";
// let props = new I18NPropertiesFile();
// props.addFile(i18nPropPath);
// props.addFile(i18nPropPathCopy);
// props.removeFile(i18nPropPathCopy);
// console.log("done!");
//# sourceMappingURL=index.js.map