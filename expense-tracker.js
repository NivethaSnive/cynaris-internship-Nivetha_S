
"use strict";

const form = document.querySelector("#expense-form");
const nameInput = document.querySelector("#expense-name");
const amountInput = document.querySelector("#expense-amount");
const categoryInput = document.querySelector("#expense-category");
const expenseList = document.querySelector("#expense-list");
const totalExpenses = document.querySelector("#total-expenses");
const transactionCount = document.querySelector("#transaction-count");
const emptyMessage = document.querySelector("#empty-message");
const formMessage = document.querySelector("#form-message");

let expenses = [];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
});

// Load saved expenses
try {
    const savedExpenses = JSON.parse(
        localStorage.getItem("myExpenses")
    );

    if (Array.isArray(savedExpenses)) {
        expenses = savedExpenses.filter(expense =>
            expense &&
            typeof expense.id === "string" &&
            typeof expense.name === "string" &&
            Number.isFinite(expense.amount) &&
            expense.amount > 0 &&
            typeof expense.category === "string"
        );
    }
} catch (error) {
    expenses = [];
}

// Save expenses to localStorage
function saveExpenses() {
    try {
        localStorage.setItem("myExpenses", JSON.stringify(expenses));
        return true;
    } catch (error) {
        formMessage.textContent =
            "Unable to save data. Check your browser storage.";
        return false;
    }
}

// Display expenses and update totals
function renderExpenses() {
    expenseList.replaceChildren();

    let total = 0;

    expenses.forEach(expense => {
        total += expense.amount;

        const item = document.createElement("article");
        item.classList.add("expense-item");
        item.dataset.id = expense.id;

        const details = document.createElement("div");
        details.classList.add("expense-details");

        const title = document.createElement("h3");
        title.textContent = expense.name;

        const category = document.createElement("p");
        category.textContent = expense.category;

        details.appendChild(title);
        details.appendChild(category);

        const actions = document.createElement("div");
        actions.classList.add("expense-actions");

        const amount = document.createElement("span");
        amount.classList.add("expense-amount");
        amount.textContent = currencyFormatter.format(expense.amount);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.action = "delete";
        deleteButton.setAttribute(
            "aria-label",
            `Delete expense ${expense.name}`
        );

        actions.appendChild(amount);
        actions.appendChild(deleteButton);

        item.appendChild(details);
        item.appendChild(actions);

        expenseList.appendChild(item);
    });

    totalExpenses.textContent = currencyFormatter.format(total);
    transactionCount.textContent = expenses.length;
    emptyMessage.hidden = expenses.length > 0;
}

// Add an expense
form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (!name || !Number.isFinite(amount) || amount <= 0) {
        formMessage.textContent =
            "Enter an expense name and a valid amount.";
        return;
    }

    const expense = {
        id: `${Date.now()}-${Math.random()}`,
        name,
        amount,
        category
    };

    expenses.unshift(expense);

    if (!saveExpenses()) {
        expenses.shift();
        return;
    }

    formMessage.textContent = "Expense added successfully.";
    form.reset();
    renderExpenses();
    nameInput.focus();
});

// Event delegation: delete the selected expense
expenseList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button || !expenseList.contains(button)) {
        return;
    }

    const item = button.closest(".expense-item");

    if (!item) {
        return;
    }

    const expenseId = item.dataset.id;
    const originalExpenses = expenses;

    expenses = expenses.filter(expense => expense.id !== expenseId);

    if (!saveExpenses()) {
        expenses = originalExpenses;
        return;
    }

    formMessage.textContent = "Expense deleted.";
    renderExpenses();
});

// Restore saved expenses when the page loads
renderExpenses();
