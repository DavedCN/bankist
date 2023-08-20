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
};

const account2 = {
  owner: "",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

function updateUI(acc) {
  //DISPLAY MOVEMENTS
  displayMovements(acc.movements);

  //DISPLAY BALANCE

  calcDisplayBalance(acc);

  //DISPLAY SUMMARY

  calcDisplaySummary(acc);
}

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.Usernames === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY UIAND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //UPDATE UI

    updateUI(currentAccount);
  }
});

const displayMovements = function (movements, sort = "false") {
  containerMovements.innerHTML = " ";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const depositType = mov > 0 ? `deposit` : `withdrawal`;

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${depositType}">${
      i + 1
    } ${depositType}</div>
   <div class="movements__value">${mov} €</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  console.log(acc.balance);

  labelBalance.textContent = `${acc.balance} €`;
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
  labelSumIn.textContent = `${deposits}€`;

  const withdrawal = movement.movements
    .filter(mov => mov < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  const interest = deposit
    .map(val => val * (movement.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((acc, val) => acc + val);

  labelSumInterest.textContent = `${interest}€`;
};

//IMPLEMENTING TRANSFERS

let transferAcct;
let transferAmount;

btnTransfer.addEventListener("click", transfer);

function transfer(e) {
  e.preventDefault();
  transferAcct = accounts.find(acc => acc.Usernames === inputTransferTo.value);

  transferAmount = Number(inputTransferAmount.value);

  if (
    currentAccount.balance >= transferAmount &&
    transferAmount > 0 &&
    currentAccount.Usernames !== transferAcct?.Usernames &&
    transferAcct
  ) {
    transferAcct?.movements?.push(transferAmount);
    currentAccount.movements.push(-transferAmount);

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

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //ADD MOVEMENTS

    currentAccount.movements.push(amount);

    //UPDATE UI

    updateUI(currentAccount);
  }

  //CLEAR INPUT FIELDS
  inputLoanAmount.value = "";
}
//LOGOUT FEATURE

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  let status = currentAccount.Usernames === inputCloseUsername?.value;
  let statuspin = currentAccount.pin === Number(inputClosePin?.value);

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
  displayMovements(currentAccount.movements, !sorted);

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
