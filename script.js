"use strict";

const bodyy = document.querySelector(".bodyy");
const btnsign = document.querySelector(".btnsign");
const section = document.querySelector(".section");

let firstName;
let lastName;
let fullName;
let pin;

btnsign.addEventListener("click", onClick);

function onClick(e) {
  e.preventDefault();
  bodyy.classList.add("disappear");
  section.classList.remove("disappear");

  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  account2.owner = firstName + " " + lastName;
  account2.pin = Number(document.getElementById("pin").value);

  createUsernames(accounts);
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-08-20T17:01:17.194Z",
    "2023-08-11T23:36:17.929Z",
    "2023-08-24T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-08-26T12:01:20.894Z",
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function FormattedMovementDates(date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "TODAY";
  if (daysPassed === 1) return "YESTERDAY";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(navigator.language).format(date);

  console.log(daysPassed);
}

function updateUI(acc) {
  //DISPLAY MOVEMENTS
  displayMovements(acc);

  //DISPLAY BALANCE

  calcDisplayBalance(acc);

  //DISPLAY SUMMARY

  calcDisplaySummary(acc);
}

const startLogOutTimer = function () {
  //Call the timer every second
  //set time to 5 minutes
  let time = 120;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print the remaining time to the User Interface
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }

    time--;
  };

  //When 0 seconds, stop timer and logout USer

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

function formatCur(value, locale, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

let currentAccount, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.Usernames === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //DISPLAY UI AND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //CALL TIMER

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //UPDATE UI

    updateUI(currentAccount);

    //GET DATE

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const locale = navigator.language;
    console.log(locale);

    const displayDate = new Intl.DateTimeFormat(locale, options).format(now);

    labelDate.textContent = displayDate;
  }
});

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = " ";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const depositType = mov > 0 ? `deposit` : `withdrawal`;

    const date = new Date(acc.movementsDates[i]);

    const displayDate = FormattedMovementDates(date);

    const formattedNumber = formatCur(mov);

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${depositType}">${
      i + 1
    } ${depositType}</div>
    <div class="movements__date">${displayDate}</div>
   <div class="movements__value">${formattedNumber} </div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  console.log(acc.balance);

  labelBalance.textContent = formatCur(acc.balance);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.Usernames = acc.owner
      .toLowerCase()
      .split(" ")
      .map(accs => accs[0])
      .join("");
  });
};

const calcDisplaySummary = function (movement) {
  const deposit = movement.movements.filter(mov => mov > 0);
  const deposits = deposit.reduce((acc, val) => acc + val);
  labelSumIn.textContent = formatCur(deposits);

  const withdrawal = movement.movements
    .filter(mov => mov < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = formatCur(Math.abs(withdrawal));

  const interest = deposit
    .map(val => val * (movement.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((acc, val) => acc + val);

  labelSumInterest.textContent = formatCur(interest);
};

//IMPLEMENTING TRANSFERS

let transferAcct;
let transferAmount;

btnTransfer.addEventListener("click", transfer);

function transfer(e) {
  e.preventDefault();
  transferAcct = accounts.find(acc => acc.Usernames === inputTransferTo.value);

  transferAmount = +inputTransferAmount.value;

  if (
    currentAccount.balance >= transferAmount &&
    transferAmount > 0 &&
    currentAccount.Usernames !== transferAcct?.Usernames &&
    transferAcct
  ) {
    transferAcct?.movements?.push(transferAmount);
    currentAccount.movements.push(-transferAmount);

    //UPDATE DATE

    transferAcct?.movementsDates?.push(new Date().toISOString());
    currentAccount?.movementsDates?.push(new Date().toISOString());

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();

    //UPDATE UI

    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();
}

//IMPLEMENTING LOAN
btnLoan.addEventListener("click", getLoan);

function getLoan(e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //ADD MOVEMENTS

    setTimeout(function () {
      currentAccount.movements.push(amount);

      //UPDATE DATE

      transferAcct?.movementsDates?.push(new Date().toISOString());
      currentAccount?.movementsDates?.push(new Date().toISOString());

      //Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();

      //UPDATE UI

      updateUI(currentAccount);
    }, 4500);
  }

  //CLEAR INPUT FIELDS
  inputLoanAmount.value = "";
}
//LOGOUT FEATURE

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  let status = currentAccount.Usernames === inputCloseUsername?.value;
  let statuspin = currentAccount.pin === +inputClosePin?.value;

  if (statuspin && status) {
    containerApp.style.opacity = 0;
    // let index = accounts.findIndex(
    //   acc => acc.Usernames === currentAccount.Usernames
    // );
    // accounts.splice(index, 1);
    // console.log(index);
  }

  inputClosePin.value = inputCloseUsername.value = "";

  labelWelcome.textContent = `Log in to get started`;
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault;
  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});

// btnLogin.addEventListener("click", function (e) {
//   e.preventDefault();

//   currentAccount = accounts.find(
//     acc => acc.Usernames === inputLoginUsername.value
//   );

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     //DISPLAY UIAND WELCOME MESSAGE
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(" ")[0]
//     }`;
//     containerApp.style.opacity = 100;

//EVENT HANDLER

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctdogsJulia = dogsJulia.slice(1, -2);

//   const dogData = correctdogsJulia.concat(dogsKate);

//   dogData.forEach(function (years, i) {
//     const age = years < 3 ? "puppy" : "adult";

//     console.log(`Dog number ${i + 1} is an ${age}, and is ${years} years old`);
//   });
// };

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const checkMate = [0, 1, 2, 3, 4, 5];

// const newCheckMate = checkMate.map(
//   (value, key, array) =>
//     `Index ${key} : ${value} and the whole array is ${array}`
// );

// console.log(newCheckMate);
// console.log(checkMate);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));

//   console.log(humanAge);
//   const adultDogs = humanAge.filter(age => age >= 18);

//   console.log(adultDogs);
//   const averageAdultAge =
//     adultDogs.reduce((acc, age) => (acc += age), 0) / adultDogs.length;

//   console.log(averageAdultAge);
//   return averageAdultAge;
// };

// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

//1.
dogs.forEach(dog => (dog.recommendedFood = Math.trunc(dog.weight * 0.75 * 28)));

console.log(dogs);

//2

let own = dogs.find(dog => dog.owners.includes("Sarah"));

console.log(own);

//3

let eatTooMuch = [];
let eatTooLittle = [];

dogs
  .map((acc, cur) =>
    cur.curFood > cur.recommendedFood
      ? eatTooMuch.push(cur.owners)
      : eatTooLittle.push(cur.owners)
  )
  .flat();

console.log(eatTooMuch);
