requestAnimationFrame(startApp)
function startApp() {
	//selectLang(localStorage.getItem('lang'))
	loadHeader()
	console.log("Site started succesfully!")
}

let subdomain_name = {'home': 'Главная страница', 'siteWork': 'Работа сайта', 'server': 'Сервер'}
const localScreens = document.querySelectorAll('.localScreen')
translates = {
	"en": {
		"subdomain_name": {'home': 'Home', 'siteWork': 'Site Work', 'server': 'Server'}
	},
	"az": {
		"subdomain_name": {'home': 'Əsas səhifə', 'siteWork': 'Saytın əməliyyatı', 'server': 'Server'}
	}
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
	const localBtns = document.querySelectorAll('body > header > #nav > li')
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
    // Current button
    localBtns.forEach(
        function(localBtn) {
            if (screenId + "Btn" === localBtn.id) {
                localBtn.classList.add('current')
            } else {
                localBtn.classList.remove('current')
            }
        })
    // Remember last page user visited
    localStorage.setItem('last_page', screenId)
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


// Change language
 function selectLang(lang) {
 	switch (lang) {
 	case null:
		localStorage.setItem('lang', 'RU')
		break
	case "RU":
		localStorage.setItem('lang', lang)
		location.href = "/"
		break
	default:
		localStorage.setItem('lang', lang)
 		location.href = "/" + lang.toLowerCase() + "/index.html"
 		subdomain_name = translates[lang.toLowerCase()]["subdomain_name"]
		break
 	}
 }