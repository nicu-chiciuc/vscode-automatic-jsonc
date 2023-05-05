import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

suite("Extension Test Suite", () => {
  let originalConfig: string[] | undefined;

  suiteSetup(async () => {
    // Store the original configuration before running the tests
    const config = vscode.workspace.getConfiguration();
    originalConfig = config.get<string[]>(
      "automatic-jsonc.jsoncFilesToTransform"
    );
  });

  suiteTeardown(async () => {
    // Restore the original configuration after running the tests
    const config = vscode.workspace.getConfiguration();
    await config.update(
      "automatic-jsonc.jsoncFilesToTransform",
      originalConfig,
      vscode.ConfigurationTarget.Global
    );
  });

  async function testConversion(jsoncFilename: string, jsonFilename: string) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }
    const workspacePath = workspaceFolders[0].uri.fsPath;
    const jsoncPath = path.join(workspacePath, jsoncFilename);
    const jsonPath = path.join(workspacePath, jsonFilename);

    fs.writeFileSync(
      jsoncPath,
      '{\n  // This is a comment\n  "name": "test-package",\n  "version": "1.0.0"\n}'
    );

    const document = await vscode.workspace.openTextDocument(jsoncPath);
    const editor = await vscode.window.showTextDocument(document);

    await editor.document.save();

    const convertedContent = fs.readFileSync(jsonPath, "utf8");
    assert.strictEqual(
      convertedContent,
      '{\n  "name": "test-package",\n  "version": "1.0.0"\n}'
    );

    fs.unlinkSync(jsoncPath);
    fs.unlinkSync(jsonPath);
  }

  test("Convert package.jsonc to package.json with default configuration", async () => {
    await testConversion("package.jsonc", "package.json");
  });

  test("Convert custom.jsonc to custom.json with custom configuration", async () => {
    const config = vscode.workspace.getConfiguration();
    await config.update(
      "automatic-jsonc.jsoncFilesToTransform",
      ["**/custom.jsonc"],
      vscode.ConfigurationTarget.Global
    );

    await testConversion("custom.jsonc", "custom.json");

    await config.update(
      "automatic-jsonc.jsoncFilesToTransform",
      originalConfig,
      vscode.ConfigurationTarget.Global
    );
  });
});
