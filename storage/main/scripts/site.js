requestAnimationFrame(startApp)
function startApp() {
	//selectLang(localStorage.getItem('lang'))
	readLocalStorage()
	loadHeader()
  	setLocalBtn(localStorage.getItem('last_page'))
	console.log("Site started succesfully!")
}

let subdomain_name = {}
const localScreens = document.querySelectorAll('.localScreen')
translates = {
	"ru": {
		"subdomain_name": {'home': 'Главная страница', 'siteWork': 'Работа сайта', 'server': 'Сервер', 'dict': 'Словарь',
		'devTools': 'DevTools'}
	},
	"en": {
		"subdomain_name": {'home': 'Home', 'siteWork': 'Site Work', 'server': 'Server', 'dict': 'Dictionary',
		'devTools': 'DevTools'}
	}
}

function readLocalStorage() {
	// Language
	if (localStorage.getItem('lang') === null) { localStorage.setItem('lang', 'ru') }
	// Last page
	if (localStorage.getItem('last_page') === null) { localStorage.setItem('last_page', 'home') }
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
	frame.querySelector('#' + localStorage.getItem('last_page') + "Btn").click()
}

function setLocalScreen(screenId) {
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
    // Remember last page user visited
    localStorage.setItem('last_page', screenId)
}

function setLocalBtn(screenId) {
	const localBtns = document.querySelectorAll('body > header > #nav > li')
	// Current button
	localBtns.forEach(function(localBtn) {
        if (screenId + "Btn" === localBtn.id) {
            localBtn.classList.add('current')
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

// Link work
 const links = document.querySelectorAll('.link')
 links.forEach(function(link) {
 	link.addEventListener('click', function() {
 		setLocalScreen(link.classList[1])
 	})
 })
 const dicts = document.querySelectorAll('.dict')
 dicts.forEach(function(dict) {
 	dict.addEventListener('click', function() {
 		setLocalScreen('dict')
 		location.href = '#' + dict.classList[1]
 	})
 })


// Change language
 function selectLang(lang) {
 	switch (lang) {
	case "ru":
		localStorage.setItem('lang', lang)
		location.href = "/webdevelop.guide/"
		break
	default:
		localStorage.setItem('lang', lang)
 		localStorage.setItem('subdomain_name', JSON.stringify(translates[lang]["subdomain_name"]))
 		location.href = "/webdevelop.guide/" + lang + "/index.html"
		break
 	}
 }
 
