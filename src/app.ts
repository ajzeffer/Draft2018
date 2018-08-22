import * as $ from "jquery";
import { PositionType } from './enums'
function test(){
    console.log(`Here is a position: ${PositionType[PositionType.Qb] }`);
}
test();