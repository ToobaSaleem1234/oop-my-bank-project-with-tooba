#! /usr/bin/env  node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("=".repeat(100));
console.log(chalk.bold.magentaBright("\n\t Welcome-code-with-tooba--oop--my-bank\n\t"));
console.log("=".repeat(100));
// class bank account:
class BankAccount {
    accountNumber;
    balance;
    constructor(accNumber, accbalance) {
        this.accountNumber = accNumber;
        this.balance = accbalance;
    }
    // withdraw function:
    withdraw(withdrawamount) {
        if (this.balance >= withdrawamount) {
            this.balance -= withdrawamount;
            console.log(`Withdrawl of ${withdrawamount} successfully...
        Remaining balance is:$${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    // deposit function:
    deposit(depositamount) {
        if (depositamount > 100) {
            depositamount -= 1;
            this.balance += depositamount;
        }
        console.log(`Deposit of $${depositamount} successfuly.
            Current balance is:$${this.balance}`);
    }
    // check balance:
    checkBalance() {
        console.log(`Current balance is:$${this.balance}`);
    }
}
// class customer:
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(fName, lName, gender, age, mobileNum, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNum;
        this.account = acc;
    }
}
// create bank:
let HBL = [
    new BankAccount(10001, 500),
    new BankAccount(10002, 700),
    new BankAccount(10003, 1000)
];
// create customers:
let customers = [
    new Customer("Tooba", "Saleem", "Female", 24, 3252128571, HBL[0]),
    new Customer("Areeba", "Saleem", "Female", 21, 3252128571, HBL[1]),
    new Customer("Sara", "Atif", "Female", 34, 3252128571, HBL[2])
];
// functions to interact with bank account:
async function services() {
    do {
        let user_acc_num = await inquirer.prompt([
            {
                name: "AccountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        ]);
        let customer = customers.find(customer => customer.account.accountNumber === user_acc_num.AccountNumber);
        if (customer) {
            console.log(chalk.italic.red(`\n Welcome, ${customer.firstName}${customer.lastName}!\n`));
            let ans = await inquirer.prompt([
                {
                    name: "Selection",
                    type: "list",
                    message: "Select an operation to perform:",
                    choices: ["withdraw", "deposit", "checkBalance", "Exit"]
                }
            ]);
            switch (ans.Selection) {
                case "withdraw":
                    let withdraw_amount = await inquirer.prompt([
                        {
                            name: "withdrawamount",
                            type: "number",
                            message: "Enter your amount to withdraw:",
                        }
                    ]);
                    customer.account.withdraw(withdraw_amount.withdrawamount);
                    break;
                case "deposit":
                    let deposit_amount = await inquirer.prompt([
                        {
                            name: "depositamount",
                            type: "number",
                            message: "Enter your amount to deposit:"
                        }
                    ]);
                    customer.account.deposit(deposit_amount.depositamount);
                    break;
                case "checkBalance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting.......");
                    console.log(chalk.bold.green("\n\t Thank you! for using our services...\t"));
                    return;
            }
        }
        else {
            console.log("Incorrect account number..Please try again!");
        }
    } while (true);
}
services();
