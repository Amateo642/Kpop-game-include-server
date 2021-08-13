export class Model {
    async prepareGame() {
        this.girls = await this.getGirls();
        this.winners = [];
    }

    async getGirls() {
        return fetch('http://localhost:5000/api/girls').then(data => data.json());
    }

    async getGroups() {
        return fetch('http://localhost:5000/api/groups').then(data => data.json());
    }

    async getGirlById(id) {
        return fetch(`http://localhost:5000/api/girls/${id}`).then(data => data.json());
    }

    async getGroupById(id) {
        return fetch(`http://localhost:5000/api/groups/${id}`).then(data => data.json());
    }

    async getGirlsByGroupId(id) {
        return (await this.getGirls()).filter(girl => girl.groupId === id);
    }

    getCard() {
        return this.girls;
    }

    getPair() {
        return this.isNextPairExist() ? [this.girls[0], this.girls[1]] : undefined;
    }

    async setWinner(winner) {
        if (winner) {
            this.winners.push(winner);
            this.girls.splice(0,2);
            await fetch('http://localhost:5000/api/girls', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: winner.id }) });
        }
    }

    getWinner() {
        return this.winners[0];
    }

    isNextPairExist() {
        return this.girls.length > 1;
    }

    isNextRoundReady() {
        return this.winners.length > 1 || this.girls.length > 0;
    }

    startNextRound() {
        if (this.girls.length === 1) {
            this.winners.unshift(this.girls[0]);
        }
        this.girls = this.winners;
        this.winners = [];
    }

    async getLeaders() {
        const girls = await this.getGirls();
        return girls.sort((girl1, girl2) => {
            if (girl1.voices > girl2.voices) return -1;
            if (girl1.voices === girl2.voices) return 0;
            if (girl1.voices < girl2.voices) return 1;
        }).slice(0, 3);
    }
}
