
let productArr = [];
let newArray = [];

let prdImage;
let prdPrice;
let prdName;
/*Add items to array */
function addcart(strNo) {

    let newStrno = strNo;
    let newProduct = {

        product_name: null,
        product_price: 0,
        product_Image: null,
    };

    
    if (newStrno == 1) {
        prdImage = document.getElementById('img1').src;
        prdPrice = document.getElementById('price1').innerHTML;
        prdName = document.getElementById("title1").innerHTML;
        newProduct.product_Image = prdImage;
        newProduct.product_price = parseInt(prdPrice);
        newProduct.product_name = prdName;
        


    }
    else if (newStrno == 2) {
        prdImage = document.getElementById('img2').src;
        prdPrice = document.getElementById('price2').innerHTML;
        prdName = document.getElementById("title2").innerHTML;
        newProduct.product_Image = prdImage;
        newProduct.product_price = parseInt(prdPrice);
        newProduct.product_name = prdName;
        
    }
    else if (newStrno == 3) {
        prdImage = document.getElementById('img3').src;
        prdPrice = document.getElementById('price3').innerHTML;
        prdName = document.getElementById("title3").innerHTML;
        newProduct.product_Image = prdImage;
        newProduct.product_price = parseInt(prdPrice);
        newProduct.product_name = prdName;
        

    }
    else if (newStrno == 4) {
        prdImage = document.getElementById('img4').src;
        prdPrice = document.getElementById('price4').innerHTML;
        prdName = document.getElementById("title4").innerHTML;
        newProduct.product_Image = prdImage;
        newProduct.product_price = parseInt(prdPrice);
        newProduct.product_name = prdName;

    }
    productArr.push(newProduct);

    localStorage.setItem("Product", JSON.stringify(productArr));
    if (productArr.length > 0) {
        alert('Items added in the cart')
    }
}
let retrievedData = localStorage.getItem("Product");
let prdDetails = JSON.parse(retrievedData);
document.getElementById("tableBody").addEventListener("load", displayTable())
/*To display in the Cart-table */
function displayTable() {
    let allRows = [];


    for (let i = 0; i < prdDetails.length; i++) {

        let row = `<tr><td class="cart_product"><img class="cart_img" src="${prdDetails[i].product_Image}" alt="" /></td>
        <td class="cart_description"><h4>${prdDetails[i].product_name}</h4></td>
        <td>$<span id="prdPrice" class="prdPriceC">${prdDetails[i].product_price}</span></td>
        <td>
        <input type="number" value="1" min="1" class="cart_quantity_input" id="txtNo" onchange="changeTxt(this,${prdDetails[i].product_price});">
        </td> 
        <td class="cart_delete">
        <a class="cart_quantity_delete" onclick="deleteItem(this);"><i class="fa fa-times"></i></a>
        </td>   
        <td></td>     
        </tr>`
        allRows.push(row);

    }

    totalcart();

    document.getElementById("tableBody").innerHTML = allRows.join(' ');
}
/*Item total*/
function totalcart() {

    let count = 0;
    prdDetails.forEach(element => {

        count = count + element.product_price;
    });
    if (prdDetails.length == 0) {
        document.getElementById("CartTotal").innerHTML = '$' + 0;

    }
    else {
        document.getElementById("CartTotal").innerHTML = '$' + count;
    }


}
/*Quantity change */
function changeTxt(element, priceValue) {
    let txtValue = element.value;
    element.closest("tr").querySelector("td > .prdPriceC").innerHTML = txtValue * priceValue
    getTotalPrice();


}

function getTotalPrice() {
    var TotalValue = 0;
    let tbl = document.getElementById("PrdTable");
    for (let i = 1; tbl.rows[i]; i++) {
        TotalValue += parseInt(tbl.rows[i].querySelector("td > .prdPriceC").innerHTML);
    }
    document.getElementById("CartTotal").innerHTML = '$' + TotalValue;

}
/*Delete item in the cart */
function deleteItem(r) {
    let row = r.parentNode.parentNode.rowIndex;
    let prdRow = row - 1;
    if (prdRow > -1) {
        prdDetails.splice(prdRow, 1)
        localStorage.setItem("Product", JSON.stringify(prdDetails));
        retrievedData = localStorage.getItem("Product");
        prdDetails = JSON.parse(retrievedData);
        displayTable();

    }

}

