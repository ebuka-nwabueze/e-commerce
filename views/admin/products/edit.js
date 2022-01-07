import layout from "../layout.js";
import { getErrors } from "../../helper.js";



export default ({errors, product}) => {
    return layout(
       { content: `
       <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>
           <form method="POST" enctype="multipart/form-data" >
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
             <br />
             <button class="button is-primary">Update</button>
             <a href="/admin/products" class="button is-danger">Cancel</a>
           </form>
           </div>
        </div>


     `})
};