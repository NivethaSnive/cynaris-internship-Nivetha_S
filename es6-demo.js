
"use strict";

// 1. Dataset: array of product objects
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 45000 },
    { id: 2, name: "Headphones", category: "Electronics", price: 2000 },
    { id: 3, name: "Keyboard", category: "Accessories", price: 1500 },
    { id: 4, name: "Mouse", category: "Accessories", price: 800 },
    { id: 5, name: "Smartphone", category: "Electronics", price: 25000 },
    { id: 6, name: "USB Cable", category: "Accessories", price: 300 }
];

// 2. Arrow function
const formatPrice = price => `₹${price.toLocaleString("en-IN")}`;

// 3. Object destructuring and template literals
const createProductCard = ({ name, category, price }) => `
    <article class="product">
        <h3>${name}</h3>
        <p>Category: ${category}</p>
        <p>Price: <strong>${formatPrice(price)}</strong></p>
    </article>
`;

// 4. Array destructuring
const [firstProduct, secondProduct, ...otherProducts] = products;

console.log("First product:", firstProduct.name);
console.log("Second product:", secondProduct.name);
console.log("Remaining products:", otherProducts.length);

// 5. Array methods: filter(), map() and reduce()
const affordableProducts = products.filter(product => product.price < 5000);

const productNames = products.map(({ name }) => name);

const totalPrice = products.reduce(
    (total, { price }) => total + price,
    0
);

console.log("Products under ₹5,000:", affordableProducts);
console.log("Product names:", productNames);
console.log("Total value of products:", formatPrice(totalPrice));

// 6. DOM elements
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortButton = document.querySelector("#sort-button");
const productList = document.querySelector("#product-list");
const summary = document.querySelector("#summary");

let sortAscending = true;

// 7. Filter, sort and display products
const renderProducts = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    let filteredProducts = products.filter(({ name, category }) => {
        const matchesSearch = name.toLowerCase().includes(searchText);
        const matchesCategory =
            selectedCategory === "All" || category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortAscending) {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        );
    } else {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
        );
    }

    // map() creates the product cards
    productList.innerHTML = filteredProducts
        .map(createProductCard)
        .join("");

    // reduce() calculates the total of visible products
    const visibleTotal = filteredProducts.reduce(
        (total, { price }) => total + price,
        0
    );

    summary.textContent =
        `Showing ${filteredProducts.length} products | ` +
        `Total value: ${formatPrice(visibleTotal)}`;
};

// 8. Event listeners
searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);

sortButton.addEventListener("click", () => {
    sortAscending = !sortAscending;
    sortButton.textContent = sortAscending
        ? "Sort by Price: Low to High"
        : "Sort by Price: High to Low";

    renderProducts();
});

// 9. Initial display
renderProducts();
