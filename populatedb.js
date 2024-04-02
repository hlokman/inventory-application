#! /usr/bin/env node

console.log("test");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");
/*const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");*/

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();

  /*await createBooks();
  await createBookInstances();*/
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function itemCreate(index, name, description, price, stock, category) {
  const item = new Item({
    name: name,
    description: description,
    price: price,
    stock: stock,
    category: category,
  });

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

/*async function bookCreate(index, title, summary, isbn, author, genre) {
  const bookdetail = {
    title: title,
    summary: summary,
    author: author,
    isbn: isbn,
  };
  if (genre != false) bookdetail.genre = genre;

  const book = new Book(bookdetail);
  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}*/

/*async function bookInstanceCreate(index, book, imprint, due_back, status) {
  const bookinstancedetail = {
    book: book,
    imprint: imprint,
  };
  if (due_back != false) bookinstancedetail.due_back = due_back;
  if (status != false) bookinstancedetail.status = status;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances[index] = bookinstance;
  console.log(`Added bookinstance: ${imprint}`);
}*/

//To use the functions that we created
async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Decor", "Diverse range of home decor products."),
    categoryCreate(1, "Bedroom", "Bedroom essentials."),
    categoryCreate(2, "Living Room", "Living room essentials and decor items."),
    categoryCreate(3, "Kitchen", "Kitchen essentials and accessories."),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Floor lamp",
      "The lamp’s shade is made from recycled PET bottles and its solid wood base is made from more sustainable sources. It spreads mood lighting ― you can also adjust the height and hide the cord in the lamp base.",
      59.99,
      45,
      categories[0]
    ),
    itemCreate(
      1,
      "Wall art",
      "Think big when you think about pictures. With a large frame and picture like BJÖRKSTA, you add a touch to the whole room and create the feeling you want. Art that matches both your decor and personality!",
      122.99,
      50,
      categories[0]
    ),
    itemCreate(
      2,
      "Artificial potted plant",
      "With this lifelike potted plant, primarily made from recycled plastic, you can create a little jungle where you can enjoy lush greenery all year round. Simple to bring home since it comes in parts.",
      54.99,
      45,
      categories[0]
    ),
    itemCreate(
      3,
      "Bed frame with storage",
      "A bed frame with hidden storage in several places – perfect if you live in a small space. It has several smart solutions that help you save space.",
      549.99,
      40,
      categories[1]
    ),
    itemCreate(
      4,
      "Foam mattress",
      'A 7⅞" medium-firm mattress with 3 layers of comfort and support. A top layer of cooling material on plush foam combined with memory foam and comfort zones for even distribution of body weight.',
      349.0,
      60,
      categories[1]
    ),
    itemCreate(
      5,
      "Nightstand",
      "The door can be hung to open either right or left.",
      89.99,
      50,
      categories[1]
    ),
    itemCreate(
      6,
      "Sofa",
      "sofa can grow and change with a home and the family. Choose how many seats, the look and function to create a sofa that suits you. A clean design and long-lasting comfort are included.",
      1149.0,
      55,
      categories[2]
    ),
    itemCreate(
      7,
      "Chaise",
      "Storage space under the chaise. The lid stays open so you can safely and easily take things in and out.",
      780.0,
      55,
      categories[2]
    ),
    itemCreate(
      8,
      "Induction cooktop",
      "Free your kitchen from a hanging hood and place your cooktop wherever you like. This sleek induction cooktop comes with an integrated extractor that is automated - the higher the heat the greater the extraction.",
      1999.0,
      40,
      categories[3]
    ),
    itemCreate(
      9,
      "Pot",
      "This stainless steel pot has a spout to make pouring and draining liquids easier and a heat resistant glass lid with a built in strainer. Perfect for when you are boiling pasta or making soup.",
      34.99,
      60,
      categories[3]
    ),
  ]);
}

/*async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate(0, "Patrick", "Rothfuss", "1973-06-06", false),
    authorCreate(1, "Ben", "Bova", "1932-11-8", false),
    authorCreate(2, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
    authorCreate(3, "Bob", "Billings", false, false),
    authorCreate(4, "Jim", "Jones", "1971-12-16", false),
  ]);
}*/

/*async function createBookInstances() {
  console.log("Adding authors");
  await Promise.all([
    bookInstanceCreate(
      0,
      books[0],
      "London Gollancz, 2014.",
      false,
      "Available"
    ),
    bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
    bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
    bookInstanceCreate(
      3,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(
      4,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(
      5,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(
      6,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Available"
    ),
    bookInstanceCreate(
      7,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Maintenance"
    ),
    bookInstanceCreate(
      8,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Loaned"
    ),
    bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
    bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
  ]);
}*/
