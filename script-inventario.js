document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.selecionar-tinta');
    const btnExcluirSelecionadas = document.querySelector('#excluir-selecionadas');
    const btnMoverSelecionadas = document.querySelector('#mover-selecionadas');
    

    btnExcluirSelecionadas.addEventListener('click', function () {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const tintaRow = checkbox.closest('tr');
                tintaRow.remove();
            }
        });
    });

    btnMoverSelecionadas.addEventListener('click', function () {
        const destinoSelecionado = document.querySelector('#destino-em-massa').value; // Suponha que haja um elemento select para escolher o destino

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const tintaRow = checkbox.closest('tr');
                const nomeTinta = tintaRow.querySelector('td:nth-child(2)').textContent;
                const quantidade = tintaRow.querySelector('td:nth-child(3)').textContent;
                const localizacao = tintaRow.querySelector('td:nth-child(4)').textContent;
                const dataAquisicao = tintaRow.querySelector('td:nth-child(5)').textContent;

                const novaTintaRow = criarNovaLinhaTinta(nomeTinta, quantidade, localizacao, dataAquisicao, destinoSelecionado);
                tintaRow.insertAdjacentElement('beforebegin', novaTintaRow);

                tintaRow.remove();
            }
        });
    });

    function criarNovaLinhaTinta(nome, quantidade, localizacao, dataAquisicao, destino) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><input type="checkbox" class="selecionar-tinta"></td>
            <td>${nome}</td>
            <td>${quantidade}</td>
            <td>${localizacao}</td>
            <td>${dataAquisicao}</td>
        `;
        return novaLinha;
    }
});
