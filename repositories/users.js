import fs from "fs";
import crypto from "crypto";
import util from "util";
import Repository from "./repository.js";

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    // attach an id to a new record
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");

    const buffer = await scrypt(attrs.password, salt, 64);

    // retrieve all data inside the repository file
    const records = await this.getAll();

    // take the new data and push into the repository file
    const record = {
      ...attrs,
      password: `${buffer.toString("hex")}.${salt}`,
    };
    records.push(record);

    // save the new data into the filename.
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuffer.toString("hex");
  }

} // end of constructor

export const repo = new UsersRepository("users.json");

// const test = async () => {
//   const repo = new UsersRepository("users.json");

//   // await repo.create({email: 'test@email.com', password:'password'})
//   // const users = await repo.getAll();

//   // const user = await repo.getOne('2ca8cf42')
//   // const c_user = user !== undefined ? user : 'User not found'
//   // const deleteUser = await repo.delete("2ca8cf42");
//   // await repo.update('99d30718',{phone: "09082827272"});
//   const filteredValue = await repo.getOneBy({email:"test@email.com", phone: "09082827272"})

//   console.log(filteredValue);
// };

// test();
