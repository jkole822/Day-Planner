// Render Date
// ====================================================================
const DateTime = luxon.DateTime;

const now = DateTime.local().toFormat("DDDD");

$("#currentDay").text(now);

// Render Timeslots
// ====================================================================
for (let i = 6; i < 19; i++) {
	const timeslot = $("<div>");
	const time = $("<div>");
	const timeText = $("<p>");
	const text = $("<textarea>");
	const saveButton = $("<button>");

	timeText.addClass("time-text").text(`${i}:00`);

	time.attr("class", "time-box col-1").attr("data-time", i).append(timeText);

	text.attr("class", "text-box col-10").text(localStorage.getItem(i));
	if (DateTime.local().hour === i) {
		text.addClass("present");
	} else if (DateTime.local().hour > i) {
		text.addClass("past");
	} else if (DateTime.local().hour < i) {
		text.addClass("future");
	}
	saveButton
		.html('<i class="fas fa-save"></i>')
		.attr("class", "save-button col-1");

	timeslot
		.attr("class", "timeslot row")
		.append(time)
		.append(text)
		.append(saveButton);

	$("#planner").append(timeslot);
}

// Save Text
// ====================================================================
$(".save-button").on("click", function () {
	const text = this.parentElement.children[1].value;
	const timeKey = this.parentElement.children[0].getAttribute("data-time");
	localStorage.setItem(timeKey, text);
});
