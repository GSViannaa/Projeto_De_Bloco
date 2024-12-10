function seEstiverVazio(chave, objeto) {

    if(!localStorage.getItem(chave)) {
      localStorage.setItem(chave, JSON.stringify(objeto))
    }
  
  }

const objetoProdutos = [
    {
    linkImg: "https://cdn.awsli.com.br/788/788969/produto/129311218/8d17f459ca.jpg", 
    nome: "Serpentarium Grande", 
    para: "Reptil", 
    preco: "450,00 "
},
{
    linkImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIyf4fQI1cYlGKqN89bKIfz9rIQqhXqQeAQ&s", 
    nome: "Aquário 500L", 
    para: "Anfíbio", 
    preco: "650,00"
},
{
    linkImg: "https://images.tcdn.com.br/img/img_prod/815630/nutropica_ferret_natural_9993_1_6ce929bd5ad248022640f64196d7d1f3.jpg", 
    nome: "Ração de Furão", 
    para: "Mamífero", 
    preco: "150,00"
},
{
    linkImg: "https://http2.mlstatic.com/D_NQ_NP_929747-MLB44033015017_112020-O.webp", 
    nome: "Luva para aves", 
    para: "Ave", 
    preco: "100,00"

}


]

    

window.addEventListener("load", function() {
    seEstiverVazio("produtos", objetoProdutos);
    criarCardsProdutos()
})

function criarCardsProdutos() {

    let arrayProdutos = JSON.parse(localStorage.getItem("produtos")) || []
    let divAreaProdutos = document.getElementById("areaProdutos");
  
    if (divAreaProdutos) {

      arrayProdutos.forEach((produto) => {

        const divCard = document.createElement("div");

        divCard.setAttribute("id", `${produto.nome}`);
        divCard.setAttribute("class", "card");
        divCard.setAttribute("data-key", `${produto.para}`);
  
        divCard.innerHTML = `

          <div class="imageCard">
            <img src="${produto.linkImg}" width="295px" height="200px"  alt="${produto.nome}" title="${produto.nome}">
          </div>
          <div class="conteudoCard">
            <h2>${produto.nome}</h2>
            <p>R$ ${produto.preco}</p>
            <p>Para: ${produto.para}</p>

            <div class="buttonCarrinho" > 
             <span class="material-symbols-outlined"  onclick="adicionarAoCarrinho(this)">
                       shopping_cart
              </span> 
          </div>

          </div>
        `;
        divAreaProdutos.prepend(divCard);
      });
    }
  }
  


  function pesquisar() {

    const digitado = document.getElementById("pesquisa").value.toLowerCase()
    const cards = document.querySelectorAll(".card")
  
    
  cards.forEach(function(card) {
      const cardId = card.id.toLocaleLowerCase()
  
      if(cardId.includes(digitado)) {
        card.style.display =""
        card.style.visibility = "visible"
      } else {
        card.style.display ="none"
        card.style.visibility = "hidden"
      }
  
  })
  }
  function filtrar() {


    const checkboxes = document.querySelectorAll(".filtroCheckbox:checked")
    const filtroSelecionado = Array.from(checkboxes).map(checkbox => checkbox.value)
  
    
    const cards = document.querySelectorAll(".card")
  
    const cardsFiltrados = Array.from(cards).filter(card => {
  
       const atributo = card.getAttribute("data-key")
       
  
       return  filtroSelecionado.some(filtro => 
        atributo == filtro
       )
    })
  
    cards.forEach(card => {
      if(cardsFiltrados.includes(card)){
        card.style.display= "block"
      } else {
        card.style.display = "none"
      }
  
    })
  
  }
  
  function filtroShow() {
    const buttonFiltro = document.getElementById("guardarFiltro")
  
    if(buttonFiltro.style.visibility == "visible") {
      buttonFiltro.style.visibility = "hidden"
    } else {
      buttonFiltro.style.visibility = "visible"
    }
  }
    
  function mandarCarrinho(item, custo) {
    class ItemCarrinho {
      constructor(item, custo, quantidade = 1) {
        this.item = item; 
        this.custo = custo; 
        this.quantidade = quantidade; 
      }
    }
  
    let carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
  
    const itemExistente = carrinhoAtual.find(produto => produto.item === item);
  
    if (itemExistente) {
     
      itemExistente.quantidade += 1;
    } else {
      
      const novoItemCarrinho = new ItemCarrinho(item, custo);
      carrinhoAtual.push(novoItemCarrinho);
    }
  
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
  }
  
  function adicionarAoCarrinho(button) {
    const card = button.closest(".card");
    const cardId = card.id;
  
    let arrayProdutos = JSON.parse(localStorage.getItem("produtos")) || [];
  
    const produtoEncontrado = arrayProdutos.find(produto => produto.nome === cardId);
  
   
      const valorDoProduto = produtoEncontrado.preco;
      const nomeProduto = produtoEncontrado.nome;
  
      mandarCarrinho(nomeProduto, valorDoProduto);
  
      alert(`O produto ${produtoEncontrado.nome} foi adicionado ao carrinho.`);
    
  }
  