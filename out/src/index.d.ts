declare enum LineType {
    assignment = "assignment",
    assignmentdef = "assignmentdef",
    comment = "comment",
    error = "error"
}
export declare type ResultLine = StatementLine | null;
declare type ParserError = {
    message: string;
    token: any;
    offset: number;
};
interface StatementLine {
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
interface AssignmentDefinitionLine extends StatementLine {
    lineType: LineType.assignmentdef;
    type: string;
    length: number;
    text: string;
}
export interface I18nValue {
    text: string;
    line: number;
    fileName: string;
    def?: AssignmentDefinitionLine;
    duplicateOf?: string;
    defError?: ParserError;
    error?: ParserError;
}
declare type i18nPropertiesBag = {
    [key: string]: I18nValue;
};
export declare class I18NPropertiesFile {
    private i18nParser;
    private parserDefs;
    private mStartState;
    private mStartStateDef;
    private mFiles;
    private mFileBags;
    private mProperties;
    constructor();
    addFile(sI18nFilePath: string): any;
    removeFile(sI18nFilePath: string): void;
    private _constructMergedFileBag;
    private _parseSingleFile;
    private _parseDefinitions;
    makePropertiesBag(lines: ResultLine[], addToGlobal?: boolean): i18nPropertiesBag;
    clear(): void;
    private _resetParser;
    private _resetDefParser;
    getKeyMap(): i18nPropertiesBag;
    getKeys(): string[];
    get(sKey: string): I18nValue;
    getFromFile(sKey: string, sI18nFilePath: string): I18nValue | undefined;
    getKeysFromFile(sI18nFilePath: string): string[] | undefined;
    getErrorLines(sI18nFilePath: string): ResultLine[] | undefined;
    getContainedFiles(): string[];
    getLine(sI18nFilePath: string, line: number): ResultLine;
}
export {};
