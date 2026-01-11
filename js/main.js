const elHeader = document.querySelector('.site-header')
const navToggler = document.querySelector('.site-header__toggle-button')
const navTogglerIcon = document.querySelector('.toggle-button__icon')



if(navToggler) {
  navToggler.addEventListener('click', () => {
    elHeader.classList.toggle('site-header--open')
    
    if(elHeader.classList.contains('site-header--open')) {
      navTogglerIcon.classList.remove('fa-bars')
      navTogglerIcon.classList.add('fa-xmark')
    } else {
      navTogglerIcon.classList.remove('fa-xmark')
      navTogglerIcon.classList.add('fa-bars')
    }
  })
}
