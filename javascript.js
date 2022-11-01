//GIVEN I am using a daily planner to create a schedule
//WHEN I open the planner
//THEN the current day is displayed at the top of the calendar
//WHEN I scroll down
//THEN I am presented with timeblocks for standard business hours
//WHEN I view the timeblocks for that day
//THEN each timeblock is color coded to indicate whether it is in the past, present, or future
//WHEN I click into a timeblock
//THEN I can enter an event
//WHEN I click the save button for that timeblock
//THEN the text for that event is saved in local storage
//WHEN I refresh the page
//THEN the saved events persist

//sets the current date and time and makes it visible in the header of the page
var dateTime = document.getElementById("currentDay");
dateTime.innerHTML = moment().format("dddd, MMMM Do YYYY, h:mm a");

//sets global scope variable for the current hour
var currentTime = moment().hours();

//runs the function for each textarea tag. this function is what changes the color of the form depending on the time of day
$("textarea").each(function() {
  if (parseInt($(this).parent().attr("id")) < parseInt(currentTime) ) {        
    $(this).removeClass("present");
    $(this).removeClass("future");
    $(this).addClass("past")
  } else if (parseInt($(this).parent().attr("id")) > parseInt(currentTime) ) {
    $(this).removeClass("present");
    $(this).removeClass("past");
    $(this).addClass("future")
  } else {
    $(this).removeClass("past");
    $(this).removeClass("future");
    $(this).addClass("present")
  }
});

//using jquery to set savebutton to save whatever is typed in to the forms to localStorage
$(".saveBtn").on("click", function(){
  var value = $(this).siblings(".description").val();
  var time = $(this).parent().attr("id");
  localStorage.setItem(time, value)
}
)

//for loop to display the saved localStorage data on screen
for(i=0; i < localStorage.length; i++) {
  $("#"+localStorage.key(i)+" .description").val(localStorage.getItem(localStorage.key(i)));
}