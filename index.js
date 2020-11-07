// Add current date in format: Friday, December 5th, 2020

const DateTime = luxon.DateTime;

const now = DateTime.local().toFormat("DDDD");
console.log(DateTime.local().hour);

$("#currentDay").text(now);

// From 6AM to 6PM, add a timeslot for each hour to #planner
// Should be composed of a block containing the hour, a textarea, and a button to save changes

for (let i = 6; i < 19; i++) {
	const timeslot = $("<div>");
	const time = $("<div>");
	const text = $("<div>");
	const saveButton = $("<button>");

	time.text(`${i}:00`).addClass("time-box");
	text.addClass("text-box");
	if (DateTime.local().hour === i) {
		text.addClass("present");
	} else if (DateTime.local().hour < i) {
		text.addClass("past");
	} else if (DateTime.local().hour > i) {
		text.addClass("future");
	}
	saveButton.html('<i class="fas fa-save"></i>').addClass("save-button");
	timeslot.addClass("timeslot").append(time).append(text).append(saveButton);
	$("#planner").append(timeslot);
}
