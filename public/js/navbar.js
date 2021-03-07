const navButton = document.getElementById('navButton')

function checkNavbar() {
    navButton.classList.add('fa-sort-down')
    navButton.classList.remove('fa-sort-up')
    document.getElementById('nav').classList.add('flex-row')
    document.getElementById('nav').classList.remove('flex-col')
    document.getElementById('nav').classList.add('items-center')
    document.getElementById('nav-content').classList.remove('flex-col')
    document.getElementById('nav-content').classList.add('flex-row')
    document.getElementById('nav-content').classList.add('items-center')
    document.getElementById('product').style.width = "25%"
    document.getElementById('product').classList.remove('my-1')
    document.getElementById('productButton').classList.add('mx-1')
    document.getElementById('productButton').classList.remove('my-1')
    document.getElementById('allProducts').classList.add('px-1')
    document.getElementById('allProducts').classList.remove('my-1')
    document.getElementById('login').classList.add('px-1')
    document.getElementById('login').classList.remove('my-1')
    document.getElementById('signup').classList.add('px-1')
    document.getElementById('signup').classList.remove('my-1')

    if (screen.width > 767) {
        document.getElementById('product').classList.add('display-block')
        document.getElementById('product').classList.remove('display-none')
        document.getElementById('productButton').classList.add('display-block')
        document.getElementById('productButton').classList.remove('display-none')
        document.getElementById('allProducts').classList.add('display-block')
        document.getElementById('allProducts').classList.remove('display-none')
        document.getElementById('login').classList.add('display-block')
        document.getElementById('login').classList.remove('display-none')
        document.getElementById('signup').classList.add('display-block')
        document.getElementById('signup').classList.remove('display-none')
        document.getElementById('navButton').classList.add('display-none')
        document.getElementById('navButton').classList.remove('display-block')
    }
    else {
        document.getElementById('product').classList.add('display-none')
        document.getElementById('product').classList.remove('display-block')
        document.getElementById('productButton').classList.add('display-none')
        document.getElementById('productButton').classList.remove('display-block')
        document.getElementById('allProducts').classList.add('display-none')
        document.getElementById('allProducts').classList.remove('display-block')
        document.getElementById('login').classList.add('display-none')
        document.getElementById('login').classList.remove('display-block')
        document.getElementById('signup').classList.add('display-none')
        document.getElementById('signup').classList.remove('display-block')
        document.getElementById('navButton').classList.add('display-block')
        document.getElementById('navButton').classList.remove('display-none')
    }
}

window.addEventListener('load', checkNavbar)
window.addEventListener('resize', checkNavbar)

navButton.addEventListener('click', () => {
    navButton.classList.toggle('fa-sort-up')
    navButton.classList.toggle('fa-sort-down')
    document.getElementById('nav').classList.toggle('flex-col')
    document.getElementById('nav').classList.toggle('items-center')
    document.getElementById('nav-content').classList.toggle('flex-col')
    document.getElementById('nav-content').classList.toggle('flex-row')
    document.getElementById('nav-content').classList.toggle('items-center')

    document.getElementById('product').style.width = "100%"
    document.getElementById('product').classList.toggle('display-block')
    document.getElementById('product').classList.toggle('display-none')
    document.getElementById('product').classList.toggle('my-1')

    document.getElementById('productButton').classList.toggle('display-block')
    document.getElementById('productButton').classList.toggle('display-none')
    document.getElementById('productButton').classList.toggle('mx-1')
    document.getElementById('productButton').classList.toggle('my-1')

    document.getElementById('allProducts').classList.toggle('display-block')
    document.getElementById('allProducts').classList.toggle('display-none')
    document.getElementById('allProducts').classList.toggle('my-1')
    document.getElementById('allProducts').classList.toggle('px-1')

    document.getElementById('login').classList.toggle('display-block')
    document.getElementById('login').classList.toggle('display-none')
    document.getElementById('login').classList.toggle('my-1')
    document.getElementById('login').classList.toggle('px-1')

    document.getElementById('signup').classList.toggle('display-block')
    document.getElementById('signup').classList.toggle('display-none')
    document.getElementById('signup').classList.toggle('my-1')
    document.getElementById('signup').classList.toggle('px-1')
})