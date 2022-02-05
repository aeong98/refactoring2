const invoice = require('./invoices.json');
const plays = require('./play.json');

import {statement} from './statement';

console.log(statement(invoice, plays));

