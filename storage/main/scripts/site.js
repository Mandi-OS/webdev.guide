requestAnimationFrame(startApp)
function startApp() {
	//selectLang(localStorage.getItem('lang'))
	readLocalStorage()
	loadHeader()
  	setLocalScreen(localStorage.getItem('last_page'), true)
	console.log("Site started succesfully!")
}

let subdomain_name = {}
const localScreens = document.querySelectorAll('.localScreen')
translates = {
	"ru": {
		"subdomain_name": {'home': 'Главная страница', 'siteWork': 'Работа сайта', 'network': 'Сеть', 'dict': 'Словарь',
		'devTools': 'DevTools'}
	},
	"en": {
		"subdomain_name": {'home': 'Home', 'siteWork': 'Site Work', 'network': 'Network', 'dict': 'Dictionary',
		'devTools': 'DevTools'}
	}
}

function readLocalStorage() {
	if (localStorage.getItem('lang') === null) { localStorage.setItem('lang', 'ru') } // Language
	if (localStorage.getItem('last_page') === null) { localStorage.setItem('last_page', 'home') } // Last page
	if (localStorage.getItem('last_hash') === null) { localStorage.setItem('last_hash', '') } // Last hash
	// Subdomain_name
	localStorage.setItem('subdomain_name', JSON.stringify(translates[localStorage.getItem('lang')]["subdomain_name"]))
	subdomain_name = JSON.parse(localStorage.getItem('subdomain_name'))
}

// Fill header with local screen links
 function loadHeader() {
	const frame = document.querySelector('body > header > #nav')

	localScreens.forEach(
        function(screen) {
			const item = document.createElement('li')
			const itemText = document.createElement('span')
			item.appendChild(itemText)
			frame.appendChild(item)
	
			itemText.textContent = subdomain_name[screen.id]
			item.setAttribute("onclick", `setLocalScreen('${screen.id}')`)
			item.id = screen.id + "Btn"
	})

	// Go to last page user visited
	frame.querySelector('#' + localStorage.getItem('last_page') + "Btn").classList.add('current')
    window.location.hash = localStorage.getItem('last_hash')
 }

function setLocalScreen(screenId, start=false) {
	const screen = document.querySelector(`body > header > #nav #${screenId}`)

	// Current  screen
    localScreens.forEach(
        function(screen) {
            if (screen.id === screenId) {
        	    screen.classList.remove('hidden')
        	} else {
        		screen.classList.add('hidden')
        	}

        })
  	setLocalBtn(screenId)
    localStorage.setItem('last_page', screenId) // Remember last page user visited
    setToStart(document.querySelector('#' + screenId + ' > footer > .hideFooter')) // Set toStart Btn to footer
    // Clear location hash(anchor)
    if (!start && window.location.hash !== '') {
    	window.location.hash = ''
    	localStorage.setItem('last_hash', '')
    }
}

function setLocalBtn(screenId) {
	const localBtns = document.querySelectorAll('body > header > #nav > li')
	// Current button
	localBtns.forEach(function(localBtn) {
        if (screenId + "Btn" === localBtn.id) {
            localBtn.classList.add('current')
            localBtn.scrollIntoView()
        } else {
            localBtn.classList.remove('current')
        }
    })
}

// Scroll navigation menu
 const nav = document.querySelector('body > header > #nav')
 nav.addEventListener('wheel', function(event) {
 	if (nav.contains(event.target)) {
 		if (event.shiftKey) {
     		event.preventDefault()
     		nav.scrollLeft += event.deltaY * 1.5
 		}
 	}
 })

// Links work
 const links = document.querySelectorAll('.link')
 links.forEach(function(link) {
 	link.addEventListener('click', function() {
 		if (document.querySelector('.localScreen:not(.hidden)').id !== link.classList[1]) {
 			setLocalScreen(link.classList[1])
 		}
 		if (link.classList[2]) {
 			window.location.hash = '#' + link.classList[2]
		 	localStorage.setItem('last_hash', link.classList[2]) // Remember last hash
 		}
 	})
 })
 const dicts = document.querySelectorAll('.dict')
 dicts.forEach(function(dict) {
 	dict.addEventListener('click', function() {
 		if (document.querySelector('.localScreen:not(.hidden)').id !== 'dict') {
 			setLocalScreen('dict')
 		}
 		if (dict.classList[1]) {
 			window.location.hash = '#' + dict.classList[1]
			localStorage.setItem('last_hash', dict.classList[1]) // Remember last hash
		}
 	})
 })

// Set #toStart bottom margin
 function setToStart(hideElement) {
 	let footer = document.querySelector('.localScreen:not(.hidden) > footer') ? document.querySelector('.localScreen:not(.hidden) > footer') : null
 	let offset = 0
 	if (footer !== null && hideElement !== null) {
 		const footerOffset = hideElement.classList.contains('visible') ? 0 : (hideElement.parentElement.offsetHeight - 2 * (parseFloat(getComputedStyle(hideElement.parentElement).fontSize) / 2) - 13); // Only thing I dont know how is calculating
		offset += footer.offsetHeight
 		offset -= footerOffset
 		document.body.style.setProperty('--footerHeight', offset + "px")
 	} else {
		document.body.style.setProperty('--footerHeight', '15px')
 	}
 }

// Change language
 function selectLang(lang) {
 	switch (lang) {
	case "ru":
		localStorage.setItem('lang', lang)
		location.href = "/webdev.guide/"
		break
	default:
		localStorage.setItem('lang', lang)
 		localStorage.setItem('subdomain_name', JSON.stringify(translates[lang]["subdomain_name"]))
 		location.href = "/webdev.guide/" + lang + "/index.html"
		break
 	}
 }

// Hide Footer
 function hideFooter(element) {
 	element.parentElement.style.transform = element.classList.contains('visible') ? 'translateY(calc(100% - 2ch))' : 'translateY(0)'
 	element.textContent = element.classList.contains('visible') ? '▲' : '▼'
 	element.classList.toggle('visible')

    setToStart(element)
 }

// Set target _blank to all 'a' elements
 document.querySelectorAll('a').forEach(function(link) {
 	if (!link.target) { link.target = "_blank" }
 })
