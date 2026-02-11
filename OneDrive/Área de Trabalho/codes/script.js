/* --- script.js --- */

// 1. FUNÇÕES PARA A JANELA DE MEMBROS
function abrirModal() {
    fecharSolicitacao(); // Garante que a outra janela fecha antes
    document.getElementById("modalMembros").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalMembros").style.display = "none";
}

// 2. FUNÇÕES PARA A JANELA DE NOVA SOLICITAÇÃO
function abrirSolicitacao() {
    fecharModal(); // Garante que a janela de membros fecha antes
    
    var modal = document.getElementById("nova-solicitacao");
    if (modal) {
        modal.style.display = "flex";
    } else {
        console.error("Erro: Não encontrei a div com id 'nova-solicitacao'");
    }
}

function fecharSolicitacao() {
    var modal = document.getElementById("nova-solicitacao");
    if (modal) {
        modal.style.display = "none";
    }
}

// 3. CONTROLO GERAL DE CLIQUES (Fechar ao clicar fora)
window.onclick = function(event) {
    var modalMembros = document.getElementById("modalMembros");
    var modalSolicitacao = document.getElementById("nova-solicitacao");

    // Se clicou no fundo escuro dos Membros - Fecha Membros
    if (event.target == modalMembros) {
        modalMembros.style.display = "none";
    }
    
    // Se clicou no fundo escuro da Solicitação - Fecha Solicitação
    if (event.target == modalSolicitacao) {
        modalSolicitacao.style.display = "none";
    }
}
function abrirAta() {
    document.getElementById("modalAta").style.display = "flex";
}