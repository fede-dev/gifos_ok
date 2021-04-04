const linksDeCrearGuifos = document.getElementsByTagName("link")
const linkHojaDeEstiloCrearGuifos = linksDeCrearGuifos[1]
const botonComenzar = document.getElementById("botonComenzar")
const ventanaMain = document.querySelector(".contenedor-instrucciones")
const ventanaDos = document.querySelector(".ventanaDos")
const botonesStarted = document.getElementById("botonesStarted")
const botoncamara = document.querySelector(".botoncamara")
const botoncapturar = document.querySelector(".botoncapturar")
const imgbtn = document.querySelector(".imgbtn")
const botonesStopped = document.getElementById("botonesStopped")
const repitoOsubo = document.getElementById("repitoOsubo")
const repitoCaptura = document.getElementById("repitoCaptura")
const suboGuifo = document.getElementById("suboGuifo")
const blocksubiendoguif = document.getElementById("blocksubiendoguif")
const textHeader = document.getElementById("textHeader")
const haciendoguif = document.getElementById("haciendoguif")
const barra = document.getElementById("barra")
const videoPreview = document.getElementById("videoPreview")
const video = document.getElementById("video")
const ventanaTres = document.querySelector(".ventanaTres")
const gifOpacity = document.getElementById("gifOpacity")
const copiarEnlace = document.querySelector(".copiarEnlace")
const descargarGuifo = document.querySelector(".descargarGuifo")
const apiKey = "JkzPHqffocz5tYs65zUnR0NJFXVr01NX"
const imgcamaritabtn = document.getElementById("imgcamaritabtn")
const logoGif = document.getElementById("logoGif")
var recorder = null
var cronometro;
var stattus = null;
let segundos = document.getElementById("segundos")
let contadorSeg = 00

ventanaDos.style.display = "none"
ventanaTres.style.display = "none"
botonesStopped.style.display = "none"
repitoOsubo.style.display = "none"
blocksubiendoguif.style.display = "none"


if (localStorage.getItem("tema") === "tema-oscuro") {
    linkHojaDeEstiloCrearGuifos.removeAttribute("href", "styles/v-style.css")
    linkHojaDeEstiloCrearGuifos.setAttribute("href", "styles/v-style-night.css")
    logoGif.removeAttribute("src", "../Home/assets/gifOF_logo.png")
    logoGif.setAttribute("src", "../Home/assets/gifOF_logo_dark.png")
    imgcamaritabtn.removeAttribute("src", "../Home/assets/camera.svg")
    imgcamaritabtn.setAttribute("src", "../Home/assets/camera_light.svg")
}

function barraProgresa() {
    barra.value += 5

    if ((barra.value === 95) && (stattus === null)) {
        barra.value = 0
    }
    if (barra.value === 100) {
        ventanaDos.style.display = "none"
        ventanaTres.style.display = "block"
    }
}
function detener() {
    clearInterval(cronometro)
}
function carga() {
    cronometro = setInterval(function () {
        if (contadorSeg == 60) {
            contadorSeg = 00
        }
        if (contadorSeg < 10) {
            segundos.innerHTML = "0" + contadorSeg
        } else {
            segundos.innerHTML = contadorSeg
        }
        contadorSeg++
    }, 1000)
}

let comienzoCapturar = botonComenzar.addEventListener("click", () => {
    ventanaMain.style.display = "none"
    ventanaDos.style.display = "block"

    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: {
                width: 835,
                height: 435
            }
        }
    ).then(function (mediaStream) {
        let video = document.getElementById("video")

        recorder = RecordRTC(mediaStream, {
            type: "gif",
            frameRate: 1,
            quality: 10,
        })

        video.srcObject = mediaStream
        video.play()

        botonesStarted.addEventListener("click", () => {
            recorder.startRecording()
            textHeader.innerHTML = "Capturando Tu Guifo"
            botonesStopped.style.display = "flex"
            botonesStarted.style.display = "none"
            carga()
        })
        botonesStopped.addEventListener("click", () => {
            detener(cronometro)
            botonesStopped.style.display = "none"
            repitoOsubo.style.display = "flex"
            textHeader.innerHTML = "Vista Previa"

            recorder.stopRecording(function () {
                var blob = recorder.getBlob();

                recorder.getDataURL(function (url) {
                    var gifurl = url
                    videoPreview.setAttribute("src", `${gifurl}`)
                    videoPreview.style.display = "block"
                    video.style.display = "none"
                    gifOpacity.setAttribute("src", `${gifurl}`)
                })
                suboGuifo.addEventListener("click", () => {
                    haciendoguif.style.display = "none"
                    blocksubiendoguif.style.display = "flex"
                    textHeader.innerHTML = "Subiendo Guifo"
                    subirGuifoOrden(blob)
                    barraProgresa()
                })
                //copiar enlace del gif
                descargarGuifo.addEventListener("click", () => {
                    invokeSaveAsDialog(blob);
                })
            });
        })
    }).catch(function (err) {
        console.log(err)
    })
})

async function subirGuifoOrden(blob) {
    try {
        var form = new FormData()
        form.append("file", blob, "file.gif")
        let post = await fetch("https://upload.giphy.com/v1/gifs?&api_key=" + apiKey, {
            method: "POST",
            body: form
        })
        let idPost = await post.json()
        let idDelGif = idPost.data.id
        localStorage.setItem("gifId", idDelGif)
        let arrayDeIdGif = []
        let arrayIdsLs = localStorage.getItem("arrayDeGifsUp")
        stattus = idPost.meta.status
        if (stattus === 200) {
            barra.value = 95
        }
        if (arrayIdsLs != null) {
            arrayDeIdGif = JSON.parse(arrayIdsLs)
        }
        arrayDeIdGif.push(idDelGif)
        localStorage.setItem("arrayDeGifsUp", JSON.stringify(arrayDeIdGif))

        copiarEnlace.addEventListener("click", () => {
            ejecutoCopia(idDelGif)
            alert("Enlace Copiado!")
        })
    } catch (error) {
        console.log(error)
    }
}

function ejecutoCopia(idDelGif) {
    const copiarElemento = document.createElement("textarea")
    copiarElemento.value = `https://giphy.com/gifs/${idDelGif}`
    copiarElemento.setAttribute("readonly", "")
    copiarElemento.style = "background", "transparent"
    document.body.appendChild(copiarElemento)
    copiarElemento.select()
    document.execCommand("copy")
    document.body.removeChild(copiarElemento)
}