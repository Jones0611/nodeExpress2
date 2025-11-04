// POST
function enviarDados() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpfCadastro').value;

    fetch('pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, idade, cpf })
    })
    .then(response => response.json())
    .then(() => {
        // Limpa os inputs do formulário
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('cpfCadastro').value = '';
    });
}


// GET + PUT
function buscarDados() {
    const cpf = document.getElementById('cpfAtualizar').value;

    fetch('pessoas', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const pessoaEncontrada = data.find(pessoa => pessoa.cpf === cpf);

            if (pessoaEncontrada) {
                document.getElementById('nomeAtualizar').value = pessoaEncontrada.nome;
                document.getElementById('idadeAtualizar').value = pessoaEncontrada.idade;
                document.getElementById('cpfAtualizar').value = pessoaEncontrada.cpf;
                document.getElementById('id').value = pessoaEncontrada.id;
            } else {
                alert('Pessoa não encontrada!');
            }
        });
}


// PUT
function atualizarDados() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeAtualizar').value;
    const idade = document.getElementById('idadeAtualizar').value;
    const cpf = document.getElementById('cpfAtualizar').value;

    fetch(`pessoas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, idade, cpf })
    })
    .then(response => response.json())
    .then(() => {
        // Limpa os inputs do formulário
        document.getElementById('id').value = '';
        document.getElementById('nomeAtualizar').value = '';
        document.getElementById('idadeAtualizar').value = '';
        document.getElementById('cpfAtualizar').value = '';
    });
}


// DELETE
function deletarDados() {
    const cpf = document.getElementById('cpf').value;

    fetch('pessoas')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cpf').value = '';

            const pessoa = data.find(obj => obj.cpf === cpf);
            if (pessoa) {
                fetch(`pessoas/${pessoa.id}`, { method: 'DELETE' });
            } else {
                alert('CPF não encontrado!');
            }
        });
}


// GET
fetch('pessoas')
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById('tabela-corpo');
        tabela.innerHTML = ''; // limpa antes de preencher

        // Itera sobre o array retornado pela API
        data.forEach(objeto => {
            const linha = `
                <tr>
                    <td>${objeto.id}</td>
                    <td>${objeto.nome}</td>
                    <td>${objeto.idade}</td>
                    <td>${objeto.cpf}</td>
                </tr>`;
            tabela.innerHTML += linha;
        });
    });
