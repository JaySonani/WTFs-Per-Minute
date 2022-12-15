// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wtfpm" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposablet = vscode.commands.registerCommand('wtfpm.helloWorldt', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.visibleTextEditors.forEach((editor) => {
			const activeLine = editor.selection.active.line;
			const prevLine = editor.selection.active.line - 1;
			const nextLine = editor.selection.active.line + 1;
			const fileNameUri = editor.document.uri;

			const config = vscode.workspace.getConfiguration('wtfpm');
			const username = config.get("username");
			const project = config.get("project");
			const sample = editor.document.lineAt(activeLine).text;
			const before = editor.document.lineAt(prevLine).text;
			const after = editor.document.lineAt(nextLine).text;
			const folder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
			let fileName = '';
			if(folder){
				fileName = ''+fileNameUri;
				fileName = fileName.replace(''+folder.uri, '');
			}
			//vscode.window.showInformationMessage('Registered a WTF Event for '+project+' as '+username+' '+activeLine+' '+editor.document.lineAt(prevLine).text+' '+editor.document.lineAt(activeLine).text+' '+editor.document.lineAt(nextLine).text + ' ' + fileName);
			setWTFEvent(username, project, activeLine, before, sample, after, fileName, "Testing");
			

		  });
		  //vscode.window.showInformationMessage('Hello World VS Code');
	});

	let disposablec = vscode.commands.registerCommand('wtfpm.helloWorldc', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.visibleTextEditors.forEach((editor) => {
			const activeLine = editor.selection.active.line;
			const prevLine = editor.selection.active.line - 1;
			const nextLine = editor.selection.active.line + 1;
			const fileNameUri = editor.document.uri;

			const config = vscode.workspace.getConfiguration('wtfpm');
			const username = config.get("username");
			const project = config.get("project");
			const sample = editor.document.lineAt(activeLine).text;
			const before = editor.document.lineAt(prevLine).text;
			const after = editor.document.lineAt(nextLine).text;
			const folder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
			let fileName = '';
			if(folder){
				fileName = ''+fileNameUri;
				fileName = fileName.replace(''+folder.uri, '');
			}
			//vscode.window.showInformationMessage('Registered a WTF Event for '+project+' as '+username+' '+activeLine+' '+editor.document.lineAt(prevLine).text+' '+editor.document.lineAt(activeLine).text+' '+editor.document.lineAt(nextLine).text + ' ' + fileName);
			setWTFEvent(username, project, activeLine, before, sample, after, fileName, "Comments");
			

		  });
		  //vscode.window.showInformationMessage('Hello World VS Code');
	});

	let disposabler = vscode.commands.registerCommand('wtfpm.helloWorldr', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.visibleTextEditors.forEach((editor) => {
			const activeLine = editor.selection.active.line;
			const prevLine = editor.selection.active.line - 1;
			const nextLine = editor.selection.active.line + 1;
			const fileNameUri = editor.document.uri;

			const config = vscode.workspace.getConfiguration('wtfpm');
			const username = config.get("username");
			const project = config.get("project");
			const sample = editor.document.lineAt(activeLine).text;
			const before = editor.document.lineAt(prevLine).text;
			const after = editor.document.lineAt(nextLine).text;
			const folder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
			let fileName = '';
			if(folder){
				fileName = ''+fileNameUri;
				fileName = fileName.replace(''+folder.uri, '');
			}
			//vscode.window.showInformationMessage('Registered a WTF Event for '+project+' as '+username+' '+activeLine+' '+editor.document.lineAt(prevLine).text+' '+editor.document.lineAt(activeLine).text+' '+editor.document.lineAt(nextLine).text + ' ' + fileName);
			setWTFEvent(username, project, activeLine, before, sample, after, fileName, "Refactoring");
			

		  });
		  //vscode.window.showInformationMessage('Hello World VS Code');
	});

	function setWTFEvent(username: unknown, project: unknown, activeLine: number, before: string, sample: string, after: string, fileName: string, reason: string){
		const now = new Date();
		const url = 'https://northamerica-northeast1-hackday-dec-2022.cloudfunctions.net/wtf-per-minute-collector';
		axios
			.post(url, { project: project, file: fileName, line: activeLine, sample: {target: sample, before: before, after: after}, reason: reason, timestamp: now, user: username})
			.then(function (response: any) {
				//console.log(response.data);
				//vscode.window.showInformationMessage(response.data);
				//vscode.window.showInformationMessage('WTF Event Sent');
			})
			.catch(function (error: any) {
				console.error(error);
				vscode.window.showInformationMessage(error);
			});
	}

	context.subscriptions.push(disposablet);
	context.subscriptions.push(disposablec);
	context.subscriptions.push(disposabler);
}


// This method is called when your extension is deactivated
export function deactivate() {}
