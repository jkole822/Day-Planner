// Render Date
// ====================================================================
const DateTime = luxon.DateTime;

const now = DateTime.local().toFormat("DDDD");

$("#currentDay").text(now);

// Render timeslots for business hours 6:00 - 18:00 (24 hour format)
// ====================================================================
for (let i = 6; i < 19; i++) {
	// Create variables for each section of the timeslot for the
	// current iteration.
	const timeslot = $("<div>");
	const time = $("<div>");
	const timeText = $("<p>");
	const text = $("<textarea>");
	const saveButton = $("<button>");

	// Put hour text in child element of time container
	// to center horizontally and vertically.
	timeText.addClass("time-text").text(`${i}:00`);

	// Append the hour text to the time container as well as define
	// a data attribute for the current iteration. The data attribute
	// is used as a handler to get and set content from local storage
	// for the textarea of the current iteration.
	time.attr("class", "time-box col-1").attr("data-time", i).append(timeText);

	// Retrieve content to render to textarea depending on the data attribute
	// of the current iteration. Also, conditionally set class that will
	// control the style based on the current time.
	text.attr("class", "text-box col-10").text(localStorage.getItem(i));
	if (DateTime.local().hour === i) {
		text.addClass("present");
	} else if (DateTime.local().hour > i) {
		text.addClass("past");
	} else if (DateTime.local().hour < i) {
		text.addClass("future");
	}

	// Create save button for the current iteration.
	saveButton
		.html('<i class="fas fa-save"></i>')
		.attr("class", "save-button col-1");

	// Append the time container, textarea, and save-button to the
	// timeslot container of the current iteration.
	timeslot
		.attr("class", "timeslot row")
		.append(time)
		.append(text)
		.append(saveButton);

	// Append the timeslot container to the planner container.
	$("#planner").append(timeslot);
}

// Save Text
// ====================================================================
$(".save-button").on("click", function () {
	// 'this' refers to the save button, so must go up one level to the parent (timeslot)
	// and then select the textarea which is the second child to get the entered text
	// as its value. The first child contains the data-attribute which is used as the key
	// to store the aforementioned content as its value.
	const text = this.parentElement.children[1].value;
	const timeKey = this.parentElement.children[0].getAttribute("data-time");
	localStorage.setItem(timeKey, text);
});
