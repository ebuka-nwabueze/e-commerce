import layout from "../layout.js";
import { getErrors } from "../../helper.js";

export default ({errors}) => {
    return layout(
       { content: `
       <form method="post" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Title">
            <input type="text" name="price" placeholder="Price">
            <input type="file" name="image" placeholder="Image">
            <button type="submit">Create Product</button>
        </form>
        `})
};