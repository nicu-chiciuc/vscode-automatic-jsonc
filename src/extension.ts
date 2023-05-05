import * as vscode from "vscode";
import * as fs from "fs";
import * as jsonc from "jsonc-parser";
import * as micromatch from "micromatch";

function processJsoncFiles(document: vscode.TextDocument) {
  const config = vscode.workspace.getConfiguration();
  const patterns = config.get<string[]>("automatic-transform-jsonc");

  if (
    patterns &&
    patterns.some((pattern) => micromatch.isMatch(document.fileName, pattern))
  ) {
    const jsoncContent = document.getText();
    const jsonContent = jsonc.stripComments(jsoncContent);
    const jsonFilePath = document.fileName.replace(/\.jsonc$/, ".json");

    fs.writeFileSync(jsonFilePath, jsonContent);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel("automatic-jsonc");

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(processJsoncFiles)
  );
}

export function deactivate() {}
