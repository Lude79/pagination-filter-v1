var snumbers = "1-10";
var foundItems = [];
var q = $(".student-list li").length;
var x;
var n;

//Show Current Number of Students Displayed
var p = document.createElement("P");
p.id = "snumber";
$(p).insertAfter("h2");
document.getElementById("snumber").innerHTML = "Students " + snumbers + " out of "+q;

//Create container and appropriate number of buttons
var div2 = document.createElement("DIV");
div2.id = "div2";
$(div2).insertAfter("ul");

b = Math.ceil(q/10);
for (i = 1; i <= b; i++) { 
var btn = document.createElement("BUTTON");      
var t = document.createTextNode(i); 
var hash = "number" + i;
btn.appendChild(t); 
btn.id = hash;
btn.className = "pages";
div2.appendChild(btn);
};

//Append input field for searches
var input = document.createElement("INPUT");
input.id = "search";
input.placeholder = "Search Name";
$(input).insertAfter("p");

//Append "clear" button
var btn1 = document.createElement("BUTTON");      
var z = document.createTextNode("Clear"); 
btn1.appendChild(z); 
btn1.id = "clear";
$(btn1).insertAfter("input");

//reset if clear button is pressed
$("#clear").click(function(){
location.reload();
});

//Page transitions (no search)
$(".page").on("click","#div2 .pages",function(){    
var v = $(this).html();
    var low = v*10-10;
    var up = v*10;
    var low1 = low + 1;
    $(".student-item.cf").css("display","none").slice(low,up).fadeIn("slow",function(){});
    var f = $(".student-item.cf").slice(low,up).length - 10 + up;
    document.getElementById("snumber").innerHTML = "Students " + low1 +" - " + f + " out of "+q;
});

//Search function (fired when data is entered in input field)
$("#search").keyup(function(){
    $(".page").off("click","#div2 .pages");
    foundItems = [];
    $(".student-item.cf").css("display","none");
    $("#noMatches").remove();
    $("#snumber").css("display","inline"); 

//convert search input to lower case
var j = $("#search").val();    
var term = j.toLocaleLowerCase();   

//Find matches and add to array (by name)
x = document.getElementsByTagName("li");
   
for (i = 0; i < 54; i++){
var h = $(x[i]).find("h3").text();
if(h.indexOf(term)>=0){
foundItems.push(i);
       };
} 
    
//Find matches and add to array (by email), only add to array if unique  
for (i = 0; i < 54; i++){
var h = $(x[i]).find(".email").text();
if(h.indexOf(term)>=0 && foundItems.indexOf(i) === -1){
foundItems.push(i);
            };
}     

//Sort the array with search results    
foundItems.sort(function(a, b){return a-b});
n = foundItems.length;

//Hide buttons that are not needed
var m = Math.ceil(n/10);
$("button").css("display","inline");
for (i = m + 1; i <=b; i++){
$("#number"+i).css("display","none");
    };
    
//Display first 10 results on initial search page
    for (i = 0; i <10; i++){
        $(x[foundItems[i]]).fadeIn("slow",function(){});
        if(n>10){document.getElementById("snumber").innerHTML = "Students " + 1 +" - " + 10 + " out of "+n}
        else{
        document.getElementById("snumber").innerHTML = "Students " + 1 +" - " + n + " out of "+n    
        };
    };   
    
//Display "no matches found" text if no matches
if (n===0){
var noMatches = document.createElement("P");
var node = document.createTextNode("No matches found");
noMatches.id = "noMatches";
noMatches.appendChild(node);
$(noMatches).insertAfter("ul");
$("#snumber").css("display","none");    
} 
});

//add class to buttons once search function is used
$("#search").one("keyup",function(){
$("#div2 button").addClass("results")
});

//buttons now cycle through search results
$(".page").on("click","#div2 .results",function(){
    console.log("it works");
    $(".student-item.cf").css("display","none");
    var v = $(this).html();
    var d = (v - 1) * 10;
    var w = 10 * v
    for (i = d; i <w; i++){
        $(x[foundItems[i]]).fadeIn("slow",function(){});
    };
    w = $(".student-list li:visible").length - 10 + w;
    d += 1;
   document.getElementById("snumber").innerHTML = "Students " + d +" - " + w + " out of "+n;
    });    



