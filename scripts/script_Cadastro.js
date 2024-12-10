const background = document.querySelector("#bg")
const divLogin = document.getElementById("paraLogin")
const divCadastro = document.getElementById("paraCadastro")
const buttonLogar = document.querySelector("#buttonLogar")
const dropdownMenu = document.querySelector("#dropdownMenu")
const dropdownConteudo = document.getElementsByClassName("dropdownConteudo")
const alertas = document.querySelectorAll(".textoAlerta")


/////////////////////////// ~~~~~~~~~~  functions visuais da tela de login/cadastro ~~~~~~~~ ////////////////////////////////////////


//Fiz essa função só para mostrar a aba de login/cadastro
function loginShow() {
  
    if( background.style.visibility == "hidden") {

        background.style.visibility = "visible"
        background.style.opacity = ".6"

        divLogin.style.visibility = "visible"

    }
     else{
        background.style.visibility = "hidden"
        divLogin.style.visibility = "hidden"
        divCadastro.style.visibility = "hidden"

        
          
    alertas.forEach(alerta => {
      alerta.style.visibility = "hidden"; 

  });

    }

} 

//Essa função ´esconde´ a tela de login e mostra a de cadastro
function cadastro() {
    divCadastro.style.visibility = "visible"
    divLogin.style.visibility = "hidden"
} 


/////////////////////////// ~~~~~~~~~~ functions login e cadastro ~~~~~~~~ ////////////////////////////////////////

//essa foi a última função que eu fiz nessa parte de login/cadstro até agora dia 11/10 preciso dela por usar multiplas páginas. Sobre a função ela recupera logado do localStorage e checa se é true
//Dia 26 hoje, praticamente mudei tudo agora Salvo os dados de LOgin/cadastro no SessionStorege 

function checarStatus() {
  const logado = sessionStorage.getItem("logado");
  
  if (logado) {
    buttonLogar.style.visibility = "hidden";
    dropdownMenu.style.display = "flex";
  
    checarAdmin()
  }
  
}
window.addEventListener("load", checarStatus)   //chamo a função no carregar da pagina

//Aqui eu salvo os dados de cadastro num array de objetos e salvco o array no localStorage
function salvarLocalStorage() { 

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const admin = document.getElementById("admin").checked

    

    if(nome.length < 4 || !email.includes("@") || senha.length < 4 ) {

      alertas.forEach(alerta => {
        alerta.style.visibility = "visible"; 

    });

      return
    }
     
  let arrayUsers = JSON.parse(localStorage.getItem("contas")) || []
   
    class novoUsuario {
      
      constructor(nome, email, senha, admin) {
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.admin = admin

      }
    };

     const userNovo = new novoUsuario(nome, email, senha, admin)
    arrayUsers.push(userNovo)

    localStorage.setItem("contas", JSON.stringify(arrayUsers)) //stringfy para transfornar o objeto em texto, depois transformo em objeto com o "parde"
    sessionStorage.setItem("logado", true);

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("admin").checked = false;


    alert("Cadastro feito com sucesso!")
    
   
    background.style.visibility = "hidden"
    divLogin.style.visibility = "hidden"
    divCadastro.style.visibility = "hidden"
    buttonLogar.style.visibility = "hidden"
    dropdownMenu.style.visibility = "visible"

    
    alertas.forEach(alerta => {
      alerta.style.visibility = "hidden"; 

  });
    
    

    checarStatus()
    
}

//Uso uma arrow function para chegar se os dados no inputs na janela de login ja existem no LocalStorage e se são iguais
function login() {
    const email = document.getElementById("emailLogin").value
    const senha = document.getElementById("senhaLogin").value
    
    let arrayUsers = JSON.parse(localStorage.getItem("contas")) || []

    const usuarioExistente = arrayUsers.some(user => user.senha === senha && user.email === email); //usei o "some" aqui por que retorna um valor booleano
    

    if(usuarioExistente) {
        const nomeUser = arrayUsers.find(user => user.nome && user.senha === senha && user.email === email) // já aqui com o "find" eu recupero texto
        alert(`Bem-vindo de volta ${nomeUser.nome}`)


       sessionStorage.setItem("logado", true);
       sessionStorage.setItem("email", email);
       sessionStorage.setItem("senha", senha);

        background.style.visibility = "hidden"
        divLogin.style.visibility = "hidden"
        divCadastro.style.visibility = "hidden"
        buttonLogar.style.visibility = "hidden"
        dropdownMenu.style.visibility = "visible" 

      

    }
    else {
        alert("Conta não encontrada")
    }
    
    document.getElementById("emailLogin").value = "";
    document.getElementById("senhaLogin").value = "";

  
    checarStatus()
   
}

  
//Essa aqui checa se o usuario é administrador 
function checarAdmin() {
    const adminItem = document.getElementById("adminItem")
    const dropdownConteudo = document.querySelector(".dropdownConteudo")
 
    const email = sessionStorage.getItem("email");
    const senha = sessionStorage.getItem("senha");  

    let arrayUsers =  JSON.parse(localStorage.getItem("contas")) || []

    const usuarioAdmin = arrayUsers.find(user => user.email === email && user.senha === senha && user.admin === true);
    
    if(usuarioAdmin) {
      sessionStorage.setItem("Admin", true)
    } else {
      sessionStorage.setItem("Admin", false)

    }

    if(sessionStorage.getItem("Admin") == "false") {
      
      sessionStorage.removeItem("Admin");
      adminItem.style.display = "none"
      dropdownConteudo.style.height = "140px"
      dropdownConteudo.style.marginTop = "220px"
        
    }


}
//Fiz essa aqui somente para fazer o log Out 
function logOut () {

    dropdownMenu.style.display = "none";
     buttonLogar.style.visibility = "visible"
     sessionStorage.removeItem("logado");
     sessionStorage.removeItem("Admin"); 

     localStorage.removeItem("carrinho")
  
}


