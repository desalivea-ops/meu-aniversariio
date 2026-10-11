/* =========================================================
   CONFIGURAÇÃO DO SUPABASE
   TALYTA: substitua os dois valores pelos dados do NOVO projeto.
========================================================= */


const SUPABASE_URL =
    "https://lqiktbpygkenrmpmnzcs.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_wjNqI9GIUP51Ri1B3GC3dA_hBieW2JR";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* =========================================================
   PRODUTOS
========================================================= */

const produtos = [
    { id: 1, nome: "Caixa metálica para instrumental — tamanho grande", preco: 100.00 },
    { id: 2, nome: "Afastadores de Minnesota", preco: 15.00 },
    { id: 3, nome: "Afastador de língua", preco: 34.00 },
    { id: 4, nome: "Cabo de bisturi nº 3 ou 7 — cabo redondo", preco: 10.00 },
    { id: 5, nome: "Descolador de Molt 2/4", preco: 63.00 },
    { id: 6, nome: "Descolador de Molt simples nº 9", preco: 60.00 },
    { id: 7, nome: "Sindesmótomo", preco: 19.00 },
    { id: 8, nome: "Jogo de alavancas Seldin — 1L, 1R e nº 2 reta", preco: 119.15 },
    { id: 9, nome: "Jogo de alavancas Heidbrink", preco: 124.15 },
    { id: 10, nome: "Fórceps 150", preco: 92.05 },
    { id: 11, nome: "Fórceps 151", preco: 92.05 },
    { id: 12, nome: "Fórceps 16", preco: 92.05 },
    { id: 13, nome: "Fórceps 17", preco: 92.05 },
    { id: 14, nome: "Fórceps 18 L", preco: 92.05 },
    { id: 15, nome: "Fórceps 18 R", preco: 92.05 },
    { id: 16, nome: "Fórceps 69", preco: 92.05 },
    { id: 17, nome: "Cureta de Lucas nº 86", preco: 28.12 },
    { id: 18, nome: "Lima para osso nº 12", preco: 58.19 },
    { id: 19, nome: "Pinça Collin", preco: 104.66 },
    { id: 20, nome: "Pinça Backhaus", preco: 57.22 },
    { id: 21, nome: "Pinça Allis", preco: 39.76 },
    { id: 22, nome: "Alveolótomo — pinça goiva", preco: 94.96 },
    { id: 23, nome: "Pinça hemostática curva", preco: 36.76 },
    { id: 24, nome: "Tesoura Metzenbaum", preco: 80.00 },
    { id: 25, nome: "Cubas metálicas", preco: 21.33 },
    { id: 26, nome: "Porta-agulha Mayo-Hegar", preco: 34.82 },
    { id: 27, nome: "Pinça anatômica denteada", preco: 18.91 },
    { id: 28, nome: "Tesoura Goldman Fox — reta", preco: 45.49 }
];


/* =========================================================
   IMAGENS
========================================================= */

const imagensProdutos = {
    1: "img/caixa.png",
    2: "img/afastador.png",
    3: "img/Afastador de língua.png",
    4: "img/cabo de bisturi.png",
    5: "img/Descolador de Molt 24.png",
    6: "img/Descolador de Molt simples nº 9.png",
    7: "img/Sindesmótomo.png",
    8: "img/Jogo de alavancas Seldin — 1L, 1R e nº 2 reta.png",
    9: "img/Jogo de alavancas Heidbrink.png",
    10: "img/Fórceps 150.png",
    11: "img/Fórceps 151.png",
    12: "img/Fórceps 16.png",
    13: "img/Fórceps 17.png",
    14: "img/Fórceps 18 L.png",
    15: "img/Fórceps 18 R.png",
    16: "img/Fórceps 69.png",
    17: "img/Cureta de Lucas nº 86.png",
    18: "img/Lima Para Osso Buck 11-12.png",
    19: "img/Pinça Collin.png",
    20: "img/Pinça Backhaus.png",
    21: "img/Pinça Allis.png",
    22: "img/Goiva Alexander.png",
    23: "img/Pinça hemostática curva.png",
    24: "img/Tesoura Metzenbaum Delicada Reta.png",
    25: "img/Cubas metálicas.png",
    26: "img/Porta Agulha Mayo Hegar.png",
    27: "img/Pinça anatômica denteada.png",
    28: "img/Tesoura Goldman Fox reta.png"
};


/* =========================================================
   PREÇOS DE COBRANÇA
   Estes são os valores enviados ao checkout.
========================================================= */

