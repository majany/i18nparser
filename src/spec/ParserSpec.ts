import { I18NPropertiesFile, StatementLine } from "../index";

describe("I18NPropertiesFile", function () {
  let propertiesFile: I18NPropertiesFile;
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
    propertiesFile = new I18NPropertiesFile();
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
    if(errorLines){
      const errorLine = {
        lineType: "error",
        line: 22
      } as StatementLine;
      expect(errorLines.length).toBe(1);
      expect(errorLines[0]).toEqual(jasmine.objectContaining(errorLine));
    }
  });
});
