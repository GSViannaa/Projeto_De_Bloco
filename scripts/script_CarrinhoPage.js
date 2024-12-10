function comprar() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const listaProdutos = document.getElementById("lista");
  const listaQuantidade = document.getElementById("listaQuantidade");

  listaProdutos.innerHTML = "";
  listaQuantidade.innerHTML = "";

  carrinho.forEach((item, index) => {
  
    let li = document.createElement("li");
    let divQuantidade = document.createElement("div"); 

    let aumentarQuantidade = document.createElement("button");
    aumentarQuantidade.textContent = "+";
    aumentarQuantidade.onclick = () => alterarQuantidade(index, 1);

    let diminuirQuantidade = document.createElement("button");
    diminuirQuantidade.textContent = "-";
    diminuirQuantidade.onclick = () => alterarQuantidade(index, -1);

   
    let quantidadeDisplay = document.createElement("span");
    quantidadeDisplay.textContent = `${item.quantidade}`;

 
    divQuantidade.appendChild(diminuirQuantidade);
    divQuantidade.appendChild(quantidadeDisplay);
    divQuantidade.appendChild(aumentarQuantidade);

    li.textContent = `${item.item}`;

 
    listaQuantidade.appendChild(divQuantidade);
    listaProdutos.appendChild(li);
  });
}

function alterarQuantidade(index, delta) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

 
  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }


  localStorage.setItem("carrinho", JSON.stringify(carrinho));

 
  comprar();
  valorCompra()
}

function valorCompra() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const listaPrecoUni = document.getElementById("listaPrecoUni")
  const listaVezesQuanti = document.getElementById("listaVezesQuanti")

  const PrecoFinal = document.getElementById("PrecoFinal")

  listaPrecoUni.innerHTML = ""
  listaVezesQuanti.innerHTML = "" 

  carrinho.forEach((item) => {
    let liUnidade = document.createElement("li");
    let liQuantidade = document.createElement("li");

    liUnidade.textContent = `${item.custo}` 
    liQuantidade.textContent = `X ${item.quantidade}` 

    listaPrecoUni.appendChild(liUnidade)
    listaVezesQuanti.appendChild(liQuantidade)


  })


  let valorTotal = carrinho.reduce((total, item) => {

    let custoNumerico = parseFloat(item.custo)
    let quantidade = item.quantidade

    return total + (custoNumerico  * quantidade)
  }, 0)

  
  PrecoFinal.textContent = `R$${valorTotal}`

  } 

  function finalizarCompar() {
 let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if(carrinho.length > 0) {
    alert("Compra realizada com sucesso!")
  }  else {
    alert("Carrinho vazio")
  }

  localStorage.removeItem("carrinho")
  comprar();
  valorCompra()

  }
window.addEventListener("load", valorCompra)

window.addEventListener("load", comprar)