import fs from "fs";
import crypto from "crypto";
import util from "util";

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  constructor(filename) {
    // check if a filename was passed call this class
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }
    this.filename = filename;
    // check if the file exist within the current directory
    //the class was called and create one if it does not exist.
    // Synchronous is used to check immediately before it continues that it exist. it is the best case for
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  // promise function to have additionally, good to have outside the constructor.
  // it doesn't need to run immediately on class instatiation.
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: "utf8" })
    );
  }

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

  // helper function to write new file
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`The user with ${id} not found`);
    }

    Object.assign(record, attrs);

    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
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
