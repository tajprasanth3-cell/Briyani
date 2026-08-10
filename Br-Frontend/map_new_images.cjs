const fs = require('fs');
const file = 'c:/Users/HPADMIN/Desktop/br/Br-Frontend/src/components/Menu.jsx';
let content = fs.readFileSync(file, 'utf8');

const imports = `import kadaiVegImg from "./Images/Kadai Vegetable.jpg";
import paneerButterImg from "./Images/Paneer Butter Masala.jpg";
import soyaChaapImg from "./Images/Soya Chaap Biryani.jpg";
import mushroomDumImg from "./Images/Mushroom Dum Biryani.jpg";
import newFishTikkaImg from "./Images/Fish Tikka Biryani.jpg";
import newEggDumImg from "./Images/Egg Dum Biryani.jpg";
import roganJoshImg from "./Images/Mutton Rogan Josh.jpg";
import pepperFryImg from "./Images/Mutton Pepper Fry.jpg";
import keemaImg from "./Images/Keema Biryani.jpg";
import tandooriImg from "./Images/Tandoori Chicken Biryani.jpg";
import afghaniImg from "./Images/Murgh Afghani Biryani.jpg";
import tikkaDumImg from "./Images/Chicken Tikka Dum Biryani.jpg";
import tikkaMasalaImg from "./Images/Chicken Tikka Masala.jpg";
import butterChickenImg from "./Images/Butter Chicken.jpg";
`;

if (!content.includes('Kadai Vegetable.jpg')) {
  content = content.replace('const MENU_ITEMS', imports + '\nconst MENU_ITEMS');
}

const map = {
  'Kadai Vegetable': 'kadaiVegImg',
  'Paneer Butter Masala': 'paneerButterImg',
  'Soya Chaap Biryani': 'soyaChaapImg',
  'Mushroom Dum Biryani': 'mushroomDumImg',
  'Fish Tikka Biryani': 'newFishTikkaImg',
  'Egg Dum Biryani': 'newEggDumImg',
  'Mutton Rogan Josh': 'roganJoshImg',
  'Mutton Pepper Fry': 'pepperFryImg',
  'Keema Biryani': 'keemaImg',
  'Tandoori Chicken Biryani': 'tandooriImg',
  'Murgh Afghani Biryani': 'afghaniImg',
  'Chicken Tikka Dum Biryani': 'tikkaDumImg',
  'Chicken Tikka Masala': 'tikkaMasalaImg',
  'Butter Chicken': 'butterChickenImg',
};

for (const name of Object.keys(map)) {
  const imgVar = map[name];
  const regex = new RegExp('(name:\\s*"' + name + '",[\\s\\S]*?image:\\s*)([a-zA-Z0-9_]+)(\\s*,)', 'g');
  content = content.replace(regex, '$1' + imgVar + '$3');
}

fs.writeFileSync(file, content, 'utf8');
console.log('Images updated based on names!');