const precosCobranca = {
    1: 103.59,
    2: 15.97,
    3: 35.55,
    4: 10.81,
    5: 65.45,
    6: 62.35,
    7: 20.09,
    8: 123.33,
    9: 128.48,
    10: 95.39,
    11: 95.39,
    12: 95.39,
    13: 95.39,
    14: 95.39,
    15: 95.39,
    16: 95.39,
    17: 29.49,
    18: 60.49,
    19: 108.39,
    20: 59.49,
    21: 41.49,
    22: 98.39,
    23: 38.40,
    24: 80.00,
    25: 22.49,
    26: 36.40,
    27: 20.00,
    28: 47.40
};

function obterPrecoCobranca(produto) {
    if (!produto) return null;
    return precosCobranca[produto.id] ?? null;
}


/* =========================================================
   ESTADO DA PÁGINA
========================================================= */

let produtosReservados = [];
let produtoSelecionado = null;
let carregamentoEmAndamento = false;
let reservaEmAndamento = false;


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatarPreco(valor) {
    if (valor === null || valor === undefined) {
        return "Preço a definir";
    }

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   MENSAGENS DO FORMULÁRIO
========================================================= */

function mostrarMensagem(texto) {
    const elemento = document.getElementById("mensagem-modal");

    if (!elemento) {
        alert(texto);
        return;
    }

    elemento.textContent = texto;
    elemento.classList.remove("hidden");
}

function limparMensagem() {
    const elemento = document.getElementById("mensagem-modal");

    if (elemento) {
        elemento.textContent = "";
        elemento.classList.add("hidden");
    }
}


/* =========================================================
   CARREGAR STATUS DOS PRESENTES
========================================================= */

async function carregarProdutos() {
    const carregando = document.getElementById("carregando");
    const erroElemento = document.getElementById("erro");

    if (carregamentoEmAndamento) return;

    carregamentoEmAndamento = true;

    if (carregando) carregando.classList.remove("hidden");
    if (erroElemento) erroElemento.classList.add("hidden");

    try {
        const { data, error } = await supabaseClient
            .from("presentes")
            .select("id, status");

        if (error) throw error;

        if (!Array.isArray(data)) {
            throw new Error("O banco não retornou a lista de presentes.");
        }

        produtosReservados = data
            .filter(item => item.status !== "disponivel")
            .map(item => Number(item.id));

        renderizarProdutos();

    } catch (error) {
        console.error("Erro ao carregar presentes:", error);

        if (erroElemento) {
            erroElemento.classList.remove("hidden");
        }

    } finally {
        if (carregando) carregando.classList.add("hidden");
        carregamentoEmAndamento = false;
    }
}


/* =========================================================
   RENDERIZAR PRODUTOS
========================================================= */

function renderizarProdutos() {
    const container = document.getElementById("lista-produtos");

    if (!container) {
        console.error("Elemento #lista-produtos não encontrado no HTML.");
        return;
    }

    container.innerHTML = "";

    produtos.forEach(produto => {
        const reservado = produtosReservados.includes(produto.id);
        const preco = obterPrecoCobranca(produto);
        const imagem = imagensProdutos[produto.id];

        const card = document.createElement("div");
        card.className = `produto ${reservado ? "reservado" : ""}`;

        const nome = document.createElement("div");
        nome.className = "produto-nome";
        nome.textContent = produto.nome;

        const imagemContainer = document.createElement("div");
        imagemContainer.className = "produto-imagem";

        if (imagem) {
            const img = document.createElement("img");
            img.src = imagem;
            img.alt = produto.nome;
            img.loading = "lazy";

            img.onerror = () => {
                imagemContainer.innerHTML = "";
                imagemContainer.classList.add("produto-imagem-vazia");

                const texto = document.createElement("span");
                texto.textContent = "Imagem em breve";
                imagemContainer.appendChild(texto);
            };

            imagemContainer.appendChild(img);

        } else {
            imagemContainer.classList.add("produto-imagem-vazia");

            const texto = document.createElement("span");
            texto.textContent = "Imagem em breve";
            imagemContainer.appendChild(texto);
        }

        const precoElemento = document.createElement("div");
        precoElemento.className = "produto-preco";
        precoElemento.textContent = formatarPreco(preco);

        const botao = document.createElement("button");

        if (reservado) {
            botao.className = "btn-reservado";
            botao.disabled = true;
            botao.textContent = "✓ Já escolhido";
        } else {
            botao.className = "btn-escolher";
            botao.textContent = "Quero presentear";
            botao.addEventListener("click", () => abrirModal(produto.id));
        }

        card.append(nome, imagemContainer, precoElemento, botao);
        container.appendChild(card);
    });

    atualizarContador();
}


/* =========================================================
   CONTADOR DE PRESENTES DISPONÍVEIS
========================================================= */

function atualizarContador() {
    const contador = document.getElementById("contador");
    if (!contador) return;

    const disponiveis = produtos.filter(
        produto => !produtosReservados.includes(produto.id)
    ).length;

    contador.textContent = disponiveis;
}


/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirModal(id) {
    const produto = produtos.find(item => item.id === id);
    if (!produto) return;

    if (produtosReservados.includes(id)) {
        alert("Esse presente já foi escolhido por outra pessoa. 🩷");
        carregarProdutos();
        return;
    }

    produtoSelecionado = produto;

    const preco = obterPrecoCobranca(produto);
    const produtoModal = document.getElementById("produto-modal");

    if (produtoModal) {
        produtoModal.textContent =
            `${produto.nome} — ${formatarPreco(preco)}`;
    }

    const campoNome = document.getElementById("nome");
    const campoMensagem = document.getElementById("mensagem");

    if (campoNome) campoNome.value = "";
    if (campoMensagem) campoMensagem.value = "";

    // Limpa campos antigos, caso ainda existam no HTML.
    const campoEmail = document.getElementById("email");
    const campoCpf = document.getElementById("cpf");

    if (campoEmail) campoEmail.value = "";
    if (campoCpf) campoCpf.value = "";

    limparMensagem();

    document.getElementById("modal-reserva")?.classList.remove("hidden");

    setTimeout(() => campoNome?.focus(), 100);
}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {
    document.getElementById("modal-reserva")?.classList.add("hidden");
    produtoSelecionado = null;
}


/* =========================================================
   CRIAR CHECKOUT ASAAS
   A chave secreta fica somente nos Secrets do Supabase.
========================================================= */

async function criarCheckoutAsaas(nomePresente, valorPresente, produtoId) {
    const externalReference = `presente-${produtoId}-${Date.now()}`;

    const { data, error } = await supabaseClient.functions.invoke(
        "criar-pix",
        {
            body: {
                amount: Number(Number(valorPresente).toFixed(2)),
                description: nomePresente,
                external_reference: externalReference
            }
        }
    );

   if (error) {
console.error("Erro ao chamar criar-pix:", error);

let detalhes = error.message || "Erro desconhecido";

if (error.context && typeof error.context.clone === "function") {
    try {
        const resposta = await error.context.clone().json();
        console.error("Resposta detalhada do Supabase/Asaas:", resposta);

        detalhes = [
            resposta.error || resposta.erro || "",
            resposta.details
                ? JSON.stringify(resposta.details)
                : ""
        ].filter(Boolean).join(" — ") || detalhes;
    } catch (e) {
        console.error("Não foi possível ler a resposta HTTP:", e);
    }
}

throw new Error("Falha ao iniciar o pagamento: " + detalhes);

}
    if (!data.checkout_url) {
        console.error("Link de checkout ausente:", data);

        throw new Error("O Asaas não retornou o link de pagamento.");
    }

    return data;
}


/* =========================================================
   RESERVAR PRESENTE E ENCAMINHAR PARA O CHECKOUT
========================================================= */

async function reservarPresente(event) {
    event.preventDefault();

    if (reservaEmAndamento || !produtoSelecionado) return;

    const campoNome = document.getElementById("nome");
    const campoMensagem = document.getElementById("mensagem");
    const botao = document.getElementById("btn-confirmar");

    const nome = campoNome?.value.trim() || "";
    const mensagem = campoMensagem?.value.trim() || "";

    if (!nome) {
        mostrarMensagem("Por favor, informe seu nome.");
        campoNome?.focus();
        return;
    }

    const produtoId = produtoSelecionado.id;
    const nomePresente = produtoSelecionado.nome;
    const valorCobranca = obterPrecoCobranca(produtoSelecionado);

    if (valorCobranca === null) {
        mostrarMensagem("Este presente ainda não possui preço definido.");
        return;
    }

    reservaEmAndamento = true;

    if (botao) {
        botao.disabled = true;
        botao.textContent = "Gerando pagamento...";
    }

    limparMensagem();

    try {
        // Confere o estado atual do presente no banco.
        const { data: presenteAtual, error: consultaError } =
            await supabaseClient
                .from("presentes")
                .select("id, status")
                .eq("id", produtoId)
                .maybeSingle();

        if (consultaError) throw consultaError;

        if (!presenteAtual || presenteAtual.status !== "disponivel") {
            await carregarProdutos();

            throw new Error(
                "Esse presente já foi escolhido por outra pessoa. Escolha outro, por favor."
            );
        }

        // 1. Cria o checkout no Asaas.
        const checkout = await criarCheckoutAsaas(
            nomePresente,
            valorCobranca,
            produtoId
        );

        if (botao) botao.textContent = "Confirmando presente...";

        // 2. Registra a reserva por meio da função SQL segura.
        const { data, error } = await supabaseClient.rpc(
            "reservar_presente_com_pagamento",
            {
                p_presente_id: produtoId,
                p_nome: nome,
                p_mensagem: mensagem || null,
                p_pagamento_id: checkout.checkout_id,
                p_checkout_url: checkout.checkout_url
            }
        );

        if (error) {
            console.error("Erro ao gravar a reserva:", error);
            throw new Error(
                "O checkout foi criado, mas não conseguimos registrar a reserva. Não tente pagar novamente ainda; confira o estado do presente."
            );
        }

        const resultado = Array.isArray(data) ? data[0] : data;

        if (!resultado || resultado.success !== true) {
            throw new Error(
                resultado?.message ||
                resultado?.erro ||
                "Não foi possível confirmar a reserva. O pagamento ainda não foi confirmado."
            );
        }

        // 3. Atualiza a lista na página.
        if (!produtosReservados.includes(produtoId)) {
            produtosReservados.push(produtoId);
        }

        renderizarProdutos();
        fecharModal();

        // 4. Abre o checkout do Asaas.
        window.location.assign(checkout.checkout_url);

    } catch (error) {
        console.error("Erro no processo de reserva:", error);
        mostrarMensagem(
            error?.message ||
            "Não foi possível concluir a reserva. Tente novamente."
        );

        await carregarProdutos();

    } finally {
        reservaEmAndamento = false;

        if (botao) {
            botao.disabled = false;
            botao.textContent = "Confirmar presente";
        }
    }
}


/* =========================================================
   MODAL PIX ANTIGO
   O pagamento atual é feito no Checkout Asaas.
========================================================= */

function abrirTelaPix(nomePresente, valor) {
    const modalPix = document.getElementById("modal-pix");
    if (!modalPix) return;

    const descricao = document.getElementById("pix-descricao");
    const valorPix = document.getElementById("pix-valor");
    const qrCode = document.getElementById("pix-qr-code");
    const loading = document.getElementById("pix-qr-loading");
    const copiaArea = document.getElementById("pix-copia-area");
    const codigoPix = document.getElementById("pix-codigo");
    const status = document.getElementById("pix-status");

    if (descricao) {
        descricao.textContent =
            `O presente "${nomePresente}" foi selecionado.`;
    }

    if (valorPix) valorPix.textContent = formatarPreco(valor);

    if (qrCode) {
        qrCode.removeAttribute("src");
        qrCode.classList.add("hidden");
    }

    if (loading) {
        loading.textContent =
            "O pagamento será realizado no Checkout Asaas.";
        loading.classList.remove("hidden");
    }

    if (copiaArea) copiaArea.classList.add("hidden");
    if (codigoPix) codigoPix.value = "";
    if (status) status.textContent = "Aguardando pagamento no Asaas.";

    modalPix.classList.remove("hidden");
}

function fecharPix() {
    document.getElementById("modal-pix")?.classList.add("hidden");
}

function configurarBotaoCopiarPix() {
    const botao = document.getElementById("btn-copiar-pix");
    if (!botao) return;

    botao.addEventListener("click", async () => {
        const codigo = document.getElementById("pix-codigo")?.value;
        if (!codigo) return;

        try {
            await navigator.clipboard.writeText(codigo);
            botao.textContent = "Copiado ✓";

            setTimeout(() => {
                botao.textContent = "Copiar";
            }, 2000);

        } catch (error) {
            console.error("Erro ao copiar Pix:", error);
            alert("Não foi possível copiar o código.");
        }
    });
}


/* =========================================================
   EVENTOS
========================================================= */

const formularioReserva = document.getElementById("form-reserva");

if (formularioReserva) {
    formularioReserva.addEventListener("submit", reservarPresente);
} else {
    console.error("Formulário #form-reserva não encontrado no HTML.");
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharModal();
        fecharPix();
    }
});


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

configurarBotaoCopiarPix();
carregarProdutos();
