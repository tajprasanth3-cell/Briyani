const fs = require('fs');
const file = 'c:/Users/HPADMIN/Desktop/br/Br-Frontend/src/components/Menu.jsx';
let content = fs.readFileSync(file, 'utf8');

const images = {
  biryani: [
    '"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80"',
    '"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"',
    '"https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=600&q=80"',
    '"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80"',
    '"https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&q=80"',
    '"https://images.unsplash.com/photo-1629236714585-802525166299?w=600&q=80"'
  ],
  curry: [
    '"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"',
    '"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"',
    '"https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?w=600&q=80"'
  ],
  dessert: [
    '"https://images.unsplash.com/photo-1570197781417-0a5f90c67e81?w=600&q=80"',
    '"https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=600&q=80"',
    '"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80"',
    '"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80"',
    '"https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80"'
  ],
  soda: [
    '"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80"',
    '"https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80"',
    '"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=80"',
    '"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80"'
  ]
};

let biryaniIdx = 0;
let curryIdx = 0;
let dessertIdx = 0;
let sodaIdx = 0;

content = content.replace(/image:\s*([a-zA-Z0-9_]+)/g, (match, p1, offset, string) => {
  const snippet = string.substring(Math.max(0, offset - 150), offset + 50);
  
  if (snippet.includes('category: "Dessert"')) {
    const url = images.dessert[dessertIdx % images.dessert.length];
    dessertIdx++;
    return 'image: ' + url;
  } else if (snippet.includes('category: "Beverage"')) {
    const url = images.soda[sodaIdx % images.soda.length];
    sodaIdx++;
    return 'image: ' + url;
  } else if (snippet.includes('Curry') || snippet.includes('Masala') || snippet.includes('Fry') || snippet.includes('Roast')) {
    const url = images.curry[curryIdx % images.curry.length];
    curryIdx++;
    return 'image: ' + url;
  } else {
    const url = images.biryani[biryaniIdx % images.biryani.length];
    biryaniIdx++;
    return 'image: ' + url;
  }
});

fs.writeFileSync(file, content, 'utf8');
console.log('Images replaced in Menu.jsx!');
