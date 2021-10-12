    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBhR8yjzIt_Luz3XA8ydr19WYAqOQIaP_Q",
        authDomain: "monitorco2-c08d0.firebaseapp.com",
        databaseURL: "https://monitorco2-c08d0-default-rtdb.firebaseio.com",
        projectId: "monitorco2-c08d0",
        storageBucket: "monitorco2-c08d0.appspot.com",
        messagingSenderId: "696526889633",
        appId: "1:696526889633:web:3cf8257d85fe5303c246e0"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import { getDatabase, ref, onValue, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

    const db = getDatabase();
    const dbRef = query(ref(db, '/sensores/monoxido-carbono/'), limitToLast(1));

    let spanNivel = document.getElementById('nivel-monoxido');
    let pStatus = document.getElementById('status-monoxido');
    let imgLoading = document.getElementById('loading');

    let divSinalAmarelo = document.getElementById('sinal-amarelo');
    let divSinalVerde = document.getElementById('sinal-verde');
    let divSinalVermelho = document.getElementById('sinal-vermelho');

    let cores = {
        'amarelo_escuro': '#404000',
        'verde_escuro': '#004000',
        'vermelho_escuro': '#400000',
        'amarelo': 'yellow',
        'verde': '#00FF00',
        'vermelho': 'red'

    };

    onValue(dbRef, (snapshot) => {
        imgLoading.style = "display: none";
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log("Key: " + childKey);
            console.log("Value: " + childData.value);
            exibeNiveisMonoxidoCarbono(childKey, childData);
        });
    });

    function acionaSinalAmarelo(msg){ 
        divSinalAmarelo.style = 'background-color: ' + cores['amarelo'];
        pStatus.innerText = msg;
    }

    function acionaSinalVerde(msg){
        divSinalVerde.style = 'background-color: ' + cores['verde'];
        pStatus.innerText = msg;
    }

    function acionaSinalVermelho(msg){
        divSinalVermelho.style = 'background-color: ' + cores['vermelho'];
        pStatus.innerText = msg;
    }

    function apagaTodosSinais(){
        divSinalAmarelo.style = 'background-color: ' + cores['amarelo_escuro'];
        divSinalVerde.style = 'background-color: ' + cores['verde_escuro'];
        divSinalVermelho.style = 'background-color: ' + cores['vermelho_escuro'];
    }

    function exibeNiveisMonoxidoCarbono(key, data) {
        apagaTodosSinais();
        let ppm = data.value;
        spanNivel.innerText = ppm + " ppm";

        if (ppm < 15){
            acionaSinalVerde("Normal");
        } else if (ppm <= 30){
            acionaSinalAmarelo("Situação Inadequada");
        } else if (ppm <= 40) {
            acionaSinalVermelho("Situação Péssima");
        } else {
            acionaSinalVermelho("Situação Crítica");
        }
    }
