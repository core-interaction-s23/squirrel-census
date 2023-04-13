let url = 'https://data.cityofnewyork.us/resource/vfnx-vebw.json?$limit=50000'

const parseData = (data) => {
	console.log(data)
}



fetch(url)
	.then(response => response.json())
	.then(data => parseData(data))
