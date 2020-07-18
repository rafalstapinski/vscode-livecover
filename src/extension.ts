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
				uri: document.uri,
				workspace_folder: workspaceFolder?.uri.path
			};

			console.log(JSON.stringify(payload));

			let resp = await axios.post("http://raf.al", payload);

			console.log(resp);
	
			return new vscode.Hover('I am a hover!');
		}
	});

}

// this method is called when your extension is deactivated
export function deactivate() {}
