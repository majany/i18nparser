type keyDefinition = {
    text: string;
    lineType: "assignmentdef";
    type: string;
    length: number;
    fileName: string;
}

type i18nValue = {
    text: string;
    line: number;
    fileName: string;
    def?: keyDefinition;
};

declare class I18NPropertiesFile {
    constructor();
    addFile(file: string): Error;
    clear(): void;
    getKeyMap(): object;
    getKeys(): string[];
    get(key: string): i18nValue;
}
export { I18NPropertiesFile, i18nValue, keyDefinition };
