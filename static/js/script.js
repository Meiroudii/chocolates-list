const endpoint = "https://gist.githubusercontent.com/Meiroudii/4542ceced289b571a61f841d4f64484d/raw/73a5a9ebfbdcf3595e47c4260ff8c2d33cdbf743/chocolates.json";
const search_input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const chocolates = [];

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => chocolates.push(...data));



function find_matches(word_to_match, chocolates) {
	return chocolates.filter(choco => {
		const regex = new RegExp(word_to_match, "gi");
		return choco.chocolate_type.match(regex);
	});
}

function display_matches() {
	const match_array = find_matches(this.value, chocolates);
	const html = match_array.map(choco => {
		const regex = new RegExp(this.value, "gi");
		const chocolate_type = choco.chocolate_type.replace(regex, `<span class="hl">${this.value}</span>`);
		return `
			<li>
				<span class="name">${chocolate_type}</span>
			</li>
		`;
	}).join("");
	suggestions.innerHTML = html;
}

search_input.addEventListener("change", display_matches);
search_input.addEventListener("keyup", display_matches);

