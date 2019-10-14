import { Parser, Grammar } from "nearley";
import * as i18nCompGrammar from "./libs/parser/grammar";
import * as i18nCompDefinitionGrammar from "./libs/parser/grammar_asdef";
import * as fs from 'fs';

enum LineType {
    assignment = "assignment",
    assignmentdef = "assignmentdef",
    comment = "comment",
    error = "error"
}

export type ResultLine = StatementLine | null;

type ParserError = {
    message: string;
    token: any;
    offset: number;
};

export interface StatementLine {
    lineType: LineType;
    fileName?: string;
    line?: number;
    type?: string;
    length?: number;
    text?: string;
    key?: string;
    defError?: ParserError;
    error?: ParserError;
}

interface CommentLine extends StatementLine {
    lineType: LineType.comment;
    text: string;
    defError?: ParserError;
}

interface AssignmentLine extends StatementLine {
    lineType: LineType.assignment;
    key: string;
    text: string;
}

interface AssignmentDefinitionLine extends StatementLine {
    lineType: LineType.assignmentdef;
    type: string;
    length: number;
    text: string;
}

interface ErrorLine extends StatementLine {
    lineType: LineType.error;
    error: ParserError;
}


type i18nParserResult = Array<ResultLine[] | ResultLine>;

export interface I18nValue {
    text: string;
    line: number;
    fileName: string;
    def?: AssignmentDefinitionLine;
    duplicateOf?: string;
    defError?: ParserError;
    error?: ParserError;
}

type i18nPropertiesBag = { [key: string]: I18nValue };

export class I18NPropertiesFile {


    private i18nParser: Parser;
    private parserDefs: Parser;
    private mStartState: any;
    private mStartStateDef: any;
    private mFiles: { [key: string]: ResultLine[]; };
    private mFileBags: { [key: string]: i18nPropertiesBag; };
    private mProperties: i18nPropertiesBag;

    constructor() {
        this.i18nParser = new Parser(Grammar.fromCompiled(i18nCompGrammar));
        this.parserDefs = new Parser(Grammar.fromCompiled(i18nCompDefinitionGrammar));
        this.mStartState = this.i18nParser.save();
        this.mStartStateDef = this.parserDefs.save();
        this.mFiles = {};
        this.mFileBags = {};
        this.mProperties = {};
    }

    addFile(sI18nFilePath: string) {
        let newLines;
        try {
            newLines = this._parseSingleFile(sI18nFilePath);
        } catch (error) {
            this._resetParser();
            return error;
        }

        this.mFiles[sI18nFilePath] = newLines;
        let filePropertiesBag = this.makePropertiesBag(newLines, true);
        this.mFileBags[sI18nFilePath] = filePropertiesBag;
    }

    removeFile(sI18nFilePath: string) {
        delete this.mFiles[sI18nFilePath];
        delete this.mFileBags[sI18nFilePath];
        this._constructMergedFileBag();
    }

    private _constructMergedFileBag() {
        // reconstructs whole properties bag because of possible key collision
        this.mProperties = {};
        for (const sFileName in this.mFileBags) {
            const bag = this.mFileBags[sFileName];
            Object.assign(this.mProperties, bag);
        }
    }

    private _parseSingleFile(sI18nFilePath: string) {
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
            } catch (error) {
                this._resetParser();
                return {
                    lineType: LineType.error,
                    error: error as ParserError,
                    line: index
                } as ErrorLine;
            }
            if (this.i18nParser.results.length > 1) {
                this._resetParser();
                throw new Error("Fatal Error: Grammar is ambigious!");
            }
            let res = this.i18nParser.results[0];
            this._resetParser();
            return res[1] as ResultLine; // single line result;
        });

        this._parseDefinitions(parsedLines, sI18nFilePath);
        return parsedLines;
    }


    private _parseDefinitions(lines: ResultLine[], sI18nFilePath: string) {
        return lines.forEach(line => {
            if (line) {
                line.fileName = sI18nFilePath;
            }
            if (line && line.lineType === LineType.comment) {
                try {
                    this.parserDefs.feed((line as CommentLine).text);
                    let parsedLine = this.parserDefs.results[0] as AssignmentDefinitionLine;
                    line.text = parsedLine.text;
                    line.type = parsedLine.type;
                    line.lineType = parsedLine.lineType;
                    line.length = parsedLine.length;

                } catch (error) {
                    line.defError = error as ParserError;
                    return;
                } finally {
                    this._resetDefParser();
                }
            }
        });
    }

    makePropertiesBag(lines: ResultLine[], addToGlobal: boolean = false): i18nPropertiesBag {
        let bag: i18nPropertiesBag = {};
        lines.forEach((line, index) => {
            if (line && (line.lineType === "assignment")) {
                let assignmentLine = line as AssignmentLine;

                let newEntry: I18nValue = {
                    text: assignmentLine.text,
                    line: index,
                    fileName: assignmentLine.fileName as string
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
                        bag[assignmentLine.key].def = previousLine as AssignmentDefinitionLine;
                    } else if (previousLine.lineType === LineType.comment) {
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

    private _resetParser() {
        this.i18nParser.restore(this.mStartState);
    }

    private _resetDefParser() {
        this.parserDefs.restore(this.mStartStateDef);
    }


    getKeyMap() {
        return this.mProperties;
    }
    getKeys() {
        return Object.keys(this.mProperties);
    }

    get(sKey: string) {
        return this.mProperties[sKey];
    }

    getFromFile(sKey: string, sI18nFilePath: string): I18nValue | undefined {
        const bag = this.mFileBags[sI18nFilePath];
        return bag && bag[sKey];
    }

    getKeysFromFile(sI18nFilePath: string): string[] | undefined {
        const bag = this.mFileBags[sI18nFilePath];
        return bag && Object.keys(bag);
    }

    getErrorLines(sI18nFilePath: string) : ResultLine[] | undefined {
        const bag = this.mFiles[sI18nFilePath];
        return bag && bag.filter( line => line && line.lineType === LineType.error);
    }

    getLine(sI18nFilePath: string, line: number) : ResultLine | undefined {
        const bag = this.mFiles[sI18nFilePath];
        return bag[line];
    }

    getContainedFiles() : string[]{
        return Object.keys(this.mFiles);
    }
}


// const i18nPropPath = "./test.properties";
// const i18nPropPathCopy = "./test_copy.properties";
// let props = new I18NPropertiesFile();
// props.addFile(i18nPropPath);
// props.addFile(i18nPropPathCopy);
// props.removeFile(i18nPropPathCopy);
// console.log("done!");