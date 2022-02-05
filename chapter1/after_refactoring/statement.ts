import { Invoice, Play} from './types';
import {createStatementData} from './createStatementData';
import {renderPlainText} from './renderPlainText';

export function statement(invoice:Invoice, plays:{[id:string]:Play}) {
    return renderPlainText(createStatementData(invoice,plays));
}