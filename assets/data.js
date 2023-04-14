let url = 'https://data.cityofnewyork.us/resource/vfnx-vebw.json'
let localData = []
let graph = document.querySelector('#graph')
let dropdown = document.querySelector('#shift')

const parseData = (data) => {
	let grayCount = 0
	let cinnamonCount = 0
	let blackCount = 0
	let undefinedCount = 0

	data.forEach(squirrel => {
		if (squirrel.primary_fur_color == 'Gray') grayCount = grayCount + 1
		// if (squirrel.primary_fur_color == 'Gray') grayCount++
		else if (squirrel.primary_fur_color == 'Cinnamon') cinnamonCount = cinnamonCount + 1
		else if (squirrel.primary_fur_color == 'Black') blackCount = blackCount + 1
		else undefinedCount = undefinedCount + 1
	})

	// console.log(data.filter(squirrel => squirrel.primary_fur_color == 'Black'))

	console.log('Gray: ' + grayCount)
	console.log('Cinnamon: ' + cinnamonCount)
	console.log('Black: ' + blackCount)
	console.log('Undefined: ' + undefinedCount)

	graph.style.setProperty('--gray', grayCount)
	graph.style.setProperty('--cinnamon', cinnamonCount)
	graph.style.setProperty('--black', blackCount)
	graph.style.setProperty('--undefined', undefinedCount)
	graph.style.setProperty('--total', grayCount + cinnamonCount + blackCount + undefinedCount)
}

dropdown.oninput = () => {
	if (dropdown.value == 'Morning') parseData(localData.filter(squirrel => squirrel.shift == 'AM'))
	else if (dropdown.value == 'Afternoon') parseData(localData.filter(squirrel => squirrel.shift == 'PM'))
	else parseData(localData)
}



fetch(url + '?$limit=50000')
	.then(response => response.json())
	.then(data => {
			localData = data
			parseData(localData)
		})
