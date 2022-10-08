const button = document.getElementById("btn");
button.addEventListener('click', NewCandidato);

function partidoDe(num) {
    var partidos = new Map();
    partidos.set("13","Partido Dos Trabalhadores");
    partidos.set("22", "Partido Liberal");
    partidos.set("15", "Movimento Democrático Brasileiro");
    partidos.set("12","Partido Democrático Trabalhista");
    partidos.set("44","União Brasil");
    partidos.set("30","Partido Novo");
    partidos.set("14","Partido Trabalhista Brasileiro");
    partidos.set("80","Unidade Popular");
    partidos.set("21","Partido Comunista Brasileiro");
    partidos.set("16","Partido Socialista T.U");
    partidos.set("27","Democracia Cristã");

    for (var [numero, partido] of partidos){
        if(numero == num){
            return partido;
        }
    }
    return false
}
//criar os elementos html da pagina
function NewCandidato(){
    // pegar os dados da api
    const url = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json'
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        const canditados = data['cand'];

        return canditados.map(canditato => {
            const name = canditato['nm'];
            const numero = canditato['n'];
            const nVotos = canditato['vap'];

            var sectionCand = document.createElement("section");
            sectionCand.id = numero;
            //criando a div de perfil e dados
            var divPerfil = document.createElement("div");
            var perfilFoto = document.createElement("img");
            perfilFoto.src = "https://www.lacazmartins.com.br/wp-content/uploads/2017/05/sem-foto-oficial.png";
            divPerfil.appendChild(perfilFoto);

            var pName = document.createElement("p");
            var textName = document.createTextNode(name);
            pName.appendChild(textName);
            divPerfil.appendChild(pName);

            var dados = document.createElement("div");
            var pNumero = document.createElement("p");

            var sampleTextNumero = "N°: " + numero +"<br>"+"N° VOTOS: " + nVotos +"<br>"+"P.Político: " + partidoDe(numero);

            pNumero.innerHTML = sampleTextNumero;
            dados.appendChild(pNumero);

            //definindo o nome das classe
            divPerfil.className = "perfil"
            dados.className = "dados"

            //adicionando tudo a sessão 
            sectionCand.appendChild(divPerfil);
            sectionCand.appendChild(dados);

            //adicionando no documento
            var main = document.getElementById("main");
            main.appendChild(sectionCand);
        })   

    }).catch(err => {});



}
//inserir os dados nos elementos criados
