// Your data URL
const url = 'https://data.cityofnewyork.us/resource/vfnx-vebw.json'
const graph = document.querySelector('#graph') // Get out graph element (`const`, does not change)
const dropdown = document.querySelector('#shift') // Get the dropdown menu

let localData = [] // Set up an empty object for our local data (`let` because it will change)

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
	const localDataAm = localData.filter(squirrel => squirrel.shift == 'AM')
	const localDataPm = localData.filter(squirrel => squirrel.shift == 'PM')

	// Parse either set depending on the dropdown value
	if (dropdown.value == 'Morning') parseData(localDataAm)
	else if (dropdown.value == 'Afternoon') parseData(localDataPm)
	else parseData(localData) // Send the whole, unfiltered dataset
}


// Go get the data!
fetch(url + '?$limit=50000') // Appends a higher limit; the default is only 1000
	.then(response => response.json())
	.then(data => {
			localData = data // Save the data to our local variable, so we don’t have to re-request
			parseData(localData) // And parse it!
		})
