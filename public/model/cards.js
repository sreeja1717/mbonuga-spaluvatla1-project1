export class Cards{
    constructor(data) {
        this.won = data.won;
        this.email = data.email;
        this.balance = data.balance;
        this.bet = data.bet;
        this.timestamp = data.timestamp;
        this.restart=data.restart;
    }

    set_docId(id) {
        this.docId = id;
    }

    toFirestore() {
        return {
            won: this.won,
            email : this.email,
            timestamp: this.timestamp,
            bet: this.bet,
            restart:this.restart,
            balance:this.balance
        };
    }
    

}