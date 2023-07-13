let persons = []

let L_S = []

class Form {
    constructor() {
        this.div = document.createElement("div")
        this.div.classList.add("form")
        this.errP = document.createElement("p")
        this.errP.style.color = "red"
        this.errP.innerHTML = "Sva polja su obavezna i moraju imati minimum 3 karaktera!"
        this.errP.style.display = "none"
        this.nameInp = document.createElement("input")
        this.nameInp.setAttribute("placeholder", "First name")
        this.lastNameInp = document.createElement("input")
        this.lastNameInp.setAttribute("placeholder", "Last name")
        this.adressInp = document.createElement("input")
        this.adressInp.setAttribute("placeholder", "adress")
        this.phoneInp = document.createElement("input")
        this.phoneInp.setAttribute("placeholder", "phone")
        this.addBtn = document.createElement("button")
        this.addBtn.classList.add("addBtn")
        this.addBtn.innerHTML = "Add"

        this.addBtn.addEventListener("click", () => {
            let v 
            let val1 = this.nameInp.value.trim()
            let val2 = this.lastNameInp.value.trim()
            let val3 = this.adressInp.value.trim()
            let val4 = this.phoneInp.value.trim()
            if(val1 == "" || val2 == "" || val3 == "" || val4 == "") {
                this.errP.style.display = "block"
                return;
            } 
            if(val1.length < 3 || val2.length < 3 || val3.length < 3 || val4.length < 3) {
                this.errP.style.display = "block"
                return;
            } 
            v = [val1, val2, val3, val4]
            L_S.push(v)
            getForLS()
            reloadElements()
            saveToLocalStorage()
            this.errP.style.display = "none"
            this.nameInp.value = ""
            this.lastNameInp.value = ""
            this.adressInp.value = ""
            this.phoneInp.value = ""
        })

        this.div.append(this.errP)
        this.div.append(this.nameInp)
        this.div.append(this.lastNameInp)
        this.div.append(this.adressInp)
        this.div.append(this.phoneInp)
        this.div.append(this.addBtn)
    }
    
}
class Search {
    constructor() {
        this.searchTitle = document.createElement("h3")
        this.searchTitle.innerHTML = "Find person by name or surname"
        this.searchSubTitle = document.createElement("h5")
        this.searchSubTitle.innerHTML = "Please type here and press enter:"
        this.searchDiv = document.createElement("div")
        this.searchDiv.classList.add("searchDiv")
        this.searchInp = document.createElement("input")
        this.searchInp.setAttribute("placeholder", "search person...")
        this.searchDiv.append(this.searchTitle)
        this.searchDiv.append(this.searchSubTitle)
        this.searchDiv.append(this.searchInp)
        this.searchInp.addEventListener("change", () => {
            let val = this.searchInp.value.trim()
            let items = document.querySelectorAll(".mainDiv")
            for(let item of items) {
                if(val == "") {
                    item.style.display = "grid"
                } else { item.style.display = "none" }
                
                if(item.firstChild.firstChild.innerHTML.toLowerCase().startsWith(val)
                   || item.firstChild.firstChild.innerHTML.toUpperCase().startsWith(val)
                   || item.firstChild.firstChild.innerHTML.startsWith(val)
                   || item.childNodes[1].firstChild.innerHTML.startsWith(val)
                   || item.childNodes[1].firstChild.innerHTML.toUpperCase().startsWith(val)
                   || item.childNodes[1].firstChild.innerHTML.toLowerCase().startsWith(val)) {
                    item.style.display = "grid"
                }
            }
        })
    }
}
class Person {
    static count = 0
    constructor(firstName, lastName, adress, phone) {
        this.mainDiv = document.createElement("div")
        this.mainDiv.id = Person.count
        Person.count++ 
        this.mainDiv.classList.add("mainDiv")
        this.nameDiv = document.createElement("div")
        this.nameDiv.classList.add("personDiv")
        this.surnameDiv = document.createElement("div")
        this.surnameDiv.classList.add("personDiv")
        this.adresDiv = document.createElement("div")
        this.adresDiv.classList.add("personDiv")
        this.phoneDiv = document.createElement("div")
        this.phoneDiv.classList.add("personDiv")
        this.p1 = document.createElement("p")
        this.p2 = document.createElement("p")
        this.p3 = document.createElement("p")
        this.p4 = document.createElement("p")
        this.p1.innerHTML = firstName
        this.p2.innerHTML = lastName
        this.p3.innerHTML = adress
        this.p4.innerHTML = phone
        this.deleteBtn = document.createElement("button")
        this.deleteBtn.classList.add("deleteBtn")
        this.deleteBtn.innerHTML = "Remove"
        this.nameDiv.append(this.p1)
        this.surnameDiv.append(this.p2)
        this.adresDiv.append(this.p3)
        this.phoneDiv.append(this.p4)
        this.mainDiv.append(this.nameDiv)
        this.mainDiv.append(this.surnameDiv)
        this.mainDiv.append(this.adresDiv)
        this.mainDiv.append(this.phoneDiv)
        this.mainDiv.append(this.deleteBtn)
        this.deleteBtn.addEventListener("click", () => {
            
            let arr = [this.p1.innerHTML, this.p2.innerHTML, this.p3.innerHTML, this.p4.innerHTML]
            cutFromLS(arr)
            saveToLocalStorage()

        })
    }
    
}

function getForLS() {
        for(let l of L_S) {
            let osoba = new Person(l[0], l[1], l[2], l[3])
            persons.push(osoba)
        }
}

function cutFromLS(arr) {
    for(let l of L_S) {
        if(l[0] == arr[0] && l[1] == arr[1] && l[2] == arr[2] && l[3] == arr[3]) {
            let ind_v = L_S.indexOf(l)
            L_S.splice(ind_v, 1)
            getForLS()
            reloadElements()
        }
    }
}

function reloadElements() {
    listDiv.innerHTML = ""

    for(let per of persons) {
        listDiv.append(per.mainDiv)
    } 
    
    persons = []
}

function saveToLocalStorage() {
        localStorage.setItem("person-data", JSON.stringify(L_S))  
}

function loadFromLocalStorage() {
    let load = localStorage.getItem("person-data")
    if(load === null) {
        return
    }

    let forPush = JSON.parse(load)

    if(forPush.length === 0) {
        return
    }
    
    forPush.forEach(item => {
        L_S.push(item)
    })

    getForLS()
    reloadElements()
}