#! /usr/bin/env node
 

import inquirer from "inquirer";
import chalk from "chalk";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

        let answer = await inquirer.prompt([
            {
                name: "student",
                type: "input",
                message: "Enter student name",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please enter a non-empty value.";
                }
            },
            {
                name: "courses",
                type: "list",
                message: "Select the course to enroll in",
                choices: ["Html", "Javascript", "Typescript", "Python"]
            }
        ]);

        const tuitionFees: { [key: string]: number } = {
            "Html": 2500,
            "Javascript": 5000,
            "Typescript": 6000,
            "Python": 10000,
        };

        console.log(`\nTuition Fees: ${tuitionFees[answer.courses]}/-\n`);
        console.log(`Balance: ${myBalance}\n`);

        let paymentType = await inquirer.prompt([
            {
                name: "payment",
                type: "list",
                message: "Select payment method",
                choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
            },
            {
                name: "amount",
                type: "input",
                message: "Transfer Money",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please enter a non-empty value.";
                }
            }
        ]);

        console.log(chalk.greenBright(`\nYou selected payment method ${paymentType.payment}\n`));

        const tuitionFee = tuitionFees[answer.courses];
        const paymentAmount = parseFloat(paymentType.amount);

        if (tuitionFee === paymentAmount) {
            console.log(chalk.yellow(`Congratulations, you have successfully enrolled in ${answer.courses}.\n`));

            let ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["View status", "Exit"]
                }
            ]);

            if (ans.select === "View status") {
                console.log(chalk.greenBright.bold.underline("\n******************* Status *********************\n"));
                console.log(chalk.cyan.bold(`Student Name: ${answer.student}`));
                console.log(chalk.yellow.bold(`Student ID: ${randomNumber}`));
                console.log(chalk.green.bold(`Course: ${answer.courses}`));
                console.log(chalk.blue.bold(`Tuition Fees Paid: ${tuitionFee}`));
                console.log(chalk.redBright.bold(`Payment Amount: ${paymentAmount}`));
                myBalance += paymentAmount;
                console.log(chalk.yellowBright.bold(`Balance: ${myBalance}`));
            } else {
                console.log("\nExiting Student Management System\n");
            }
        } else {
            console.log(chalk.blue('Invalid amount due to course\n'));
        }
    
