document.addEventListener("DOMContentLoaded", function () {
    const addTintaForm = document.getElementById('add-tinta-form');
    const tintaTable = document.getElementById('tinta-table');

    addTintaForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        // Capture os valores dos campos do formulário
        const nomeTinta = document.getElementById('nome-tinta').value;
        const quantidade = document.getElementById('quantidade').value;
        const dataAquisicao = document.getElementById('data-aquisicao').value;
        const localizacao = document.getElementById('localizacao').value;

        // Crie uma nova linha na tabela
        const newRow = tintaTable.insertRow();

        // Adicione células à nova linha
        const checkboxCell = newRow.insertCell(0);
        const nomeCell = newRow.insertCell(1);
        const quantidadeCell = newRow.insertCell(2);
        const localizacaoCell = newRow.insertCell(3);
        const dataAquisicaoCell = newRow.insertCell(4);

        // Preencha as células com os valores do formulário
        checkboxCell.innerHTML = '<input type="checkbox" class="selecionar-tinta">';
        nomeCell.textContent = nomeTinta;
        quantidadeCell.textContent = quantidade + ' kg';
        localizacaoCell.textContent = localizacao;
        dataAquisicaoCell.textContent = dataAquisicao;

        // Limpe o formulário
        addTintaForm.reset();
    });
});
