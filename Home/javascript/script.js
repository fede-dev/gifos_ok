const temaPlegado = document.querySelector("#tema-plegado")
const temaDesplegado = document.querySelector("#tema-desplegado")
const links = document.getElementsByTagName("link")
const linkHojaDeEstilo = links[1]
const botonSailorDay = document.querySelector(".btn1")
const botonSailorNight = document.querySelector(".btn2")
const lupa = document.querySelector(".lupa")
const logo = document.querySelector("#logo")
const misGuifos = document.getElementById("misGuifos")
const seccionVersatil = document.querySelector(".seccionVersatil")
const contenedorOculto = document.querySelector(".contenedorOculto")
const botonDeBusqueda = document.getElementById("boton-buscar")
const apiKey = "3PqjM0kBBqbijCa6msdqlkcKRXgNp6CC"
const tendencias = document.querySelector(".tendencias")
const antesDeBuscar = document.querySelector(".antesDeBuscar")
const despuesDeBuscar = document.querySelector(".despuesDeBuscar")
const itemSuge2 = document.createElement("div")
const contenedorSugerencias = document.querySelector(".sugerencias")
const tresResultadosFocus = document.getElementById("tresResultadosFocus")
const tituloResultado = document.getElementById("tituloResultado")
var inputDeBusqueda = document.getElementById("busquedaUsuario")
var arrayIdsLs = localStorage.getItem("arrayDeGifsUp")
var arrayDeIdGif = JSON.parse(arrayIdsLs)
itemSuge2.setAttribute("class", "item-sugerencias")
itemSuge2.setAttribute("class", "itm-suge2")
switch (localStorage.getItem("tema")) {
    case "tema-oscuro":
        linkHojaDeEstilo.setAttribute("href", "Home/styles/style-night.css")
        logo.removeAttribute("src", "Home/assets/gifOF_logo.png")
        logo.setAttribute("src", "Home/assets/gifOF_logo_dark.png")
        lupa.removeAttribute("src", "Home/assets/lupa_inactive.svg")
        lupa.setAttribute("src", "Home/assets/Combined Shape.svg")
        break;
    case "tema-claro":
        linkHojaDeEstilo.setAttribute("href", "Home/styles/style.css")
        logo.removeAttribute("src", "Home/assets/gifOF_logo_dark.png")
        logo.setAttribute("src", "Home/assets/gifOF_logo.png")
        lupa.removeAttribute("src", "Home/assets/Combined Shape.svg")
        lupa.setAttribute("src", "Home/assets/lupa_inactive.svg")
        break;
}
temaPlegado.addEventListener("click", () => {
    if (temaDesplegado.classList.contains("tema-desplegado-none")) {
        temaDesplegado.classList.replace("tema-desplegado-none", "tema-desplegado")
    } else { temaDesplegado.classList.replace("tema-desplegado", "tema-desplegado-none") }
})
botonSailorNight.addEventListener("click", () => {
    if (linkHojaDeEstilo.getAttribute("href", "Home/styles/style.css")) {
        temaDesplegado.classList.replace("tema-desplegado", "tema-desplegado-none")
        linkHojaDeEstilo.setAttribute("href", "Home/styles/style-night.css")
        logo.removeAttribute("src", "Home/assets/gifOF_logo.png")
        logo.setAttribute("src", "Home/assets/gifOF_logo_dark.png")
        lupa.removeAttribute("src", "Home/assets/lupa_inactive.svg")
        lupa.setAttribute("src", "Home/assets/Combined Shape.svg")
    }
    localStorage.setItem("tema", "tema-oscuro")
})
botonSailorDay.addEventListener("click", () => {
    if (linkHojaDeEstilo.getAttribute("href", "Home/styles/style-night.css")) {
        temaDesplegado.classList.replace("tema-desplegado", "tema-desplegado-none")
        linkHojaDeEstilo.setAttribute("href", "Home/styles/style.css")
        logo.removeAttribute("src", "Home/assets/gifOF_logo_dark.png")
        logo.setAttribute("src", "Home/assets/gifOF_logo.png")
        lupa.removeAttribute("src", "Home/assets/Combined Shape.svg")
        lupa.setAttribute("src", "Home/assets/lupa_inactive.svg")
    }
    localStorage.setItem("tema", "tema-claro")
})
async function getGifUp() {
    try {
        let idsString = ""
        arrayDeIdGif.forEach(item => idsString += item + ",");
        let responseGifUp = await fetch("https://api.giphy.com/v1/gifs?api_key=" + apiKey + "&ids=" + arrayDeIdGif)
        let gIfUp = await responseGifUp.json()
        let hdrMisGuifos = document.createElement("div")
        hdrMisGuifos.setAttribute("class", "hdr-misguifos")
        hdrMisGuifos.innerHTML = "Mis Guifos"
        let contenedorDeMisGuifs = document.createElement("div")
        contenedorDeMisGuifs.setAttribute("class", "contenedorDeMisGuifs")
        seccionVersatil.appendChild(hdrMisGuifos)
        seccionVersatil.appendChild(contenedorDeMisGuifs)
        hdrMisGuifos.style.display = "none"
        contenedorDeMisGuifs.style.display = "none"
        if (arrayDeIdGif !== null) {
            for (let i = 0; i < gIfUp.data.length; i++) {
                contenedorDeMisGuifs.innerHTML += `<img type="gif" src="${gIfUp.data[i].images.original.url}" class="itemMisGuifs" alt="no veo mi gif"></img>`
            }
        }
        misGuifos.addEventListener("click", () => {
            if (contenedorOculto.style.display !== "none") {
                contenedorOculto.style.display = "none"
                hdrMisGuifos.style.display = "block"
                contenedorDeMisGuifs.style.display = "block"
            }
        })
    } catch (error) {
        console.log(error)
    }
} getGifUp()
botonDeBusqueda.addEventListener("mousedown", () => {
    botonDeBusqueda.style.background = "#d457c8"
    if (linkHojaDeEstilo.getAttribute("href", "Home/styles/style.css")) {
        lupa.setAttribute("src", "Home/assets/lupa.svg")
        botonDeBusqueda.style.color = "#110038"
    }
})
botonDeBusqueda.addEventListener("mouseup", () => {
    botonDeBusqueda.style.background = "#E6E6E6"
    if (linkHojaDeEstilo.getAttribute("href", "Home/styles/style.css")) {
        lupa.setAttribute("src", "Home/assets/lupa_inactive.svg")
        botonDeBusqueda.style.color = "#B4B4B4"
    }
})
function estilosDelFocus(botonDeBusqueda) {
    botonDeBusqueda.style.background = "#F7C9F3"
    botonDeBusqueda.style.border = "1px solid #110038"
    botonDeBusqueda.style.boxShadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF"
    botonDeBusqueda.style.fontFamily = "ChakraPetch-Regular"
    botonDeBusqueda.style.fontSize = "16px"
    botonDeBusqueda.style.color = "#110038"
    botonDeBusqueda.style.letterSpacing = "0"
    botonDeBusqueda.style.lineHeight = "18px"
    lupa.removeAttribute("src", "Home/assets/lupa_inactive.svg")
    lupa.setAttribute("src", "Home/assets/lupa.svg")
}
inputDeBusqueda.addEventListener("input", (valorInput) => {
    if (inputDeBusqueda.value !== "") {
        valorInput;
        estilosDelFocus(botonDeBusqueda)
        autoCompletar(valorInput)
    }
    if (inputDeBusqueda.value == "") {
        tresResultadosFocus.classList.replace("tresResultadosFocus", "tresResultadosFocusNone")
        tresResultadosFocus.innerHTML = ``
    }
    if (linkHojaDeEstilo.getAttribute("href") === "Home/styles/style-night.css") {
        lupa.setAttribute("src", "Home/assets/lupa_light.svg")
        botonDeBusqueda.style.color = "#FFFFFF"
        botonDeBusqueda.style.background = "#EE3EFE"
        botonDeBusqueda.style.border = "1px solid #110038"
        botonDeBusqueda.style.boxShadow = "inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF"
    }
})
async function autoCompletar() {
    let response = await fetch("https://api.giphy.com/v1/tags/related/" + inputDeBusqueda.value + "?api_key=" + apiKey)
    let autoComplete = await response.json()
    if (tresResultadosFocus.classList.contains("tresResultadosFocusNone")) {
        tresResultadosFocus.classList.replace("tresResultadosFocusNone", "tresResultadosFocus")
        for (let i = 0; i < 3; i++) {
            const element = autoComplete.data[i];
            tresResultadosFocus.innerHTML += `<div class="itemResultado"> <p class="itemResultadoText">${autoComplete.data[i].name} </p> </div>`
        }
        let sugerenciaDeBusqueda = document.getElementsByClassName("itemResultado")
        let arrayItemRespuesta = document.getElementsByClassName("itemResultadoText")
        for (let i = 0; i < arrayItemRespuesta.length; i++) {
            const element = arrayItemRespuesta[i];
            let textoRespuesta = element.innerHTML
            for (let j = 0; j < sugerenciaDeBusqueda.length; j++) {
                const elementDiv = sugerenciaDeBusqueda[j];
                elementDiv.addEventListener("click", () => {
                    cargarBusqueda(textoRespuesta)
                    if (tresResultadosFocus.classList.contains("tresResultadosFocus")) {
                        tresResultadosFocus.classList.replace("tresResultadosFocus", "tresResultadosFocusNone")
                        tresResultadosFocus.innerHTML = ``
                    }
                    if (linkHojaDeEstilo.getAttribute("href") === "Home/styles/style-night.css") {
                        botonDeBusqueda.style.background = "#B4B4B4"
                        botonDeBusqueda.style.border = "1px solid #808080"
                        botonDeBusqueda.style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF"
                        botonDeBusqueda.style.fontFamily = "ChakraPetch-Regular"
                        botonDeBusqueda.style.fontSize = "16px"
                        botonDeBusqueda.style.color = "#8F8F8F"
                        botonDeBusqueda.style.letterSpacing = "0"
                        botonDeBusqueda.style.lineHeight = "18px"
                        lupa.setAttribute("src", "Home/assets/Combined Shape.svg")
                    }
                })
            }
        }
    }
}
botonDeBusqueda.addEventListener("click", () => {
    var valorInput = inputDeBusqueda.value;
    cargarBusqueda(valorInput)
    if (tresResultadosFocus.classList.contains("tresResultadosFocus")) {
        tresResultadosFocus.classList.replace("tresResultadosFocus", "tresResultadosFocusNone")
        tresResultadosFocus.innerHTML = ``
    }
    if (linkHojaDeEstilo.getAttribute("href") === "Home/styles/style-night.css") {
        botonDeBusqueda.style.background = "#B4B4B4"
        botonDeBusqueda.style.border = "1px solid #808080"
        botonDeBusqueda.style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF"
        botonDeBusqueda.style.fontFamily = "ChakraPetch-Regular"
        botonDeBusqueda.style.fontSize = "16px"
        botonDeBusqueda.style.color = "#8F8F8F"
        botonDeBusqueda.style.letterSpacing = "0"
        botonDeBusqueda.style.lineHeight = "18px"
        lupa.setAttribute("src", "Home/assets/Combined Shape.svg")
    }
})
botonDeBusqueda.addEventListener("mousedown", () => {
    if (linkHojaDeEstilo.getAttribute("href") === "Home/styles/style-night.css") {
        botonDeBusqueda.style.background = "#9308a0"
        botonDeBusqueda.style.border = "1px solid #110038"
        botonDeBusqueda.style.color = "#FFFFFF"
        botonDeBusqueda.style.boxShadow = "inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF"
        lupa.setAttribute("src", "Home/assets/lupa_light.svg")
    }
})
async function cargarBusqueda(valorInput) {
    let response = await fetch("https://api.giphy.com/v1/gifs/search?q=" + valorInput + "&api_key=" + apiKey)
        .then((res) => {
            return res.json()
        }).then(data => {
            console.log(data)
            return data
        })
        .catch((error) => {
            return error
        })
    let historialDeBusqueda = []
    let arrayHistorialLS = sessionStorage.getItem("arrayHistorialBusqueda")
    if (arrayHistorialLS != null) {
        historialDeBusqueda = JSON.parse(arrayHistorialLS)
    }
    if (historialDeBusqueda.length < 7) {
        historialDeBusqueda.push(valorInput)
    }
    sessionStorage.setItem("arrayHistorialBusqueda", JSON.stringify(historialDeBusqueda))
    resultadoGifs(response)
    detrasDelResultado()
    parrafo(valorInput)
}
function parrafo(valorInput) {
    tituloResultado.classList.replace("tituloResultado-none", "tituloResultado")
    tituloResultado.innerHTML = `Resultados: ${valorInput}`
}
function resultadoGifs(gif) {
    try {
        let arrayHistorialLS = sessionStorage.getItem("arrayHistorialBusqueda")
        let arrayHistorial = JSON.parse(arrayHistorialLS)
        let contenedorGif = ``
        for (let i = 0; i < arrayHistorial.length; i++) {
            const element = arrayHistorial[i];
            contenedorGif +=
                `<div class="bloqueAzul">
                <p class="textoBloqueAzul">#${element}</p>
            </div>`
        }
        for (let i = 5; i < 30; i++) {
            const element = gif.data[i];
            contenedorGif += `
                <div class="item-sugerencias itm-suge2">
                    <div class="hashtag">
                        <span class="titleDespuesBusqueda">#${element.title}</span>
                    </div>
                    <img class="gifResultado" src= "${element.images.original.url}" alt="gif">
            </div>`
            despuesDeBuscar.innerHTML = contenedorGif
            itemSuge2.style.background = `${element.images.original.url}`
        }
    } catch (error) {
        console.log(error)
    }
}
function detrasDelResultado() { antesDeBuscar.style.display = "none" }
async function gifsTendencias() {
    let response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey)
    var gifsAll = await response.json();
    return gifsAll
}
gifsTendencias().then((respuesta) => {
    var gifsArray = respuesta.data
    console.log(gifsArray)
    for (let i = 5; i < gifsArray.length; i++) {
        const element = gifsArray[i];
        let itemTendencias = document.createElement("img")
        let blockImgP = document.createElement("div")
        blockImgP.setAttribute("class", "blockImgP")
        blockImgP.appendChild(itemTendencias)
        let pHover = document.createElement("p")
        pHover.setAttribute("class", "pHover")
        pHover.setAttribute("id", "pHoverID")
        pHover.innerHTML = `#${element.title}`
        pHover.style.display = "none"
        blockImgP.appendChild(pHover)
        itemTendencias.setAttribute("class", "item-tendencias")
        itemTendencias.setAttribute("id", "itemTendenciasHover")
        itemTendencias.setAttribute("type", "gif")
        itemTendencias.setAttribute("src", `${element.images.original.url}`)
        tendencias.appendChild(blockImgP)
        blockImgP.addEventListener("mouseover", () => {
            pHover.style.display = "block"
        })
        blockImgP.addEventListener("mouseleave", () => {
            pHover.style.display = "none"
        })
    }
    cuatroSugerencias(gifsArray)
})
    .catch((error) => {
        console.log(error)
    })
function cuatroSugerencias(gifsArray) {
    for (let i = 0; i < 4; i++) {
        const element = gifsArray[i]
        contenedorSugerencias.innerHTML += `
        <div class="item-sugerencias">
            <div class="hashtag">
                <span>#${element.title}</span>
                <img src="Home/assets/button3.svg" alt="x">
            </div>
            <img class="gifsugerencia"  src="${element.images.original.url}" alt="gif">
            <a href="https://giphy.com/" target="_blanck"><button class="botonVerMas"> Ver más...</button></a>
        </div>`
    }
}