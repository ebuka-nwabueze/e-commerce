import layout from "../layout.js";
import { getErrors } from "../../helper.js";



export default ({product}) => {
    return layout(
       { content: `
       <div class="columns is-centered">
        <div class="column is-half">
           <form method="POST" >
             <div class="field">
               <label class="label">Title</label>
               <input class="input" placeholder="Title" name="title" value="${product.title}">
             </div>
             <div class="field">
               <label class="label">Price</label>
               <input class="input" placeholder="Price" name="price" value="${product.price}">
             </div>
             <div class="field">
               <label class="label">Image</label>
               <input class="file" placeholder="Image" name="image">
             </div>

             <button class="button is-primary">Update Product</button>
           </form>
           </div>
        </div>


     `})
};