// Variável para armazenar os amigos inseridos
let amigos = [];

// Função para adicionar amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome && !amigos.includes(nome)) {
        amigos.push(nome); // Adiciona o nome à lista de amigos
        atualizarLista(); // Atualiza a lista exibida na tela
    } else if (!nome) {
        alert("Digite um nome válido!");
    } else {
        alert("Este nome já foi adicionado!");
    }

    input.value = ''; // Limpa o campo de input
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista antes de atualizar

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear!');
        return;
    }

    // Embaralha a lista de amigos para garantir um sorteio aleatório
    const amigosEmbaralhados = [...amigos];
    for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
    }

    // Cria um objeto para armazenar o amigo secreto de cada pessoa
    const amigosSecretos = {};
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        const amigo = amigosEmbaralhados[i];
        const amigoSorteado = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length]; // Pega o próximo amigo na lista (circular)
        amigosSecretos[amigo] = amigoSorteado; // Atribui o amigo secreto
    }

    // Agora, ao invés de mostrar todos os resultados de uma vez, vamos exibir um botão para cada pessoa
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpa resultados anteriores

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `Clique para ver quem ${amigo} tirou`;
        
        // Quando o botão for clicado, mostra o amigo secreto para aquela pessoa
        button.onclick = () => {
            // Exibe o amigo secreto para aquela pessoa
            alert(`${amigo} tirou ${amigosSecretos[amigo]}`);

            // Desabilita o botão e muda a cor para mais escura
            button.disabled = true;
            button.style.backgroundColor = "#555"; // Cor mais escura (escala de cinza)
            button.style.color = "#fff"; // Deixa o texto branco para contraste
            button.style.cursor = "not-allowed"; // Muda o cursor para "não permitido"
        };
        
        li.appendChild(button);
        resultado.appendChild(li);
    });
}
