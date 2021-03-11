const addToCart = document.getElementById('addToCart')
const removeFromCart = document.getElementById('removeFromCart')
const gameTitle = document.getElementById('gameTitle').innerText

addToCart.addEventListener('click', () => {
    alert(`${gameTitle} Added to Cart!`)
})

removeFromCart.addEventListener('click', () => {
    alert(`${gameTitle} Removed from Cart!`)
})