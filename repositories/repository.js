import fs from "fs";
import crypto from "crypto";

class Repository {
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
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);

    return attrs;
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
}

export default Repository;
