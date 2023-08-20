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

    filtrarTintas();
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#add-tinta-form');
    const tintaList = document.querySelector('#tinta-list');
    const moverTintaButtons = document.querySelectorAll('.mover-tinta');

    function criarNovoItemTinta(nomeTinta, quantidade, localizacao, dataAquisicao) {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = `
            <h3>${nomeTinta}</h3>
            <p>Quantidade: ${quantidade} kg</p>
            <p>Localização: ${localizacao}</p>
            <p>Data de Aquisição: ${dataAquisicao}</p>
            <button class="excluir-tinta">Excluir</button>
            <select class="mover-para">
                <option value="carrossel">Carrossel</option>
                <option value="garra">Garra</option>
                <option value="mesa-termica">Mesa Térmica</option>
                <option value="prateleira">Prateleira</option>
            </select>
            <button class="mover-tinta">Mover</button>
        `;

        return novoItem;
    }

    moverTintaButtons.forEach(button => {
        adicionarEventListenerMover(button);
    });

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

            adicionarEventListenerMover(novoItem.querySelector('.mover-tinta')); // Associa o event listener ao novo botão de mover

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

            moverTintaButtons.forEach(button => {
                adicionarEventListenerMover(button);
            });

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

    configurarFiltros();
});
