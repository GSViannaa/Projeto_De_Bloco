function seEstiverVazio(chave, objeto) {

  if(!localStorage.getItem(chave)) {
    localStorage.setItem(chave, JSON.stringify(objeto))
  }

}

const obejtoAnimais = [
  {
    linkImg:"https://www.zooplus.pt/magazine/wp-content/uploads/2020/05/gecko-leopardo-na-pedra.jpeg",
    especie: "Lagarto Gecko", 
    valor: "1200,00",
    tipo: "Reptil"
  },
  {
    linkImg: "https://www.petz.com.br/blog/wp-content/uploads/2024/09/ferret_1.jpg",
    especie: "Furão",
    valor: "800,00",
    tipo: "Mamífero"
  },
  {
    linkImg: "https://media01.stockfood.com/largepreviews/MjE4MjU1MDY2MA==/70404860-Great-horned-owl-Bubo-virginianus-Alaska-Wildlife-Foundation-Ketchikan-Alaska-USA.jpg",
    especie: "Corujão-da-Virgínia",
    valor: "2000,00",
    tipo: "Ave"
  }, 
  {
    linkImg:"https://www.reservaromanetto.com.br/images/tartarugas/21.jpg" ,
    especie: "Ttigre d’água",
    valor:"700,00" ,
    tipo: "Anfíbio"
  }
]

window.addEventListener("load", function() {
  seEstiverVazio("animais", obejtoAnimais);
  criarCardsAnimais()
})




function criarCardsAnimais() {
  let arrayAnimais = JSON.parse(localStorage.getItem("animais")) 
  let divAreaAnimais = document.getElementById("areaAnimais");

  if (divAreaAnimais) {
    arrayAnimais.forEach(animal => {
      const divCard = document.createElement("div");
      divCard.setAttribute("id", `${animal.especie}`);
      divCard.setAttribute("class", "card");
      divCard.setAttribute("data-key", `${animal.tipo}`);

      divCard.innerHTML = `
        <div class="imageCard">
          <img src="${animal.linkImg}" width="296px" height="200px"  alt="${animal.especie}" title="${animal.especie}">
        </div>
        <div class="conteudoCard">
          <h2>${animal.especie}</h2>
          <p>R$ ${animal.valor}</p>
          <p>Classe: ${animal.tipo}</p>
          <div class="buttonCarrinho" > 
             <span class="material-symbols-outlined"  onclick="adicionarAoCarrinho(this)">
                       shopping_cart
              </span> 
          </div>
  
          </div>
        </div>
      `;
      divAreaAnimais.prepend(divCard);
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


function mandarCarrinho(item,custo)  {
 
  class ItemCarrinho {
    constructor(item,custo,quantidade = 1) 
    {
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

  let arrayAnimais = JSON.parse(localStorage.getItem("animais")) || [];

  const animalEncontrado = arrayAnimais.find(animal => animal.especie === cardId);

  const especieAnimal = animalEncontrado.especie

  const logado = sessionStorage.getItem("logado"); 

  if(!logado) {
    alert("Faça login antes")

    return

  }


  
    const valorDoAnimal = animalEncontrado.valor;
    mandarCarrinho(especieAnimal, valorDoAnimal);
  
    alert(`O animal ${animalEncontrado.especie} foi adicionado ao carrinho.`);
  
}


