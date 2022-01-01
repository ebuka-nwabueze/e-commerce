import fs from "fs";

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
      fs.writeFileSync(this.filename, '[]');
    }
  }
  // promise function to have additionally, good to have outside the constructor.
  // it doesn't need to run immediately on class instatiation.
  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }))
  }; //** end of get all
}

const test = async () => {
    const repo = new UsersRepository("users.json");

    const users = await repo.getAll();
    console.log(users)
};

test();

