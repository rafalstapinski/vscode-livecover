// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	vscode.languages.registerHoverProvider('python', {
		async provideHover(document, position, token) {
			const docText = document.getText();
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

			const payload = {
				file_text: docText,
				path: document.uri.path,
				workspace_folder: workspaceFolder?.uri.path,
				line: position.line
			};

			let resp = await axios.post("http://api.livecover.io/stat", payload);

			if (resp.status === 200) {
				return new vscode.Hover(resp.data.text);
			}

		}
	});

}

// this method is called when your extension is deactivated
export function deactivate() {}
