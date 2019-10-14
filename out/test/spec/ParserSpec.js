"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../src/index");
describe("I18NPropertiesFile", function () {
    let propertiesFile;
    const i18ntestFilesPath = "./test/spec/test.properties";
    const i18ntestFiles2Path = "./test/spec/test_copy.properties";
    const i18ntesFilesEmptyPath = "./test/spec/test2.properties";
    const propertyKeys = [
        "blup",
        "blap",
        "test",
        "buttonText_hallo",
        "buttonTest",
        "button|test|C_something|blup",
        "butonText",
        "mySuperButton"
    ];
    beforeEach(function () {
        propertiesFile = new index_1.I18NPropertiesFile();
        propertiesFile.addFile(i18ntestFilesPath);
    });
    it("should be able to add a file", function () {
        expect(propertiesFile.getKeys().length).toBe(10);
        expect(propertiesFile.getKeys()).toEqual(jasmine.arrayContaining(propertyKeys));
    });
    it("should be able to get the added file path", function () {
        expect(propertiesFile.getContainedFiles().length).toBe(1);
        expect(propertiesFile.getContainedFiles()[0]).toBe(i18ntestFilesPath);
    });
    it("should be able to add an empty file", function () {
        propertiesFile.addFile(i18ntesFilesEmptyPath);
        expect(propertiesFile.getKeys().length).toBe(10);
        expect(propertiesFile.getContainedFiles().length).toBe(2);
        expect(propertiesFile.getContainedFiles()).toEqual(jasmine.arrayWithExactContents([
            i18ntestFilesPath,
            i18ntesFilesEmptyPath
        ]));
    });
    it("should be able to get the value of a key", function () {
        expect(propertiesFile.get("test")).toEqual(jasmine.objectContaining({
            text: "123",
            line: 6
        }));
    });
    it("should be able to get all error lines for a file", function () {
        // When
        let errorLines = propertiesFile.getErrorLines(i18ntestFilesPath);
        // Then
        expect(errorLines).toBeDefined();
        if (errorLines) {
            const errorLine = {
                lineType: "error",
                line: 22
            };
            expect(errorLines.length).toBe(1);
            expect(errorLines[0]).toEqual(jasmine.objectContaining(errorLine));
        }
    });
    it("should be able to remove properties from a file", function () {
        // When
        propertiesFile.removeFile(i18ntestFilesPath);
        let errorLines = propertiesFile.getErrorLines(i18ntestFilesPath);
        // Then
        expect(propertiesFile.getKeys().length).toBe(0);
        expect(errorLines).toBeUndefined();
    });
    describe("adding a second file", function () {
        it("should overwrite existing properties", function () {
            // When
            propertiesFile.addFile(i18ntestFiles2Path);
            // Then
            expect(propertiesFile.get("test")).toEqual(jasmine.objectContaining({
                text: "2123",
                line: 6
            }));
        });
        it(" and removing the second file should restore overwritten values", function () {
            // When
            propertiesFile.removeFile(i18ntestFiles2Path);
            // Then
            expect(propertiesFile.get("test")).toEqual(jasmine.objectContaining({
                text: "123",
                line: 6
            }));
        });
    });
});
//# sourceMappingURL=ParserSpec.js.map