window.addEventListener("load", () => {
    loadFromLocalStorage()
    styleFromLocalStorage()
})

const divApp = document.querySelector("#app") 

const styleDiv = document.createElement("div")
styleDiv.classList.add("stilDiv")
const darkBtn = document.createElement("button")
darkBtn.setAttribute("id", "darkBtn")
darkBtn.innerHTML = "Dark"
const lightBtn = document.createElement("button")
lightBtn.setAttribute("id", "lightBtn")
lightBtn.innerHTML = "Light"
divApp.append(styleDiv)
styleDiv.append(darkBtn)
styleDiv.append(lightBtn)

const formDiv = document.createElement("div")
formDiv.classList.add("form_div") 
const listDiv = document.createElement("div")
let form = new Form()
let search = new Search()

divApp.append(formDiv)
divApp.append(listDiv)
formDiv.append(form.div)
formDiv.append(search.searchDiv)

darkBtn.addEventListener("click", () => {
    let d = "dark"
    document.body.classList.add(d)
    inputs = document.querySelectorAll("input")
    for(let i of inputs) {
        i.classList.add(d)
    }
    styleToLocalStorage(d)
})

lightBtn.addEventListener("click", () => {
    let s = "light"
    document.body.classList.remove("dark")
    inputs = document.querySelectorAll("input")
    for(let i of inputs) {
        i.classList.remove("dark")
    }
    styleToLocalStorage(s)
})

function styleToLocalStorage(d) {
    localStorage.setItem("style", d)
}
function styleFromLocalStorage() {
    let styleOn = localStorage.getItem("style")
    if(styleOn === null) {
        return
    }
    if(styleOn !== "dark") {
        return
    }
    if(styleOn == "dark") {
        document.body.classList.add(styleOn)
        inputs = document.querySelectorAll("input")
        for(let i of inputs) {
            i.classList.add(styleOn)
        }
    }
}