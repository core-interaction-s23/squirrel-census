// Your data URL
const url = 'https://data.cityofnewyork.us/resource/vfnx-vebw.json'

const graph = document.querySelector('#graph') // Get out graph element (`const`, does not change)
const dropdown = document.querySelector('#shift') // Get the dropdown menu



// Do something with the data!
const parseData = (data) => {
	// Set up variables for the counts
	let grayCount = 0 // These are `let` because they will change
	let cinnamonCount = 0
	let blackCount = 0
	let undefinedCount = 0

	// Go through each item in the object
	data.forEach(squirrel => {
		if (squirrel.primary_fur_color == 'Gray') grayCount = grayCount + 1 // Increment the counter
		// if (squirrel.primary_fur_color == 'Gray') grayCount++ // Shorthand for incrementing
		else if (squirrel.primary_fur_color == 'Cinnamon') cinnamonCount = cinnamonCount + 1
		else if (squirrel.primary_fur_color == 'Black') blackCount = blackCount + 1
		else undefinedCount = undefinedCount + 1
	})

	// Some telemetry!
	console.log('Gray: ' + grayCount)
	console.log('Cinnamon: ' + cinnamonCount)
	console.log('Black: ' + blackCount)
	console.log('Undefined: ' + undefinedCount)

	// Add CSS variables (custom properties) on the graph, with the counts
	graph.style.setProperty('--gray', grayCount)
	graph.style.setProperty('--cinnamon', cinnamonCount)
	graph.style.setProperty('--black', blackCount)
	graph.style.setProperty('--undefined', undefinedCount)
}



// Watch for any change on the dropdown
dropdown.oninput = () => {
	// Filter the locally-copied data
	const dataAm = data.filter(squirrel => squirrel.shift == 'AM')
	const dataPm = data.filter(squirrel => squirrel.shift == 'PM')

	// Parse either set depending on the dropdown value
	if (dropdown.value == 'Morning') parseData(dataAm)
	else if (dropdown.value == 'Afternoon') parseData(dataPm)
	else parseData(data) // Send the whole, unfiltered dataset
}



// This got complicated, but it should make the API less annoying! 🤞
caches.open('cachedData') // Set up a cache for our data
	.then(cache => {
		// See if there is already a cached response for our dataset
		cache.match(url, {ignoreSearch: true})
			.then(response => response.json())
			.then(data => {
				console.log('Loading data from cache…')
				data = data // Save the data to a “global” variable
				parseData(data) // And parse it!
			})
			// If there is not a cache, let’s get and make one
			.catch(error => {
				fetch(url + '?$select=count(*)') // First, go get the total number of rows (entries)
					.then(response => response.json())
					.then(data => {
						let rowCount = data[0].count // Get the count out of this response
						// Use the count as the limit for the API request
						cache.add(url + '?$limit=' + rowCount) // Cache the response
						fetch(url + '?$limit=' + rowCount) // But also use it right away!
							.then(response => response.json())
							.then(data => {
								console.log('Loading data from API…')
								data = data // Same as above!
								parseData(data)
							})
					})
			})
	})
