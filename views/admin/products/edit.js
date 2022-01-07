import layout from "../layout.js";
import { getErrors } from "../../helper.js";



export default ({errors, product}) => {
    return layout(
       { content: `
       <div class="columns is-centered">
        <div class="column is-half">
           <form method="POST" >
             <div class="field">
               <label class="label">Title</label>
               <input class="input" placeholder="Title" name="title" value="${product.title}">
               <p class="help is-danger">${getErrors(errors, 'title')}</p>
             </div>
             <div class="field">
               <label class="label">Price</label>
               <input class="input" placeholder="Price" name="price" value="${product.price}">
               <p class="help is-danger">${getErrors(errors, 'price')}</p>
             </div>
             <div class="field">
               <label class="label">Image</label>
               <input type="file" placeholder="Image" name="image">
               <p class="help is-danger">${getErrors(errors, 'image')}</p>
             </div>

             <button class="button is-primary">Update Product</button>
           </form>
           </div>
        </div>


     `})
};