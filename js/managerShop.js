const nameInput = document.getElementById("nameProduct");
const imgInput = document.getElementById("imgProduct");
const priceInput = document.getElementById("priceProduct");
const idInput = document.getElementById("id_product");
// form submit >>>
function onFormSubmit() {
  addProduct(); // Add Product to Cart in localStorage
  showProducts(); // Show Products to HTML in Manager Page
  reset_form(); // reset form after submit product
}
// add product to Cart in localStorage >>>
function addProduct() {
  let product = {
    nameProduct: nameInput.value,
    imgProduct: imgInput.value,
    priceProduct: priceInput.value,
    id: createUuIdv4(),
  };
  let products = getProductsFromLocalStorage();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}
// show products to HTML in Manager Page >>>
function showProducts() {
  let products = getProductsFromLocalStorage();
  let showProducts = "";
  for (let index = 0; index < products.length; index++) {
    let product = products[index];
    showProducts += `<div class="col-md-3 my-3 itemsBox">
                  <div class="card border-success item">
                    <img src="${product.imgProduct}" height="316.3px" weight='auto' class="imgCart" />
                    <div class="card-body">
                      <h5 class="card-title titleCart">${product.nameProduct}</h5>
                      <p><span class="priceCart">${product.priceProduct}</span> <b>đ</b></p>
                      <a href="#topPage"><button type="button" onclick= "editProduct('${product.id}')" class="btn btn-outline-success btnEdit">
                        Edit
                      </button></a>
                      <button class="btn btn-outline-danger" onclick="deleteProduct('${product.id}')">Delete</button>

                    </div>
                  </div>
                </div>
                `;
  }
  document.getElementById("listProducts").innerHTML = showProducts;
}
// reset form after submit product >>>
function reset_form() {
  nameInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
  idInput.value = "";
  nameInput.focus();
}
// delete product - by ID - in Manager & Store Page & Cart >>>
function deleteProduct(id) {
  let products = getProductsFromLocalStorage();
  let cart = getCartFromLocalStorage();

  products = products.filter((p) => p.id !== id);
  cart = cart.filter((c) => c.product.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
  showProducts();
}
// edit product by ID => set information product to form >>>
function editProduct(id) {
  let products = getProductsFromLocalStorage();
  let product = products.find((p) => p.id === id);
  idInput.value = product.id;
  nameInput.value = product.nameProduct;
  imgInput.value = product.imgProduct;
  priceInput.value = product.priceProduct;
  document.getElementById("btnAdd").setAttribute("type", "button"); // delete type submit to Not Add when press Enter key
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
}
// click button - show update product by ID - in Manager & Store Page & Cart || keep quantity in Cart >>>
function updateProduct() {
  let product_obj = {
    nameProduct: nameInput.value,
    imgProduct: imgInput.value,
    priceProduct: priceInput.value,
    id: idInput.value,
  };
  let products = getProductsFromLocalStorage();
  let cart = getCartFromLocalStorage();

  products = products.filter((p) => p.id !== product_obj.id);
  for (const item of cart) {
    if (item.product.id === product_obj.id) {
      item.product = product_obj;
    }
  }
  products.push(product_obj);
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("products", JSON.stringify(products));
  showProducts();
  reset_form();
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "block";
  document.getElementById("btnAdd").setAttribute("type", "submit"); // type submit to Add when press Enter key
}

window.onload = () => {
  showProducts(); // show products to HTML in Manager Page
};
