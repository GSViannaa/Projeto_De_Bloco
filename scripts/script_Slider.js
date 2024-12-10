/////////////////////////// ~~~~~~~~~~ slider functions ~~~~~~~~ ////////////////////////////////////////


const grupoDivsImgSlider = document.querySelectorAll(".imgScrollAnimals");
const grupoDivTextoSlider = document.querySelectorAll(".animaisDescricaoTexto")
const buttonPrev = document.getElementById("prev");
const buttonNext = document.getElementById("next");

let currentIndex = 0;

function updateSlider() {
  grupoDivsImgSlider.forEach((div, index) => {
    div.style.display = index === currentIndex ? "block" : "none";
    
  });
  grupoDivTextoSlider.forEach((div, index) => {
    div.style.display = index === currentIndex ? "block" : "none";
    
  });
}

function goToNext() {
  currentIndex = (currentIndex + 1) % grupoDivsImgSlider.length;
  updateSlider();
}

function goToPrev() {
  currentIndex = (currentIndex - 1 + grupoDivsImgSlider.length) % grupoDivsImgSlider.length;
  updateSlider();
}

buttonNext.addEventListener("click", goToNext);
buttonPrev.addEventListener("click", goToPrev);

updateSlider();

//////////////////////////////////// Toggle dropdown menu ///////////////////////////

function toggleDropdown() {
  const dropdown = document.querySelector('.dropdownConteudo');
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}


//////////////////////////////////// function cards dos produtos //////////////////////////
 

document.addEventListener("DOMContentLoaded", () => {
  
  const principalImage = document.querySelector(".divPrincipal .produtoShow");
  const principalTitle = document.querySelector(".divPrincipal h2");
  const principalArticle = document.querySelector(".divPrincipal .produtoDescricao");

  principalArticle.style.display  = "flex"; 

  const produtosDivs = document.querySelectorAll("#subgrid .divsProdutos");

  produtosDivs.forEach((produto) => {
    produto.addEventListener("click", () => {
     
      const miniImage = produto.querySelector(".miniProdutoShow");
      const miniTitle = produto.querySelector("h2");
      const miniDescricao = produto.querySelector(".produtoDescricao");

      if (!miniImage || !miniTitle || !miniDescricao) {
        console.error("Erro: Elementos dentro do produto clicado não encontrados!");
        return;
      }

     
      const mainImage = principalImage.style.backgroundImage;
      const mainTitle = principalTitle.textContent;
      const mainDescricao = principalArticle.innerHTML;

      
      principalArticle.style.display = "none"; 
      miniDescricao.style.display = "flex"; 

      
      principalImage.style.backgroundImage = miniImage.style.backgroundImage;
      principalTitle.textContent = miniTitle.textContent;
      principalArticle.innerHTML = miniDescricao.innerHTML;

    
      miniImage.style.backgroundImage = mainImage;
      miniTitle.textContent = mainTitle;
      miniDescricao.innerHTML = mainDescricao;

     
      miniDescricao.style.display = "none";
      principalArticle.style.display = "flex"; 
    });
  });
});


