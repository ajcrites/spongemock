#!/usr/bin/env node
import program from "commander"
import { spongeMock } from "./";
import { version } from "../package.json";
import { readFileSync } from  "fs";

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
            process.stdout.write(spongeMock(readFileSync(str, "utf8")));
        }
    });

    process.stdout.write("\n");
}
