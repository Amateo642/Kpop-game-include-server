import { isDev } from './config';

const apiUrl = isDev ? 'http://localhost:5000/api' : '/api';

export class Model {
    async prepareGame() {
        this.girls = await this.getGirls();
        this.winners = [];
        this.currentStage = 1;
        this.currentRound = 0;
        this.roundsOfStage = Math.floor(this.girls.length / 2);
    }

    async getGirls() {
        return fetch(apiUrl + '/girls').then(data => data.json()); //.then(data => data.slice(0, 3))
    }

    async getGroups() {
        return fetch(apiUrl + '/groups').then(data => data.json());
    }

    async getGirlById(id) {
        return fetch(apiUrl + `/girls/${id}`).then(data => data.json());
    }

    async getGroupById(id) {
        return fetch(apiUrl + `/groups/${id}`).then(data => data.json());
    }

    async getGirlsByGroupId(id) {
        return (await this.getGirls()).filter(girl => girl.groupId === id);
    }

    getCard() {
        return this.girls;
    }

    getPair() {
        this.currentRound++;    
        return this.isNextPairExist() ? [this.girls[0], this.girls[1]] : undefined;
    }

    async setWinner(winner) {
        if (winner) {
            this.winners.push(winner);
            this.girls.splice(0,2);
            await fetch(apiUrl + '/girls', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: winner.id }) });
        }
    }

    getWinner() {
        return this.winners[0];
    }

    isNextPairExist() {
        return this.girls.length > 1;
    }

    isNextStageReady() {
        return this.winners.length > 1 || this.girls.length > 0;
    }

    startNextStage() {
        if (this.girls.length === 1) {
            this.winners.unshift(this.girls[0]);
        }
        this.girls = this.winners;
        this.winners = [];
        this.currentStage++;
        this.currentRound = 0;
        this.roundsOfStage = Math.floor(this.girls.length / 2);
    }

    async getLeaders() {
        const girls = await this.getGirls();
        return girls.sort((girl1, girl2) => {
            if (girl1.voices > girl2.voices) return -1;
            if (girl1.voices === girl2.voices) return 0;
            if (girl1.voices < girl2.voices) return 1;
        }).slice(0, 30);
    }
}
