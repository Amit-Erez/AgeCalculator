import {
  intervalToDuration
} from "https://cdn.skypack.dev/date-fns";


function validateField(input, label, errorBox, rules) {
  const value = input.value.trim();
  input.classList.remove("err");
  label.classList.remove("err");
  errorBox.textContent = "";

  for (let rule of rules) {
    if (!rule.check(value)) {
      input.classList.add("err");
      label.classList.add("err");
      errorBox.textContent = rule.msg;
      return false; 
    }
  }
  return true;
}

function setResult(duration) {
  const answerYears = duration.years;
  const answerMonths = duration.months;
  const answerDays = duration.days;
  document.getElementById("purpleY").textContent = answerYears;
  document.getElementById("purpleM").textContent = answerMonths;
  document.getElementById("purpleD").textContent = answerDays;
}

function resetResult() {
  document.getElementById("purpleY").textContent = "--";
  document.getElementById("purpleM").textContent = "--";
  document.getElementById("purpleD").textContent = "--";
}

document.getElementById("calcBtn").addEventListener("click", () => {

  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dayError = document.getElementById("day__error")
  const monthError = document.getElementById("month__error")
  const yearError = document.getElementById("year__error")

  const yearOk = validateField(yearInput, labelYear, yearError, [
    { check: v => v !== "", msg: "This field is required" },
    { check: v => !isNaN(v) && +v >= 0, msg: "Must be a valid year" }
  ]);

  const monthOk = validateField(monthInput, labelMonth, monthError, [
    { check: v => v !== "", msg: "This field is required" },
    { check: v => !isNaN(v) && +v >= 1 && +v <= 12, msg: "Must be a valid month" }
  ]);

  const dayOk = validateField(dayInput, labelDay, dayError, [
    { check: v => v !== "", msg: "This field is required" },
    { check: v => !isNaN(v) && +v >= 1 && +v <= 31, msg: "Must be a valid day" }
  ]);

    if (!yearOk || !monthOk || !dayOk) {
    resetResult();
    return;
  }

  const today = new Date();
  const dob = new Date(+yearInput.value, +monthInput.value - 1, +dayInput.value);

  if (
    dob.getFullYear() !== +yearInput.value ||
    dob.getMonth() !== +monthInput.value - 1 ||
    dob.getDate() !== +dayInput.value
  ) {
    dayError.textContent = "Must be a valid day";
    dayInput.classList.add("err");
    labelDay.classList.add("err");
    resetResult();
    return;
  }
  if (dob > today) {
    yearError.textContent = "Must be in the past.";
    yearInput.classList.add("err");
    labelYear.classList.add("err");
    resetResult();
    return;
  }

  const duration = intervalToDuration({ start: dob, end: today });
  setResult(duration);

});




