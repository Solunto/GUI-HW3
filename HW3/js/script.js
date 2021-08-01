/*
//	Intro. to GUI 1 HW3
//	Date: 7/30/2021
//	By: Ari Primak
//	Description: This assignment required students to write javascript code that can
//  create a multiplication table based on dynamic input from a user. 
//	Comments: The lower and upper bounds are -50 and 50, respectively, as specified 
//  by the assignment pdf. I didn't know what to put as a background for the page, 
//  so its a nice plain white. This assignment was as straightforward as I thought it
//  would be, but it definitely took longer than I expected.
*/
var temp, minXField, minYField, maxXField, maxYField, submitBtn, tableHTML;
minXField = document.getElementById("minX");
minYField = document.getElementById("minY");
maxXField = document.getElementById("maxX");
maxYField = document.getElementById("maxY");
submitBtn = document.getElementById("sbmtbtn");

function getNums() {
    //First, assume there are no errors in the input values, and set the css for that case
    //I had an issue where I couldn't figure out what values would turn the borders of each
    //field back to the default look. I eventually googled it, and found out the answer was
    //"no values at all"... TMYK.
    minXField.style.border = "";
    maxXField.style.border = "";
    minYField.style.border = "";
    maxYField.style.border = "";
    document.getElementById("error").innerHTML = "";
    //If you mess up the input without leaving it blank (ie. by putting in a +/- beyond the first character),
    //then it will still report as blank (valueMissing will == true). This is because when a type:number field
    //receives what it thinks is non-numeric input, it throws it out and reports as having no input. I thought
    //about changing the error message to account for this, and I would if this were a program I expected people
    //to actually use, but I thought commenting on it here would be sufficient and it saves me the effort on
    //styling a longer line of text. 
    if (minXField.validity.valueMissing) {
        document.getElementById("error").innerHTML = "Error: the horizontal-axis minimum value field must not be left blank"
        minXField.style.border = "2px solid red";
        return;
    }
    minXVal = minXField.valueAsNumber;
    if (maxXField.validity.valueMissing) {
        document.getElementById("error").innerHTML = "Error: the horizontal-axis maximum value field must not be left blank"
        maxXField.style.border = "2px solid red";
        return;
    }
    maxXVal = maxXField.valueAsNumber;
    if (minYField.validity.valueMissing) {
        document.getElementById("error").innerHTML = "Error: the vertical-axis minimum value field must not be left blank"
        minYField.style.border = "2px solid red";
        return;
    }
    minYVal = minYField.valueAsNumber;
    if (maxYField.validity.valueMissing) {
        document.getElementById("error").innerHTML = "Error: the vertical-axis maximum value field must not be left blank"
        maxYField.style.border = "2px solid red";
        return;
    }
    maxYVal = maxYField.valueAsNumber;

    //Swaps the min and max values for an axes if they need to be swapped to be coherent
    if (minXVal > maxXVal)
    {
        temp = maxXVal;
        maxXVal = minXVal;
        minXVal = temp;
        //Updating the input fields to be accurate to the new values
        minXField.valueAsNumber = minXVal;
        maxXField.valueAsNumber = maxXVal;
    }

    if (minYVal > maxYVal)
    {
        temp = maxYVal;
        maxYVal = minYVal;
        minYVal = temp;

        minYField.valueAsNumber = minYVal;
        maxYField.valueAsNumber = maxYVal;
    }
    //Bounds checking
    if (minXVal < -50) {
        document.getElementById("error").innerHTML = "Error: the horizontal-axis minimum value must not be lower than -50"
        minXField.style.border = "2px solid red";
        return;
    } else if (maxXVal > 50) {
        document.getElementById("error").innerHTML = "Error: the horizontal-axis maximum value must not be higher than 50"
        maxXField.style.border = "2px solid red";
        return;
    } else if (minYVal < -50) {
        document.getElementById("error").innerHTML = "Error: the vertical-axis minimum value must not be lower than -50"
        minYField.style.border = "2px solid red";
        return;
    } else if (maxYVal > 50) {
        document.getElementById("error").innerHTML = "Error: the vertical-axis maximum value must not be higher than 50"
        maxYField.style.border = "2px solid red";
        return;
    } 
    generateTable(minXVal, maxXVal, minYVal, maxYVal);
}

function generateTable(leftX, rightX, topY, botY) {
    //The amount of columns is equal to the difference between min and max X plus 1 for the left-side header
    var tbWidth = rightX - leftX + 1;
    //Same reasoning for rows, except that the top row (header) doesn't need to be counted for this var.
    var tbHeight = botY - topY;

    const widthArray = [];
    const heightArray = [];
    //The strange condition for the for loop is to enable the use of "i" for both array index
    //purposes and as input for each such index
    for (var i = 0; i <= rightX - leftX; i++)
        widthArray[i] = i + Number(leftX);

    for (var i = 0; i <= botY - topY; i++)
        heightArray[i] = i + Number(topY);

    //Open the table, along with it's first (header) row and its first (blank) entry
    tableHTML = "<table><tr id=\"headerRow\"><th id=\"blank\"></th>";
    //Populate the first row's entries with the correct values
    for (var i = 0; i < widthArray.length; i++)
        tableHTML += "<th>" + widthArray[i] + "</th>";
    //Close the first row
    tableHTML += "</tr>";

    //Next, for each row (an amount of rows equal to the length of heightArray) open it and , 
    //populate the leftmost column (the left header)
    for (var i = 0; i < heightArray.length; i++) {
        tableHTML += "<tr><th class=\"headerColumn\">" + heightArray[i] + "</th>";
        //Then, populate the rest of the row with the product of the left and top headers
        for (var k = 0; k < widthArray.length; k++)
            tableHTML += "<th>" + (heightArray[i] * widthArray[k]) + "</th>";
        //Close the row and loop
        tableHTML += "</tr>";
    }
    //Close the table
    tableHTML += "</table>";
    //Overwrite the innerHTML of the #table div (by default it is empty) with the new table
    document.getElementById("table").innerHTML = tableHTML;
}

submitBtn.addEventListener("click", getNums, false);
