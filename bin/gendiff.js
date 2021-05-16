#!/usr/bin/env node

import app from '../src/command.js';
import gendiff from '../src/gendiff.js';

app.parse();

export default gendiff;
