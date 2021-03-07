const addToCart = document.getElementById('addToCart')
const gameTitle = document.getElementById('gameTitle').innerText

addToCart.addEventListener('click', () => {
    alert(`${gameTitle} Added to Cart!`)
})