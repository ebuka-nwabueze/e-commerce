import Repository from "./repository.js";

class cartsRepository extends Repository {}

export const cartsRepo = new cartsRepository("carts.json")