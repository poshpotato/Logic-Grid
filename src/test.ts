function fiveSetsOfFiveTest(headChef: Node){
    var testSetArray:Array<Array<String>> = new Array<Array<String>>();
    for(var i: number = 0; i < 5;i++){
        //i is for sets
        var testSet:Array<String> = new Array<String>();
        for(var j: number = 0; j < 5; j++){
            testSet.push("Set " + i + ", item" + j);
        }
        testSetArray.push(testSet);
    }
    appendSetLogicTable(headChef, testSetArray);
}

function simpleSizedSetsTest(headChef: Node, sets: number, items: number){
    var testSetArray:Array<Array<String>> = new Array<Array<String>>();
    for(var i: number = 0; i < sets;i++){
        //i is for sets
        var testSet:Array<String> = new Array<String>();
        for(var j: number = 0; j < items; j++){
            testSet.push("Set " + i + ", item" + j);
        }
        testSetArray.push(testSet);
    }
    appendSetLogicTable(headChef, testSetArray);

}