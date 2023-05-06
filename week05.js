//Overwatch Hero Menu

class Hero {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
    describe() {
        return `${this.name} is a ${this.role} hero.`;
    }
}

class Faction {
    constructor(name) {
        this.name = name;
        this.heroes = [];
    }

    addHero(hero) {
        if (hero instanceof Hero) {
            this.hero.push(hero);
        } else {
            throw new Error(`Heroes only. Argument is not a hero: ${hero}`);
        }
    }

    describe() {
        return `${this.name} has ${this.hero.length} heroes.`
    }
}

class Menu {
    constructor() {
        this.faction = [];
        this.selectedFaction = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createFaction();
                    break;
                case '2':
                    this.viewFaction();
                    break;
                case '3':
                    this.deleteFaction();
                    break;
                case '4':
                    this.displayFaction();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Thanks for playing!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new faction
        2) view faction
        3) delete faction
        4) display all factions
        `);
    }

    showFactionMenuOptions(factionInfo) {
        return prompt(`
        0) back
        1) create hero
        2) delete hero
        --------------------
        ${factionInfo}
        `);
    }

    displayFaction() {
        let factionString = '';
        for (let i = 0; i < this.faction.length; i++) {
            factionString += i + ') ' + this.faction[i].name + '\n';
        }
        alert(factionString);
    }

    createFaction() {
        let name = prompt('Choose your faction:');
        this.faction.push(new Faction(name));
    }

    viewFaction() {
        let index = prompt('Enter the index of the faction you wish to view:');
        if (index > -1 && index < this.faction.length) {
            this.selectedFaction = this.faction[index];
            let description = 'Faction Name: ' + this.selectedFaction.name + '\n';

            for (let i = 0; i < this.selectedFaction.heroes.length; i++) {
                description += i + ') ' + this.selectedFaction.heroes[i].name + ' - '
                    + this.selectedFaction.heroes[i].role + '\n';
            }

            let selection = this.showFactionMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createHero();
                    break;
                case '2':
                    this.deleteHero();
            }
        }
    }

    deleteFaction() {
        let index = prompt('Enter the index of the faction you wish to delete:');
        if (index > -1 && index < this.faction.length) {
            this.faction.splice(index, 1);
        }
    }

   createHero() {
    let name = prompt(`Select your Hero:` );
    let role = prompt(`Select role for your Hero:`);
    this.selectedFaction.heroes.push(new Hero(name, role));
   } 

   deleteHero() {
    let index = prompt('Enter the index of the hero you wish to remove:');
    if (index > -1 && index < this.selectedFaction.heroes.length) {
        this.selectedFaction.heroes.splice(index, 1);
    }
   }
}

let menu = new Menu();
menu.start(); 