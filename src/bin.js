#!/usr/bin/env node
const program = require("commander");
const spongeMock = require("./").spongeMock;
const version = require("../package.json").version;
const fs = require("fs");

program
    .version(version)
    .option("-e, --string", "read arguments as strings instead of files")
    .parse(process.argv);

if (!program.args.length) {
    const stdin = process.openStdin();
    let input = "";

    stdin.on("data", function (chunk) {
        input += chunk;
    });

    stdin.on("end", function () {
        process.stdout.write(spongeMock(input));
        process.stdout.write("\n");
    });
}
else {
    program.args.forEach(function (str) {
        if (program.string) {
            process.stdout.write(spongeMock(str));
        }
        else {
            process.stdout.write(spongeMock(fs.readFileSync(str, "utf8")));
        }
    });

    process.stdout.write("\n");
}
