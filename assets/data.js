let url = 'https://data.cityofnewyork.us/resource/vfnx-vebw.json'

const parseData = (data) => {
	let grayCount = 0
	let cinnamonCount = 0
	let blackCount = 0
	let undefinedCount = 0

	data.forEach(squirrel => {
		if (squirrel.primary_fur_color == 'Gray') grayCount = grayCount + 1
		if (squirrel.primary_fur_color == 'Gray') grayCount++
		else if (squirrel.primary_fur_color == 'Cinnamon') cinnamonCount = cinnamonCount + 1
		else if (squirrel.primary_fur_color == 'Black') blackCount = blackCount + 1
		else undefinedCount = undefinedCount + 1
	})

	// console.log(data.filter(squirrel => squirrel.primary_fur_color == 'Black'))

	console.log('Gray: ' + grayCount)
	console.log('Cinnamon: ' + cinnamonCount)
	console.log('Black: ' + blackCount)
	console.log('Undefined: ' + undefinedCount)
}



fetch(url + '?$limit=50000')
	.then(response => response.json())
	.then(data => parseData(data))
