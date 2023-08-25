document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.selecionar-tinta');
    const btnExcluirSelecionadas = document.querySelector('#excluir-selecionadas');
    const btnMoverSelecionadas = document.getElementById("mover-selecionadas");
    const selectDestinoEmMassa = document.getElementById("destino-em-massa");

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
