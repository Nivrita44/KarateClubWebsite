// hash.js
import bcrypt from "bcrypt";

const plainPassword = "ins123";

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log("Hashed password:", hash);
});
