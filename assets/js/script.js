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
