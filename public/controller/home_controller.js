export let randomSecret = Math.floor(Math.random() * 3);
export let cur_balance = 15;
export let cur_bets = 0;

export function newGame(bets){
    let incbtn = document.querySelectorAll(".incbtn");
    let decbtn = document.querySelectorAll(".decbtn");
    cur_bets = 0;
    randomSecret = Math.floor(Math.random() * 3);
    for(let i=0;i<3;i++){
        if(cur_balance!=0){
            incbtn[i].disabled = false;
        }
        else if(cur_balance == 0)
        {
            incbtn[i].disabled = true;
            decbtn[i].disabled = true;
            document.querySelector("#restart").disabled = false;
        }
    }
    betting(bets);

}

function buttonToggles(bets,cur_balance,cur_bets){
    let incbtn = document.querySelectorAll(".incbtn");
    let decbtn = document.querySelectorAll(".decbtn");
    let isBet= false;
    for(let i=0;i<3;i++)
    {
        if(bets[i]>0){
            decbtn[i].disabled = false;
            isBet = true;
        }
    }
    for(let i=0;i<3;i++)
        incbtn[i].disabled = cur_balance==0 ? true : false;
    document.querySelector("#play").disabled = isBet?false:true;
}

function betting(bets){
    console.log("loop outside");
    //console.log(this.caller);
    let incbtn = document.querySelectorAll(".incbtn");
    let decbtn = document.querySelectorAll(".decbtn");
    let values = document.querySelectorAll(".val");
  //  console.log(bets);
    
    for(let i=0;i<3;i++){
        console.log("current bets: "+cur_bets+" "+ i);
        incbtn[i].onclick = function(){
             console.log("test");
            bets[i]++;
            cur_bets++;
            cur_balance--;
            document.querySelector("#cur_bets").textContent = cur_bets;
            document.querySelector("#cur_balance").textContent = cur_balance;
            values[i].innerHTML = bets[i];
            buttonToggles(bets,cur_balance,cur_bets)
        }
        decbtn[i].onclick=function(){
            bets[i]--;
            cur_bets--;
            cur_balance++;
            document.querySelector("#cur_bets").textContent = cur_bets;
            document.querySelector("#cur_balance").textContent = cur_balance;
            values[i].innerHTML = bets[i];
            if(bets[i]==0)
                decbtn[i].disabled = true;
            buttonToggles(bets,cur_balance,cur_bets)
        }
    }
}

export function gamePlay(bets){
    let incbtn = document.querySelectorAll(".incbtn");
    let decbtn = document.querySelectorAll(".decbtn");
    for(let i = 0;i < 3; i++){
        if(i==randomSecret){
            document.querySelectorAll('.card-img')[i].src = "./images/firebase.png";
        }
        else
            document.querySelectorAll('.card-img')[i].src = "./images/blank.png";
    }
    for(let i=0;i<3;i++){
        incbtn[i].disabled = true;
        decbtn[i].disabled = true;
    }
    document.querySelector("#play").disabled = true;
    document.querySelector("#restart").disabled = false;
    let win = 3*parseInt(bets[randomSecret]);
    cur_balance+=win;
    return win;
}


