//Essa primeira parte serve para fazer o cadstro dos animias

    const linkImg = document.getElementById("linkAnimal")
    const especie = document.getElementById("especie")
    const valor = document.getElementById("valor")
   

    linkImg.value = "https://www.petz.com.br/blog/wp-content/uploads/2018/11/como-criar-uma-iguana.jpg"
    especie.value = "Iguana"
    valor.value = 1200.00


    
    const linkImgProdutos = document.getElementById("linkProduto")
    const preco = document.getElementById("preco")
    const nome = document.getElementById("nome")

    linkImgProdutos.value = "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRd4qrFTd1roJcvFctC4tOz4JCDHfMhaCCrNMk87TvIywnLqeXYqwtIt7bS0fqkbBc7o4VDkni04ipR01YkX615GZjD8sNbnLzrK-xfdLVGFCuZqwVvJTsS&usqp=CAE"
    preco.value = 90
    nome.value = "Aquecedor para Repteis"


function cadastrarNovoAnimal(){
    const linkImg = document.getElementById("linkAnimal").value
    const especie = document.getElementById("especie").value
    const valor = document.getElementById("valor").value
    const tipo = document.getElementById("tipo").value
    const AnimaisSalvos = localStorage.getItem("animais")

    let arrayAnimais = AnimaisSalvos!== null && AnimaisSalvos !== ""? JSON.parse(AnimaisSalvos) : []

    class animal {

        constructor(especie,valor,tipo,linkImg) {
            this.especie = especie
            this.valor = valor
            this.tipo = tipo
            this.linkImg = linkImg
        }

    }
    
    const novoAnimal = new animal(especie, valor, tipo, linkImg)
    arrayAnimais.push(novoAnimal)

    localStorage.setItem("animais", JSON.stringify(arrayAnimais))


}

//E essa para cadastro de produtos

// let arrayProdutos = JSON.parse(localStorage.getItem("produtos")) || []

function cadastrarNovoProduto() {

    let arrayProdutos = JSON.parse(localStorage.getItem("produtos"))

    const linkImg = document.getElementById("linkProduto").value
    const para = document.getElementById("paraOTipo").value
    const preco = document.getElementById("preco").value
    const nome = document.getElementById("nome").value

    class produto {

        constructor(para,preco,nome, linkImg) {

            this.linkImg = linkImg
            this.para = para
            this.preco = preco
            this.nome = nome
        }

    }
    
    const novoProduto = new produto(para, preco, nome, linkImg)
    arrayProdutos.push(novoProduto)

    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))

}

/////////////////////////////////////// Tabelas e exclusão do LocalStorage /////////////////////////

function gerarTabelas(arrayRecebida, idParaTabelas) {

    if (!arrayRecebida || arrayRecebida.length === 0) {
        document.getElementById(idParaTabelas).innerHTML = "<p>Nenhum dado disponível.</p>";
        return;
    }

    let table = "<table>";

    table += "<tr>";
    let headers = Object.keys(arrayRecebida[0]); 
    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });

    table += "<th>Excluir</th>";
    table += "</tr>";

    arrayRecebida.forEach((elemento, index) => {
        table += "<tr>";
        headers.forEach(header => {
            table += `<td>${elemento[header]}</td>`;
        });
        table += `<td><button onclick="excluirLinha(${index}, '${idParaTabelas}')">Excluir</button></td>`;
        table += "</tr>";
    });

    table += "</table>";

  
    document.getElementById(idParaTabelas).innerHTML = table;
}

function excluirLinha(index, idParaTabelas) {
    
    const tipo = idParaTabelas === "paraTabelasAnimais" ? "animais" : "produtos";

    let arrayRecebida = JSON.parse(localStorage.getItem(tipo)) 
    arrayRecebida.splice(index, 1);

    
    localStorage.setItem(tipo, JSON.stringify(arrayRecebida));


    gerarTabelas(arrayRecebida, idParaTabelas);
}

function gerarTabelasAnimais() {
    const arrayAnimais = JSON.parse(localStorage.getItem("animais")) 

    const boxTransition = document.querySelectorAll(".box")

    const paraTabelas = document.getElementById("paraTabelasAnimais");
    const boxs = document.getElementById("accordion"); 

    gerarTabelas(arrayAnimais, "paraTabelasAnimais");

    paraTabelas.style.display = "flex";
    boxs.style.visibility = "hidden";
    
    boxTransition.forEach((box) => {
        box.style.transitionDuration = "0s";
    });

}

function gerarTabelasProdutos() {
    const arrayProdutos = JSON.parse(localStorage.getItem("produtos")) 

    const paraTabelas = document.getElementById("paraTabelasProdutos");
    const boxs = document.getElementById("accordion");

    const boxTransition = document.querySelectorAll(".box")

    gerarTabelas(arrayProdutos, "paraTabelasProdutos");

    paraTabelas.style.display = "flex";
    boxs.style.visibility = "hidden";

    boxTransition.forEach((box) => {
        box.style.transitionDuration = "0s";
    });  


}

