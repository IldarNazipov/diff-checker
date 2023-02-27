#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/genDiff.js';

program
    .version("1.0.0")
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'display help for command')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
        genDiff(filepath1, filepath2);
    })

program.parse(process.argv);
