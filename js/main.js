import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
const libraryAPI = 'https://openlibrary.org/api/books?bibkeys=ISBN:'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu = document.getElementById('bilatu')

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 

}

async function loadJSON(){
   await fetch(libraryAPI + isbn.value + '&format=json&jscmd=data').then(r => {return r.json()})
    .then(jsonFile => {
        let key = Object.keys(jsonFile)
        console.log(datubasea.push(
            {
                "isbn": key[0].slice(5),
                "egilea": jsonFile[key[0]].authors.map(author => author.name + ' '),
                "data": jsonFile[key[0]].publish_date,
                "izenburua": jsonFile[key[0]].title,
                "filename": jsonFile[key[0]].cover.large.slice(36)
            }
        ))
    })
    indizea = datubasea.length - 1

    eremuakBete()
}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })

    bilatu.addEventListener('click', (event) => {
        loadJSON();
    })

}

window.onload = kargatu;

