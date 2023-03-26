import * as vscode from "vscode";
import * as fs from "fs";
import * as jsonc from "jsonc-parser";

function stripCommentsAndUpdatePackageJson(document: vscode.TextDocument) {
  if (document.fileName.endsWith("package.jsonc")) {
    const packageJsoncContent = document.getText();
    const packageJsonContent = jsonc.stripComments(packageJsoncContent);
    const packageJsonPath = document.fileName.replace(/\.jsonc$/, ".json");

    fs.writeFileSync(packageJsonPath, packageJsonContent);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel("automatic-jsonc");

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(stripCommentsAndUpdatePackageJson)
  );
}

export function deactivate() {}
