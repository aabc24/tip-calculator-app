((d) => {
  let percentage; // Variable to store the tip percentage

  // Selecting various elements from the DOM
  const $bill = d.querySelector("#bill");
  const $people = d.querySelector("#people");
  const $custom = d.querySelector("#custom");
  const $buttons = d.querySelectorAll("[type='button']");
  const $reset = d.querySelector("#reset");
  const $warning = d.querySelector(".warning");
  const $tipPerPersonOutput = d.querySelector("#tipPerPerson");
  const $totalPerPersonOutput = d.querySelector("#totalPerPerson");

  // Function to calculate the tip and total amount per person
  function calculate(select) {
    let billAmount = parseFloat($bill.value);
    let tipPercentage = select / 100;
    let numberOfPeople = parseInt($people.value);

    let tipAmountPerPerson = (billAmount * tipPercentage) / numberOfPeople;
    tipAmountPerPerson = tipAmountPerPerson.toFixed(2);

    let totalMoneyPerPerson =
      billAmount / numberOfPeople + Number(tipAmountPerPerson);
    totalMoneyPerPerson = totalMoneyPerPerson.toFixed(2);

    if (!isNaN(tipAmountPerPerson) && !isNaN(totalMoneyPerPerson)) {
      $tipPerPersonOutput.textContent = `$${tipAmountPerPerson}`;
      $totalPerPersonOutput.textContent = `$${totalMoneyPerPerson}`;
    }
  }

  // Event listener for various click events in the document
  d.addEventListener("click", (e) => {
    if (
      e.target.matches("#bill") &&
      e.target.value !== "0" &&
      percentage != undefined
    ) {
      if ($people.value !== "0") {
        calculate(percentage);
      } else {
        d.body.classList.add("error");
        $warning.textContent = "Can't be zero";
      }
    }

    if (
      e.target.matches("[type='button']") &&
      !e.target.classList.contains("active") &&
      e.target.value !== "Reset"
    ) {
      percentage = parseInt(e.target.value);
      e.target.classList.add("active");
      $custom.value = "";

      for (let i = 0; i < $buttons.length; i++) {
        if (
          $buttons[i].classList.contains("active") &&
          $buttons[i].value !== e.target.value
        ) {
          $buttons[i].classList.remove("active");
        }
      }

      if ($people.value === "0" && $bill.value !== "0") {
        d.body.classList.add("error");
        $warning.textContent = "Can't be zero";
      } else {
        calculate(percentage);
      }
    }

    if (e.target.matches("#custom")) {
      for (let i = 0; i < $buttons.length; i++) {
        $buttons[i].classList.remove("active");
      }

      percentage = parseInt(e.target.value);

      if (
        e.target.value !== "" &&
        $bill.value !== "0" &&
        $people.value == "0"
      ) {
        d.body.classList.add("error");
        $warning.textContent = "Can't be zero";
      } else {
        calculate(percentage);
      }
    }

    if (e.target.matches("#people")) {
      if (e.target.value !== "0") {
        d.body.classList.remove("error");
        $warning.textContent = "";
        calculate(percentage);
      } else if (
        e.target.value == "0" &&
        ($bill.value !== "0" || $custom.value !== "")
      ) {
        d.body.classList.add("error");
        $warning.textContent = "Can't be zero";
        $tipPerPersonOutput.textContent = "$0.00";
        $totalPerPersonOutput.textContent = "$0.00";
      }
    }

    if (e.target.matches("#reset")) {
      $bill.value = 0;
      $people.value = 0;
      $custom.value = "";
      percentage = undefined;
      $warning.textContent = "";
      $tipPerPersonOutput.textContent = "$0.00";
      $totalPerPersonOutput.textContent = "$0.00";
      d.body.classList.remove("error");

      for (let i = 0; i < $buttons.length; i++) {
        if ($buttons[i].classList.contains("active")) {
          $buttons[i].classList.remove("active");
        }
      }
    }

    if ($bill.value !== "0" && percentage != undefined) {
      $reset.removeAttribute("disabled");
    } else {
      $reset.setAttribute("disabled", "true");
    }
  });
})(document);
