import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Convert package.jsonc to package.json without comments", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }
    const workspacePath = workspaceFolders[0].uri.fsPath;
    const jsoncPath = path.join(workspacePath, "package.jsonc");
    const jsonPath = path.join(workspacePath, "package.json");

    fs.writeFileSync(
      jsoncPath,
      '{\n  "name": "test-package",\n  "version": "1.0.0"\n}'
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
  });

  test("Convert package.jsonc to package.json with comments", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }
    const workspacePath = workspaceFolders[0].uri.fsPath;
    const jsoncPath = path.join(workspacePath, "package.jsonc");
    const jsonPath = path.join(workspacePath, "package.json");

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
  });
});
