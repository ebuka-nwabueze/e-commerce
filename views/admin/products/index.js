import layout from "../layout.js";
import { getErrors } from "../../helper.js"


export default ({ products }) => {
    const renderedProducts = products.map((product)=>{
       return `
       <div>${product.title}</div>
        `;
    }).join('')
    console.log(renderedProducts)

    return layout({
        content: `
            <h1 class="title">Product</h1>
            ${renderedProducts}
        `
    });
};