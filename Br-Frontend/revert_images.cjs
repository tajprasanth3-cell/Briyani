const fs = require('fs');
const file = 'c:/Users/HPADMIN/Desktop/br/Br-Frontend/src/components/Menu.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/image:\s*"https:\/\/images\.unsplash\.com[^"]+"/g, (match, offset, string) => {
  const snippet = string.substring(Math.max(0, offset - 150), offset + 50);
  
  if (snippet.includes('name: "Classic Vanilla Ice Cream"')) return 'image: vanillaIceCreamImg';
  if (snippet.includes('name: "Belgian Chocolate Ice Cream"')) return 'image: chocolateIceCreamImg';
  if (snippet.includes('name: "Strawberry Ripple Ice Cream"')) return 'image: strawberryIceCreamImg';
  if (snippet.includes('name: "Alphonso Mango Ice Cream"')) return 'image: mangoIceCreamImg';
  if (snippet.includes('name: "Pistachio Nut Ice Cream"')) return 'image: pistachioIceCreamImg';
  if (snippet.includes('name: "Butterscotch Ice Cream"')) return 'image: coffeeIceCreamImg';
  if (snippet.includes('name: "Cookies & Cream"')) return 'image: vanillaIceCreamImg';
  if (snippet.includes('name: "Mint Chocolate Chip"')) return 'image: pistachioIceCreamImg';
  if (snippet.includes('name: "Coffee Mocha Ice Cream"')) return 'image: coffeeIceCreamImg';
  if (snippet.includes('name: "Rocky Road Ice Cream"')) return 'image: chocolateIceCreamImg';
  
  if (snippet.includes('name: "Classic Cola"')) return 'image: colaImg';
  if (snippet.includes('name: "Lemon Soda"')) return 'image: lemonSodaImg';
  if (snippet.includes('name: "Orange Fizz"')) return 'image: orangeSodaImg';
  if (snippet.includes('name: "Ginger Ale"')) return 'image: gingerAleImg';
  if (snippet.includes('name: "Masala Jeera Soda"')) return 'image: jeeraSodaImg';
  
  if (snippet.includes('name: "Mutton Rogan Josh"')) return 'image: muttonImg';
  if (snippet.includes('name: "Mutton Pepper Fry"')) return 'image: muttonImg';
  if (snippet.includes('name: "Paneer Butter Masala"')) return 'image: vegspecial';
  if (snippet.includes('name: "Kadai Vegetable"')) return 'image: vegImg';
  if (snippet.includes('name: "Chicken Tikka Masala"')) return 'image: chickenImg';
  if (snippet.includes('name: "Butter Chicken"')) return 'image: chickenImg';

  if (snippet.includes('category: "Chicken"')) return 'image: chickenImg';
  if (snippet.includes('category: "Mutton"')) return 'image: muttonImg';
  if (snippet.includes('category: "Veg"')) return 'image: vegImg';
  
  // default special
  return 'image: specialImg';
});

fs.writeFileSync(file, content, 'utf8');
console.log('Images reverted in Menu.jsx!');
