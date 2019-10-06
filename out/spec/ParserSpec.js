"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe("I18NPropertiesFile", function () {
    let propertiesFile;
    const i18ntestFilesPath = "./src/spec/test.properties";
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
    // describe("when song has been paused", function() {
    //   beforeEach(function() {
    //     player.play(song);
    //     player.pause();
    //   });
    //   it("should indicate that the song is currently paused", function() {
    //     expect(player.isPlaying).toBeFalsy();
    //     // demonstrates use of 'not' with a custom matcher
    //     expect(player).not.toBePlaying(song);
    //   });
    //   it("should be possible to resume", function() {
    //     player.resume();
    //     expect(player.isPlaying).toBeTruthy();
    //     expect(player.currentlyPlayingSong).toEqual(song);
    //   });
    // });
});
//# sourceMappingURL=ParserSpec.js.map