import { root } from "./elements.js";
import { currentUser } from "../controller/firebase_auth.js";
import { protectedView } from "./protected_view.js";
import { deletedata, updategamelist } from "../controller/firestore_controller.js";
import { DEV } from "../model/constant.js";
import { progressMessage } from "./progress_view.js";



/*
export async function Menu2PageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    let response;

    try {
        response = await fetch('/view/templates/play_history.html', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch play history: ${response.status}`);
        }

        const htmlContent = await response.text();
        root.innerHTML = htmlContent;

    } catch (error) {
        console.error('Error fetching play history:', error);
        
    }
    let tbody=document.createElement("tbody");

    const divWrapper = document.createElement('div');
    divWrapper.innerHTML=await response.text();
    divWrapper.classList.add('m-4','p-4');
    root.innerHTML='';
   
    tbody.setAttribute("id","tbodyreply");
    let list;
    list=await updategamelist();
    list.forEach(game=>tbody.appendChild(history(game)));
    let table=divWrapper.getElementsByTagName("table")[0];
    table.appendChild(tbody);

    divWrapper.querySelector("button").onclick=()=>{
        tbody.remove();
        deletedata();
        let his=document.createElement("h3");
        his.innerHTML="History Not found";
        his.classList.add('text-danger');
        divWrapper.appendChild(his);
    }
    root.appendChild(divWrapper);
}*/
/*export async function Menu2PageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }

    let response; // Define response variable outside the try block

    //try {
        response = await fetch('/view/templates/play_history.html', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch play history: ${response.status}`);
        }

        const htmlContent = await response.text();
        root.innerHTML = htmlContent;

        // Rest of the try block
        let tbody = document.createElement("tbody");
        const divWrapper = document.createElement('div');
        divWrapper.innerHTML = htmlContent;
        divWrapper.classList.add('m-4', 'p-4');
        root.innerHTML = '';

        tbody.setAttribute("id", "tbodyreply");
        let list;
        list = await updategamelist();
        list.forEach(game => tbody.appendChild(history(game)));
        let table = divWrapper.getElementsByTagName("table")[0];
        table.appendChild(tbody);

        divWrapper.querySelector("button").onclick = () => {
            tbody.remove();
            deletedata();
            let his = document.createElement("h3");
            his.innerHTML = "History Not found";
            his.classList.add('text-danger');
            divWrapper.appendChild(his);
        }
        root.appendChild(divWrapper);

   // } catch (error) {
      //  console.error('Error fetching play history:', error);
    //}
}




let n=1;
export function history(game){
    let lElement= document.body.lastElementChild;
    lElement.remove;
    let tr=document.createElement("tr");
    let t1=document.createElement("td");
    t1.innerText=n;
     n++;
     tr.append(t1);
     let t2=document.createElement("td");
     let t3=document.createElement("td");
     if(game.restart==true){
        t2.innerHTML="App restart";
        t3.innerHTML="";
     }
     else{
        t2.innerHTML=game.bet;
        t3.innerHTML=game.won
     }
     tr.append(t2);
     tr.append(t3)
     let t4=document.createElement("td");
     t4.innerHTML=game.balance;
     tr.appendChild(t4);
     let t5=document.createElement("td");
     t5.innerHTML=new Date(game.timestamp).toLocaleString();
     tr.appendChild(t5);
     return tr;

}*/


export async function Menu2PageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }

    //let response; // Define response variable outside the try block

    
      const  response = await fetch('/view/templates/play_history.html', { cache: 'no-store' });

       

        const htmlContent = await response.text();

        // Rest of the try block
        let tbody = document.createElement("tbody");
        const divWrapper = document.createElement('div');
        divWrapper.innerHTML = htmlContent;
        divWrapper.classList.add('m-4', 'p-4');
        root.innerHTML = progressMessage('Loading History ...');
        root.innerHTML='';
        tbody.setAttribute("id", "tbodyreply");
        let gamelist;
       
try {
    try {
        gamelist = await updategamelist();
    } catch (error) {
        console.error('Error updating game list:', error);
        // Handle the error as needed
    }
    
    //gamelist = await updategamelist();
    console.log('Game List:', gamelist);  // Log the result to the console
} catch (e) {
    // Handle the error
    if (DEV) console.log('getgamelist error', e);
    alert('Failed to get game: ' + JSON.stringify(e));
}
console.log('Game List:', gamelist);
if (Array.isArray(gamelist)) {
    gamelist.forEach(game => tbody.appendChild(history(game)));
} else {
    console.error('Gamelist is not an array:', gamelist);
    // Handle the case where gamelist is not an array
}


    
        
     // gamelist.forEach(game => tbody.appendChild(history(game)));

       
        let table = divWrapper.getElementsByTagName("table")[0];
        table.appendChild(tbody);

        divWrapper.querySelector("button").onclick = () => {
            tbody.remove();
            deletedata();
            let his = document.createElement("h3");
            his.innerHTML = "History Not found";
            his.classList.add('text-danger');
            divWrapper.appendChild(his);
        }

        root.innerHTML = ''; // Clear root before appending
        root.appendChild(divWrapper);

    } 



let n = 1;
export function history(game) {
    let lElement = document.body.lastElementChild;
    lElement.remove();

    let tr = document.createElement("tr");
    let t1 = document.createElement("td");
    t1.innerText = n;
    n++;
    tr.append(t1);
    let t2 = document.createElement("td");
    let t3 = document.createElement("td");
    if (game.restart == true) {
        t2.innerHTML = "App restart";
        t3.innerHTML = "";
    } else {
        t2.innerHTML = game.bet;
        t3.innerHTML = game.won;
    }
    tr.append(t2);
    tr.append(t3);
    let t4 = document.createElement("td");
    t4.innerHTML = game.balance;
    tr.appendChild(t4);
    let t5 = document.createElement("td");
    t5.innerHTML = new Date(game.timestamp).toLocaleString();
    tr.appendChild(t5);
    return tr;
}
