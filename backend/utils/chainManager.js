class ChainManager {
    constructor() {
        this.chains = {};
    }

    addChain(name, chain) {
        this.chains[name] = chain;
    }

    getChain(name) {
        return this.chains[name];
    }
}

module.exports = new ChainManager();

