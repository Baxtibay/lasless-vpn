const elHeader = document.querySelector('.site-header')
const navToggler = document.querySelector('.site-header__toggle-button')
const navTogglerIcon = document.querySelector('.toggle-button__icon')
const mainContent = document.querySelector('.main-content')
const nav = document.querySelector('.site-header__sitenav')
const elBody = document.body

if (navToggler) {
  navToggler.addEventListener('click', () => {
    elHeader.classList.toggle('site-header--open')
    elBody.classList.toggle('menu-open')

    const isOpen = elHeader.classList.contains('site-header--open')

    if (isOpen) {
      navTogglerIcon.classList.replace('fa-bars', 'fa-xmark')
    } else {
      navTogglerIcon.classList.replace('fa-xmark', 'fa-bars')
    }
  })
}


function closeMenu() {
  elHeader.classList.remove('site-header--open')
  elBody.classList.remove('menu-open')
  navTogglerIcon.classList.replace('fa-xmark', 'fa-bars')
}


document.addEventListener('click', (e) => {
  if (!elHeader.classList.contains('site-header--open')) return

  const isClickInsideNav = nav.contains(e.target)
  const isClickOnToggler = navToggler.contains(e.target)

  if (!isClickInsideNav && !isClickOnToggler) {
    closeMenu()
  }
})