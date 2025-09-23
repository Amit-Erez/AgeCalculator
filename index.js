import {
  intervalToDuration,
  formatDuration,
} from "https://cdn.skypack.dev/date-fns";

document.getElementById("purpleY").innerHTML = `--`
document.getElementById("purpleM").innerHTML = `--`
document.getElementById("purpleD").innerHTML = `--`


document.getElementById("calcBtn").addEventListener("click", () => {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dayError = document.getElementById("day__error")
  const monthError = document.getElementById("month__error")
  const yearError = document.getElementById("year__error")

  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  let hasError = false;

  if (yearInput.value.trim() === "") {
    yearError.textContent = "This field is required";
    hasError = true;
  } else if (isNaN(year) || year < 0) {
    yearError.textContent = "Year must be a valid year";
    hasError = true;
  }

  if (monthInput.value.trim() === "") {
    monthError.textContent = "This field is required";
    hasError = true;
  } else if (isNaN(month) || month < 1 || month > 12) {
    monthError.textContent = "Month must be a valid month";
    hasError = true;
  }

  if (dayInput.value.trim() === "") {
    dayError.textContent = "This field is required";
    hasError = true;
  } else if (isNaN(day) || day < 0 || day > 31) {
    dayError.textContent = "Day must be a valid day";
    hasError = true;
  }

  const dob = new Date(year, month - 1, day);

  if (!hasError) {
    if (
        dob.getFullYear() !== year ||
        dob.getMonth() !== month - 1 ||
        dob.getDate() !== day
    ) {
        dayError.textContent = `That date does not exist.`;
        hasError = true;
    }
  }

  if (hasError) {
    document.getElementById("purpleY").textContent = "--";
    document.getElementById("purpleM").textContent = "--";
    document.getElementById("purpleD").textContent = "--";
    return
  }

  const today = new Date();
  const duration = intervalToDuration({ start: dob, end: today });
  const answerYears = duration.years;
  const answerMonths = duration.months;
  const answerDays = duration.days;

  document.getElementById("purpleY").textContent = answerYears;
  document.getElementById("purpleM").textContent = answerMonths;
  document.getElementById("purpleD").textContent = answerDays;

});

