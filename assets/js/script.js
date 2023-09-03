document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('#add-tinta-form');
    const tintaList = document.querySelector('#tinta-list');
    const moverTintaButtons = document.querySelectorAll('.mover-tinta');
    const checkboxes = document.querySelectorAll('.selecionar-tinta');
    const checkboxSelecionarTodas = document.querySelector('#selecionar-todas');
    const btnAcaoEmMassa = document.querySelector('#acao-em-massa');

    function configurarFiltros() {
        const categoriaInput = document.querySelector('#categoria');
        const pesquisarTintaInput = document.querySelector('#pesquisar-tinta');
        const itensTinta = document.querySelectorAll('#tinta-list li');

        categoriaInput.addEventListener('change', filtrarTintas);
        pesquisarTintaInput.addEventListener('input', filtrarTintas);

        function filtrarTintas() {
            const categoriaSelecionada = categoriaInput.value;
            const termoPesquisa = pesquisarTintaInput.value.toLowerCase();

            itensTinta.forEach(itemTinta => {
                const nomeTinta = itemTinta.querySelector('h3').textContent.toLowerCase();
                const localizacao = itemTinta.querySelector('p:nth-child(3)').textContent.toLowerCase();

                const exibirPorCategoria = categoriaSelecionada === 'todas' || localizacao.includes(categoriaSelecionada);
                const exibirPorPesquisa = nomeTinta.includes(termoPesquisa);

                if (exibirPorCategoria && exibirPorPesquisa) {
                    itemTinta.style.display = 'block';
                } else {
                    itemTinta.style.display = 'none';
                }
            });
        }

        moverTintaButtons.forEach(button => {
            adicionarEventListenerMover(button);
        });

        filtrarTintas();
    }

    function adicionarEventListenerMover(botaoMover) {
        botaoMover.addEventListener('click', function () {
            const tintaItem = botaoMover.closest('li');
            const nomeTinta = tintaItem.querySelector('h3').textContent;
            const localizacaoAtual = tintaItem.querySelector('p:nth-child(3)').textContent;
            const quantidade = tintaItem.querySelector('p:nth-child(2)').textContent.replace('Quantidade: ', '');
            const dataAquisicao = tintaItem.querySelector('p:nth-child(4)').textContent.replace('Data de Aquisição: ', '');
            const destinoSelecionado = tintaItem.querySelector('.mover-para').value;

            // Remove a tinta da localização atual
            tintaItem.remove();

            // Cria um novo item de tinta na localização escolhida
            const novoItem = criarNovoItemTinta(nomeTinta, quantidade, destinoSelecionado, dataAquisicao);
            tintaList.appendChild(novoItem);

            // Associa o event listener ao novo botão de mover
            adicionarEventListenerMover(novoItem.querySelector('.mover-tinta'));

            configurarFiltros();
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (form.checkValidity()) {
            const nomeTinta = document.querySelector('#nome-tinta').value;
            const quantidade = document.querySelector('#quantidade').value;
            const localizacao = document.querySelector('#localizacao').value;
            const dataAquisicao = document.querySelector('#data-aquisicao').value;

            const novoItem = criarNovoItemTinta(nomeTinta, quantidade, localizacao, dataAquisicao);
            tintaList.appendChild(novoItem);

            // Associe o event listener de mover à nova tinta
            adicionarEventListenerMover(novoItem.querySelector('.mover-tinta'));

            form.reset();
            configurarFiltros();
        }
    });

    tintaList.addEventListener('click', function (event) {
        if (event.target.classList.contains('excluir-tinta')) {
            const tintaItem = event.target.closest('li');
            tintaItem.remove();

            configurarFiltros();
        }
    });
});

