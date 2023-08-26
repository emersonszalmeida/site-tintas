document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.selecionar-tinta');
    const btnExcluirSelecionadas = document.querySelector('#excluir-selecionadas');
    const btnMoverSelecionadas = document.getElementById("mover-selecionadas");
    const selectDestinoEmMassa = document.getElementById("destino-em-massa");
    const inputPesquisar = document.getElementById('pesquisar-tinta');
    const tabelaTintas = document.getElementById('tinta-table');
    const linhasTintas = tabelaTintas.getElementsByTagName('tr');

    inputPesquisar.addEventListener('input', function() {
        const termoPesquisa = inputPesquisar.value.toLowerCase();

        for (let i = 0; i < linhasTintas.length; i++) {
            const colunaNome = linhasTintas[i].getElementsByTagName('td')[1];

            if (colunaNome) {
                const nomeTinta = colunaNome.textContent.toLowerCase();
                if (nomeTinta.includes(termoPesquisa)) {
                    linhasTintas[i].style.display = '';
                } else {
                    linhasTintas[i].style.display = 'none';
                }
            }
        }
    });

    selectDestinoEmMassa.addEventListener('change', function () {
        const selectedCategory = selectDestinoEmMassa.value;
        
        for (let i = 0; i < linhasTintas.length; i++) {
            const colunaLocalizacao = linhasTintas[i].getElementsByTagName('td')[3];

            if (selectedCategory === 'todas' || colunaLocalizacao.textContent.toLowerCase() === selectedCategory) {
                linhasTintas[i].style.display = '';
            } else {
                linhasTintas[i].style.display = 'none';
            }
        }
    });



    btnMoverSelecionadas.addEventListener("click", function () {
        selectDestinoEmMassa.style.display = "inline-block";
        const selectedCategory = selectDestinoEmMassa.value;
        
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                const row = checkbox.parentNode.parentNode; // Obtém a linha da tabela
                const locationCell = row.querySelector("td:nth-child(4)"); // Obtém a célula de localização

                // Altera o texto da célula de localização para a categoria selecionada
                locationCell.textContent = selectedCategory;
            }
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarBotoes);
    });

    function atualizarBotoes() {
        const algumaSelecionada = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (algumaSelecionada) {
            btnExcluirSelecionadas.style.display = 'block';
            btnMoverSelecionadas.style.display = 'block';
             
        } else {
            btnExcluirSelecionadas.style.display = 'none';
            btnMoverSelecionadas.style.display = 'none';
            selectDestinoEmMassa.style.display = 'none';
        }
    }

    btnExcluirSelecionadas.addEventListener('click', function () {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const tintaRow = checkbox.closest('tr');
                tintaRow.remove();
            }
        });

        // Após a exclusão, atualize os botões
        atualizarBotoes();
    });
});
