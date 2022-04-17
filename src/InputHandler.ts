//Most of the methods in setTabler.ts use any for their arrays, but this is for a specific use of elements being strings.

function generateSetSizeInputs(setOptionsDiv: Node, setNum: number){
    //Each set needs:
    //A. A number input for the size of the set that determines the number of the next element:
    //B. A set of text inputs for the elements.
    //B will actually be generated in a different function.
    //If this is being called, we are *re-generating* the inputs, so we need to get rid of the old ones.
    while(setOptionsDiv.hasChildNodes()){
        setOptionsDiv.removeChild(setOptionsDiv.childNodes[0]);
    }
    //Uses a table with a single row. Each row contains cells equal to setNum.
    //Each cell should contain a number input list of input elements
    let table:HTMLTableElement = document.createElement("table");
    table.className = "settingsTable";
    let row:HTMLTableRowElement = document.createElement("tr");
    //for each set:
    for(let i:number = 0; i<setNum; i++){
        let cell:HTMLTableCellElement = document.createElement("td");
        cell.className = "inputCell";

        //Ask the size with a new input element.
        let sizeInput: HTMLInputElement = document.createElement("input");
        sizeInput.className = "sizeInput";
        sizeInput.id = "set" + i + "sizeInput";
        sizeInput.type = "number";
        sizeInput.min = "1";
        //Give it a label, too.
        let sizeInputLabel: HTMLLabelElement = document.createElement("label");
        sizeInputLabel.htmlFor = sizeInput.id;
        sizeInputLabel.innerText = "Size of Set " + i;

        //Put a little list below each element to contain the inputs.
        let elementList:HTMLOListElement = document.createElement("ol");
        elementList.start = 0;
        sizeInput.onchange = (ev) => {appendElementInputs(elementList, parseInt((ev.currentTarget as HTMLInputElement).value)); console.log(ev.currentTarget)}

        cell.appendChild(sizeInputLabel);
        //line break!
        cell.appendChild(document.createElement("br"));
        cell.appendChild(sizeInput);
        cell.appendChild(document.createElement("br"));
        cell.appendChild(elementList);
        row.appendChild(cell);
    }
    table.appendChild(row);
    setOptionsDiv.appendChild(table);
}

function appendElementInputs(containingList:HTMLOListElement, elementNum: number){
    console.log(elementNum);
    console.log(containingList)
    for(let i:number = 0; i<elementNum; i++){
        
    }
}