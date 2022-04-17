
//generates a basic, one dimensional, interaction grid with items columns and items-1 rows.
//Kept here to copy from, basically.
function writeGrid(headChef: Node, items: number){
    //Clear contents of div:
    while(headChef.hasChildNodes()){
        headChef.removeChild(headChef.childNodes[0]);
    }
    for(var i = 1; i < items; i++){
        //for each row:
        var row = document.createElement("div");
        row.className = "rowHeader";
        row.id = "rowHeader" + i;
        headChef.appendChild(row);
        for(var j = 0; j < items; j++){
            //for each column in each row:
            var cell = document.createElement("div");
            cell.className = "cellDiv";
            cell.id = "x" + i + "y" + j;
            cell.innerText = i + "," + j;
            row.appendChild(cell);
            
        }
    }

}

/**
 * This function is much like the above functions, but uses proper HTML table elements rather than Divs. 
 * 
 */
function appendSetLogicTable(container: Node, sets: Array<Array<any>>){
    var table = document.createElement("table");
    table.className = "setLogicTable"
    //We do it by rows.
    //First row is a header row.
    appendSetTableHeaderRow(table,sets);

    //Then, we add rows
    //We just do a row for each set and leave the interaction cells for self-interaction blank.
    for(var i:number = 0; i < sets.length; i++){
        
        var row:Node = document.createElement("tr");
        //We need a label for each set row.
        var labelCell:HTMLElement = document.createElement("td");
        labelCell.innerText = i.toString();
        row.appendChild(labelCell);
        //Then we need a cell for each other set.
        for(var j:number = 0; j < sets.length; j++){
            //if they're the same sodding set, don't bother!
            var cell:HTMLElement = document.createElement("td");
            cell.className = "setCell";
            if(!(j==i)){
                //interactions between sets happen here
                //This is a smaller table in each cell. needs to be passed two sets based on i and j 
                //but can then figure it out from there.
                appendItemInteractionTable(cell,sets[j],sets[i]);
                
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

function appendSetTableHeaderRow(table:Node, sets: Array<Array<any>>){
    var row:Node = document.createElement("tr");
    //first, an empty cell for the top left corner.
    row.appendChild(document.createElement("td"));
    for(var i:number = 0; i<sets.length; i++){
        var cell:HTMLElement = document.createElement("td");
        cell.innerText = i.toString();
        row.appendChild(cell);
    }
    table.appendChild(row);
}
    
/**
 * 
 * @param container The node that this interaction grid should be plotted inside
 * @param xSet The set that lies across the x axis (the top)
 * @param ySet The set that lies across the y axis (the left)
 */
function appendItemInteractionTable(container:Node, xSet:Array<any>,ySet:Array<any>){
    var table = document.createElement("table");
    table.className = "itemInteractionTable";
    //again, we do it by rows.
    for(var y:number = 0; y < ySet.length; y++){
        var row:Element = document.createElement("tr");
        row.className = "itemRow";
        for(var x:number = 0; x < xSet.length; x++){
            var cell:HTMLElement = document.createElement("td");
            cell.className = "itemCell";
            cell.innerText = xSet[x].toString() + "," + ySet[y].toString();
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}