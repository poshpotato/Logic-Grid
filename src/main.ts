
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
 * Appends a html representation of a two dimensional grid of sets and their interactions to the specified node.
 * Calls appendItemInteractionGrid() to create a interaction grid which is put inside each cell.
 * 
 * @remark clears the node that this grid is appended to.
 * 
 * @param headChef the node that this grid is appended to.
 * @param sets the array of sets (which are also arrays) that are being plotted.
 */
function appendSetInteractionGrid(headChef: Node, sets: Array<Array<any>>){
    //Clear contents of div:
    while(headChef.hasChildNodes()){
        headChef.removeChild(headChef.childNodes[0]);
    }

    //Set up the column headers:
    appendColumnHeaders(headChef, sets);

    //There is one less column and row than there are sets: this is to prevent self-interaction.
    for(var y = 0; y < sets.length; y++){
        //for each row:
        var row = document.createElement("div");
        row.className = "rowHeader";
        row.id = "rowHeader" + y;
        headChef.appendChild(row);


        //Before interactions, a short header row.
        //VERY short. literally only has one cell with y in it.
        var rowLabel = document.createElement("div");
        rowLabel.className = "rowLabelDiv";
        rowLabel.innerText = y.toString();
        row.appendChild(rowLabel);


        //We don't have to render the same set of interactions twice.
        for(var x = 0; x < sets.length-y; x++){
            //for each column in each row:
            var cell = document.createElement("div");
            cell.className = "setCellDiv";
            //marked uniquely in case we need to use it later.
            cell.id = "x" + x + "y" + y;
            //cell.innerText = x + "," + y;
            if(x!=y){
                //if they're the same sodding set, don't bother drawing the grid inside.
                appendItemInteractionGrid(cell,sets[x],sets[y]);
            }
            row.appendChild(cell);
            
        }
    }

}

/**
 * 
 * @param containerNode The node that this interaction grid should be plotted inside
 * @param xSet The set that lies across the x axis (the top)
 * @param ySet The set that lies across the y axis (the left)
 */
function appendItemInteractionGrid(containerNode: Node, xSet: Array<any>, ySet:Array<any>){
    
    for(var y = 0; y < ySet.length; y++){
        //for each row:
        var row = document.createElement("div");
        row.className = "rowHeader";
        containerNode.appendChild(row);
        for(var x = 0; x < xSet.length; x++){
            //for each column in each row:
            var cell = document.createElement("div");
            cell.className = "itemCellDiv";
            cell.id = ""+xSet[x]+" and "+ySet[y]+"";
            row.appendChild(cell);
            
        }
    }
}

function appendColumnHeaders(headChef: Node, sets: Array<Array<any>>){
    //First, declare the row for the headers.
        var row = document.createElement("div");
        row.className = "rowHeader";
        row.id = "columnHeaderRow";
        headChef.appendChild(row);
        //Then, add space for the row labels.
        var rowLabel = document.createElement("div");
        rowLabel.className = "headDiv";
        rowLabel.innerText = " ";
        row.appendChild(rowLabel);
    //next, the labels. this is a little funky.
    for(var i = 0; i < sets.length; i++){
        var head = document.createElement("div");
        head.className = "headDiv";
        head.innerText = i.toString();
        row.appendChild(head);
    }

    
}

/**
 * This function is much like the above functions, but uses proper HTML table elements rather than Divs. 
 * 
 */
function appendSetLogicTable(container: Node, sets: Array<Array<any>>){
    var table = document.createElement("table");
    //We do it by rows.
    //First row is a header row.
    doHeaderRow{}
    //Then, we add a row for each set other than the first one (to prevent self-interaction.)
    //Failing that we just do a row for each set and leave the interaction cells for self-interaction blank.
    for(var i:number = 0; i < sets.length; i++){
        //We need a label for each set.
        doLabel;
        //Then we need a cell for each other set.
        for(var j:number = 0; j < sets.length; j++){
            doCell{
                //if they're the same sodding set, don't bother!
                var cell:Node = document.createElement("td");
                if(!(j==i)){
                    doItemInteractions{
                        //will probably do this in a seperate function.
                        //This is a smaller table in each cell. needs to be passed two sets based on i and j 
                        //but can then figure it out from there.
                        appendItemInteractionTable(cell,sets[i],sets[j])

                    }
                }
                attachCell
            }

        }
        attachRow

    }
    attachTable
}

function appendItemInteractionTable(container:Node, xSet:Array<any>,ySet:Array<any>){
    var table:Node = document.createElement("table");
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