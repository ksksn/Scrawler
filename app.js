import express from 'express'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import path from 'path'

const app = express()

const __dirname = path.resolve();


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/search',(req,res)=>{
    var searchResults = []
    var searchTerm = req._parsedUrl.query
    fetch(`${searchTerm}`)
    .then(response => response.text())
    .then(body => {

        const $ = cheerio.load(body)
        
        $('a').each((index, element)=>{
            const $element = $(element).attr('href')
            if($element[0]==='h' && $element != null)
                searchResults.push($element)
        })
        
    })
    .then(()=>{
        res.send(searchResults)
    })
    .catch((err) =>{
        if (err) throw err
        
    })
    
    
    
})

app.listen(3000)

