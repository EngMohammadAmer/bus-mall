'use strict';

let totalClicks = 0;
let allowedClicks = 25;
let resultsButton = document.getElementById('view');

let leftImage = document.getElementById('left-image');
let centerImage = document.getElementById('center-image');
let rightImage = document.getElementById('right-image');
let imagesSection = document.getElementById('images-section');

Product.all = [];
function Product(name, fileExtension) {
  this.name = name;
  this.src = `./img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}

let retrieveProducts = localStorage.getItem('products');

if (retrieveProducts) {
  let parsedProducts = JSON.parse(retrieveProducts);
  Product.all = parsedProducts;
} else {
  new Product('bag', 'jpg');
  new Product('banana', 'jpg');
  new Product('bathroom', 'jpg');
  new Product('boots', 'jpg');
  new Product('breakfast', 'jpg');
  new Product('bubblegum', 'jpg');
  new Product('chair', 'jpg');
  new Product('cthulhu', 'jpg');
  new Product('dog-duck', 'jpg');
  new Product('dragon', 'jpg');
  new Product('pen', 'jpg');
  new Product('pet-sweep', 'jpg');
  new Product('scissors', 'jpg');
  new Product('shark', 'jpg');
  new Product('sweep', 'png');
  new Product('tauntaun', 'jpg');
  new Product('unicorn', 'jpg');
  new Product('usb', 'gif');
  new Product('water-can', 'jpg');
  new Product('wine-glass', 'jpg');

}

function getRandomIndex() {
  return Math.floor(Math.random() * Product.all.length);
}

function renderProducts() {
  let productArray = [];
  productArray[0] = getRandomIndex();
  productArray[1] = getRandomIndex();
  productArray[2] = getRandomIndex();
  while (productArray[0] === productArray[1]) {
    productArray[1] = getRandomIndex();
  }
  while (productArray[0] === productArray[2]) {
    productArray[2] = getRandomIndex();
  }
  while (productArray[1] === productArray[2]) {
    productArray[2] = getRandomIndex();
  }

  leftImage.src = Product.all[productArray[0]].src;
  leftImage.name = Product.all[productArray[0]].name;
  Product.all[productArray[0]].views++;

  centerImage.src = Product.all[productArray[1]].src;
  centerImage.name = Product.all[productArray[1]].name;
  Product.all[productArray[1]].views++;

  rightImage.src = Product.all[productArray[2]].src;
  rightImage.name = Product.all[productArray[2]].name;
  Product.all[productArray[2]].views++;
}

function renderResults() {
  let myList = document.getElementById('final-result');
  for (let i = 0; i < Product.all.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.`;
    myList.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === imagesSection) {
    alert('Please Select an image');
  }

  totalClicks++;
  let productClicked = event.target.name;

  for (let i=0; i < Product.all.length; i++) {
    if (productClicked === Product.all[i].name) {
      Product.all[i].votes++;
    }
  }

  renderProducts();
  if (totalClicks === allowedClicks) {
    imagesSection.removeEventListener('click', handleClick);
  }
}

function handleButtonClick() {
  if(totalClicks === allowedClicks) {
    renderResults();
    createChart(); // ### chartjs
  }
  let stringifiedProducts = JSON.stringify(Product.all);

  localStorage.setItem('products', stringifiedProducts);
}
renderProducts();

imagesSection.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleButtonClick);


// ### chartjs

function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');

  const productName = [];
  const productVotes = [];
  const productViews = [];
  for (let i = 0; i < Product.all.length; i++) {
    productName.push(Product.all[i].name);
    productVotes.push(Product.all[i].votes);
    productViews.push(Product.all[i].views);
  }
  console.log('Votes', productVotes);
  console.log('Views', productViews);
  new Chart (ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of votes:',
        backgroundColor: 'rgb(100, 125, 50)',
        data: productVotes,
      },
      {
        label: '# of views:',
        backgroundColor: 'rgb(220, 125, 50)',
        data: productViews,
      }
      ],
    },
    options: {
    },
  });
}

