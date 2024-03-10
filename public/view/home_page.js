import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { randomSecret, cur_balance, cur_bets, newGame, gamePlay } from "../controller/home_controller.js";
export async function homePageView() {
    if(!currentUser){
        root.innerHTML=await protectedView();
        return;
    }
    const response=await fetch('/view/templates/home_page_template.html',
        {cache: 'no-store'});
        
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');
    root.innerHTML = '';
    divWrapper.querySelector("#instructions").innerHTML = "Press [New Game] button to start!";
    divWrapper.querySelector("#cur_balance").textContent = cur_balance;
    divWrapper.querySelector("#cur_bets").textContent = cur_bets;
    let bets = [0,0,0]

    divWrapper.querySelector("#new_game").addEventListener('click',function(){
        let values = document.querySelectorAll('.val');
        bets = [0,0,0]
        for(let i=0;i<3;i++){
            document.querySelectorAll('.card-img')[i].src = "./images/emptycard1.png";
            values[i].innerHTML = bets[i];
        }
        newGame(bets);
        divWrapper.querySelector("#new_game").disabled = true;
        divWrapper.querySelector("#cur_balance").textContent = cur_balance;
        divWrapper.querySelector("#cur_bets").textContent = cur_bets;
        divWrapper.querySelector("#instructions").innerHTML="Bet on cards and press [PLAY]";
        divWrapper.querySelector("#secret").textContent = randomSecret;
    })

    divWrapper.querySelector("#play").addEventListener('click',function(){
        let win = gamePlay(bets);
        let totalBet = 0;
        for(let i=0;i<3;i++)
            totalBet+=bets[i];
        console.log("total Bet: "+totalBet);
        console.log("win: "+win);
        divWrapper.querySelector('#instructions').innerHTML = "You won "+win+" by betting "+ totalBet+ "<br> Press [New Game] to play again.";
        divWrapper.querySelector("#cur_balance").textContent = cur_balance;
        divWrapper.querySelector("#new_game").disabled = false;
    })
    root.appendChild(divWrapper);
}

