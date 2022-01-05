import Repository from './repository.js'

class ProductRepository extends Repository{}

export const productRepo = new ProductRepository("products.json");

