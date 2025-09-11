#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');


const TODO_FILE = path.join(__dirname, 'todos.json');

function loadTodos() {
    if (!fs.existsSync(TODO_FILE)) return [];
    return JSON.parse(fs.readFileSync(TODO_FILE, 'utf8'));
}

function saveTodos(todos) {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

function listTodos(todos) {
    if (todos.length === 0) {
        console.log('No todos yet!');
        return;
    }
    todos.forEach((todo, idx) => {
        console.log(`${idx + 1}. [${todo.done ? 'x' : ' '}] ${todo.text}`);
    });
}

function addTodo(todos, text) {
    todos.push({ text, done: false });
    saveTodos(todos);
    console.log('Todo added.');
}

function markDone(todos, idx) {
    if (idx < 1 || idx > todos.length) {
        console.log('Invalid todo number.');
        return;
    }
    todos[idx - 1].done = true;
    saveTodos(todos);
    console.log('Todo marked as done.');
}

function removeTodo(todos, idx) {
    if (idx < 1 || idx > todos.length) {
        console.log('Invalid todo number.');
        return;
    }
    todos.splice(idx - 1, 1);
    saveTodos(todos);
    console.log('Todo removed.');
}

function showHelp() {
    console.log(`
Todo List CLI

Commands:
  list                 List all todos
  add <text>           Add a new todo
  done <number>        Mark todo as done
  remove <number>      Remove a todo
  help                 Show this help
  exit                 Exit
`);
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'todo> '
    });

    let todos = loadTodos();
    showHelp();
    rl.prompt();

    rl.on('line', (line) => {
        const [cmd, ...args] = line.trim().split(' ');
        switch (cmd) {
            case 'list':
                listTodos(todos);
                break;
            case 'add':
                if (args.length === 0) {
                    console.log('Please provide todo text.');
                } else {
                    addTodo(todos, args.join(' '));
                    todos = loadTodos();
                }
                break;
            case 'done':
                markDone(todos, parseInt(args[0], 10));
                todos = loadTodos();
                break;
            case 'remove':
                removeTodo(todos, parseInt(args[0], 10));
                todos = loadTodos();
                break;
            case 'help':
                showHelp();
                break;
            case 'exit':
                rl.close();
                return;
            default:
                console.log('Unknown command. Type "help" for instructions.');
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });
}

main();