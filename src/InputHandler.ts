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
        sizeInput.onchange = (ev) => {updateElementInputs(elementList, parseInt((ev.currentTarget as HTMLInputElement).value)); console.log(ev.currentTarget)}

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
 
function updateElementInputs(containingList:HTMLOListElement, elementNum: number){
    //Every time the set size is updated, we need to run checks and behave accordingly.
    //1. check the size isn't negative or zero. Sets have to have normal sizes!
    if(elementNum<=0){
        //Just.. do nothing.
        return;
    }
    
    //2. Check if the new size is larger or smaller than the current one:
    if(!containingList.hasChildNodes||containingList.childElementCount<elementNum){
        //If the size has increased OR there are no children:
        //Add inputs until done.
        while(containingList.childElementCount<elementNum){
            appendElementInput(containingList);
        }
    }else if(containingList.childElementCount>elementNum){
        //If the size has decreased:
        while(containingList.childElementCount>elementNum){
            containingList.removeChild(containingList.children[containingList.children.length-1])
        }
    }else{
        //If the sizes are the same:
        //Do nothing. This is fine.
        return;
    }
    
}

function appendElementInput(containingList:HTMLOListElement){
    //This goes inside the containing list, and the input goes inside this.
    let listItem:HTMLLIElement = document.createElement("li");
        
    //input for element i:
    let elementInput: HTMLInputElement = document.createElement("input");
    elementInput.type = "text";
    elementInput.size = 1;
    elementInput.maxLength = 1;
    listItem.appendChild(elementInput);
    containingList.appendChild(listItem);
}