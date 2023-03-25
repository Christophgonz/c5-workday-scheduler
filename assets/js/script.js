// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

// Get the current Date and Time
var today = dayjs();
// get the numerical value of the current hour and store it
var curHour = parseInt(today.format("H"));

$(function () {
  // Save functionality
  $(".saveBtn").on("click", function () {
    // Create a jQuery object of the button that was pressed
    var button = $(this);

    // get the value of the text area of the sibling that the button was pressed in
    var value = button.siblings("textarea").eq(0).val();

    // get the id of the parent that contains the button and text area
    var pID = button.parent().attr("id");

    // Set the information obtained into local storage
    localStorage.setItem(pID, value);
  });

  // Retrieving the data from localStorage and setting the color code
  $(".time-block").each(function () {
    // retrieve the data from local storage
    // get the id of each time block
    var timeBlock = $(this);
    var timeID = timeBlock.attr("id");

    // get the value of the data stored into at that id
    var value = localStorage.getItem(timeID);

    // set the retrieved value into the text area of each timeblock
    $(this).children("textarea").eq(0).val(value);

    // setting the color code for time of day
    // getting just the number from the time block id
    var timeNo = parseInt(timeID.split("-").pop());
    // if hour of the time block is before the current time
    if (timeNo < curHour) {
      // set the class to past
      timeBlock.attr("class", "row time-block past");
      // if the hour of the time block is the current time
    } else if (timeNo == curHour) {
      // set the class to present
      timeBlock.attr("class", "row time-block present");
      // if the hour of the time block is after the current time
    } else {
      // set the class to future
      timeBlock.attr("class", "row time-block future");
    }
  });

  // Set the date on the page
  $("#currentDay").text("Today's Date: " + today.format("dddd MMMM DD, YYYY"));
});
