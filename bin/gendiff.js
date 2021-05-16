#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const app = new Command();
app.version('1.0.0');
app.description('Compares two configuration files and shows a difference.');

app.parse();
