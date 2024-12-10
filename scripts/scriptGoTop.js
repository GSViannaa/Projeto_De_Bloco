let goTopButton = document.getElementById("buttonGoTop")

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
  if(document.body.scrollTop > 700 ||  document.documentElement.scrollTop > 700) {
    goTopButton.style.display = "block"
  } else {
    goTopButton.style.display = "none"
  }
}

function goTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

function toggleDropdown() {
  const dropdown = document.querySelector('.dropdownConteudo');
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}