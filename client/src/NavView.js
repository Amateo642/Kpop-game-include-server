export class NavView {
    constructor (navEl) {
        this.navEl = navEl;
    }

    renderNavbar(groups, girls) {
        const burger = document.createElement('div');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        burger.classList.add('burger-menu');

        burger.appendChild(span1);
        burger.appendChild(span2);
        burger.appendChild(span3);

        burger.addEventListener('click', () => {
            this.navEl.parentElement.classList.toggle('active');
        });

        this.navEl.appendChild(burger);

        const navbar = document.createElement('div');
        navbar.className = 'navbar';

        const home = document.createElement('div');
        home.className = 'navbar-item';
        
        const gameLink = document.createElement('a');
        gameLink.innerText = 'Game';
        gameLink.href = '#game';
        gameLink.className = 'navbar-item-link';
        home.appendChild(gameLink);

        navbar.appendChild(home);

        const leaderBoard = document.createElement('div');//leaderboards
        leaderBoard.className = 'navbar-item';

        const leadersLink = document.createElement('a');
        leadersLink.innerText = 'Leaderboard';
        leadersLink.href = '#leaders';
        leadersLink.className = 'navbar-item-link';
        leaderBoard.appendChild(leadersLink);   
        
        navbar.appendChild(leaderBoard);

        const bands = document.createElement('div');
        bands.className = 'navbar-item';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const groupsDropdownBtn = document.createElement('button');
        groupsDropdownBtn.innerHTML = 'Groups &#x25BC;';
        groupsDropdownBtn.className = 'dropdown-btn navbar-item-link';

        function outside(event) {
            const isClickedOutside = !dropdown.contains(event.target);
        
            if (isClickedOutside) {
                dropdown.classList.remove('show');
                document.removeEventListener('click', outside);
            }
        }

        groupsDropdownBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
            if (dropdown.classList.contains('show')) {
                document.addEventListener('click', outside);
            } else {
                document.removeEventListener('click', outside);
            }
        });

        dropdown.appendChild(groupsDropdownBtn);

        /*const arrowDown = document.createElement('i');
        arrowDown.className = 'fa fa-caret-down';
        groupsLink.appendChild(arrowDown);*/

        const groupsDropdownContent = document.createElement('div');
        groupsDropdownContent.className = 'dropdown-content';

        groups.forEach(group => {
            const band = document.createElement('a');
            band.innerText = group.name;
            band.href = `#group=${group.id}`;
            band.className = 'dropdown-content-item navbar-item-link';

            band.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            groupsDropdownContent.appendChild(band);
        });

        dropdown.appendChild(groupsDropdownContent);

        bands.appendChild(dropdown);

        navbar.appendChild(bands);

        const girlsBlock = document.createElement('div');
        girlsBlock.className = 'navbar-item';

        const girlsLink = document.createElement('a');
        girlsLink.innerText = 'Girls';
        girlsLink.href = '#girls';
        girlsLink.className = 'navbar-item-link';
        girlsBlock.appendChild(girlsLink);

        navbar.appendChild(girlsBlock);

        const amateoBlock = document.createElement('div');
        amateoBlock.className = 'navbar-item';

        const amateoLink = document.createElement('a');
        amateoLink.className = 'navbar-item-link';
        amateoLink.href = "https://www.instagram.com/amateo.dk_official/?hl=ru";
        amateoLink.innerText = 'by Amateo ©';
        amateoBlock.appendChild(amateoLink);

        navbar.appendChild(amateoBlock);

        /*
        const twice = document.createElement('a');
        twice.innerText = 'Twice';
        twice.href = '#twice'; // TODO #group=1; 
        // Строка формируется из шаблонной строки `${}`, 
        // Для девочек ссылка будет #girl=1; 
        */

        this.navEl.appendChild(navbar);
    }
}
