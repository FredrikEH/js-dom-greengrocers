const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      image: "assets/icons/001-beetroot.svg",
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      image: "assets/icons/002-carrot.svg",
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      image: "assets/icons/003-apple.svg",
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      image: "assets/icons/004-apricot.svg",
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      image: "assets/icons/005-avocado.svg",
      type: "vegetable"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      image: "assets/icons/006-bananas.svg",
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      image: "assets/icons/007-bell-pepper.svg",
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      image: "assets/icons/008-berry.svg",
      type: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      image: "assets/icons/009-blueberry.svg",
      type: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      image: "assets/icons/010-eggplant.svg",
      type: "vegetable"
    }
  ],
  cart: []
};

const itemListUl = document.querySelector("#item-list")
const totalListUl = document.querySelector("#total-list")
const filterSelect = document.querySelector("#filter-select")

function handleClick(item){
  let foundItem = state.cart.find(itemFind => itemFind.id === item.id)
  if(!foundItem){
    state.cart.push(item)
    item.amount = 1
  }
  else{
    foundItem.amount++
  }
  renderCart()
}

function handleClickRemove(item){
  let index = state.cart.indexOf(item);
  state.cart[index].amount--;
  if(state.cart[index].amount === 0){
    state.cart.splice(index);
  }
  renderCart();
}

function handleClickAdd(item){
  let index = state.cart.indexOf(item);
  state.cart[index].amount++;
  renderCart();
}

function createItemButton(item){
  const button = document.createElement('button')
  button.innerText = 'Add to cart'
  button.addEventListener('click', () => {handleClick(item)})
  return button
}

function filter(){
  let selected = document.getElementById('filter-select').value
  itemListUl.innerHTML = ""
  for(let i = 0; i < state.items.length; i++){
    const item = state.items[i]
    console.log(item.type + " " + selected)
    if(item.type === selected){
      console.log("test 2")
      const itemLi = document.createElement("li")
      itemLi.setAttribute("store", item.id)
      itemLi.innerText = item.name
      itemLi.innerHTML = "<img src='" + item.image + "' >"; //should be createElement()?
      itemLi.appendChild(createItemButton(item))
      itemListUl.appendChild(itemLi)
    }
  }
}

function renderItems(){
  itemListUl.innerHTML = ""
  const filterTypes = []
  for(let i = 0; i < state.items.length; i++){
    const item = state.items[i]
    const itemLi = document.createElement("li")
    itemLi.setAttribute("store", item.id)
    itemLi.innerText = item.name
    itemLi.innerHTML = "<img src='" + item.image + "' >"; //should be createElement()?
    itemLi.appendChild(createItemButton(item))
    itemListUl.appendChild(itemLi)
    if(!filterTypes.includes(item.type)){
      filterTypes.push(item.type)
    }
  }
  for(let i = 0; i < filterTypes.length; i++){
    let filterOption = document.createElement("option")
    filterOption.textContent = filterTypes[i]
    filterSelect.appendChild(filterOption)
  }
}

function renderCart(){
  totalListUl.innerHTML = "";
  let totalPrice = 0;
  for(let i = 0; i < state.cart.length; i++){
    const item = state.cart[i];
    const itemLi = document.createElement("li");
    const img = document.createElement('img');
    img.src = item.image;
    img.classList.add('cart--item-icon');
    itemLi.setAttribute("cart", item.id);
    const p = document.createElement('p');

    const buttonRemove = document.createElement('button');
    buttonRemove.innerText = '-';
    buttonRemove.addEventListener('click', () =>{handleClickRemove(item)});
    buttonRemove.classList.add('quantity-btn', 'remove-btn', 'center')

    const buttonQuantity = document.createElement('button');
    buttonQuantity.textContent = item.amount;
    buttonQuantity.classList.add('quantity-text', 'center');

    p.textContent = item.name;

    const buttonAdd = document.createElement('button');
    buttonAdd.innerText = '+';
    buttonAdd.addEventListener('click', () =>{handleClickAdd(item)});
    buttonAdd.classList.add('quantity-btn', 'add-btn', 'center');
    itemLi.appendChild(img);
    itemLi.appendChild(p);
    itemLi.appendChild(buttonRemove);
    itemLi.appendChild(buttonQuantity);
    itemLi.appendChild(buttonAdd);
    totalListUl.appendChild(itemLi);
    totalPrice += item.price * item.amount;
  }
  document.querySelector("#total-number-id").innerText = "£" + totalPrice.toFixed(2);
}

function main(){
  renderItems();
}

main()