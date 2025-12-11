import fs from "fs";
const raw = fs.readFileSync("completed_listings.json", "utf8");
const list = JSON.parse(raw); // <-- JS array
console.log(list);