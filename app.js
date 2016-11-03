'use strict'
const fs = require('fs-extra')
const SitemapGenerator = require('sitemap-generator')

const port = 8888
const domain = 'https://www.escaladesports.com'
 
// create generator
const generator = new SitemapGenerator('http://localhost', {
	port: port
})

// register event listeners
generator.on('done', function (sitemap) {
	const regDomain = new RegExp(`http://localhost:${port}`, 'g')
	sitemap = sitemap.replace(regDomain, domain)
	fs.outputFile('sitemap.xml', sitemap, err => {
		if(err) throw err
		console.log('DONE!')
	})
})
generator.on('fetch', function(status, url){
	console.log('')
	console.log(`URL: ${url}`)
	console.log(`Status: ${status}`)
})
generator.on('clienterror', function(err, data){
	console.log('ERROR')
	console.log(err)
	console.log(data)
})
 
// start the crawler
generator.start()