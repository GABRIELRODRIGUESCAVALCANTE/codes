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
    var modalAta = document.getElementById("Enviar-Ata");
    let modalCad = document.getElementById("modalCadastro");

    // Se clicou no fundo escuro dos Membros - Fecha Membros
    if (event.target == modalMembros) {
        modalMembros.style.display = "none";
    }
    
    // Se clicou no fundo escuro da Solicitação - Fecha Solicitação
    if (event.target == modalSolicitacao) {
        modalSolicitacao.style.display = "none";
    }
    
    // Se clicou no fundo escuro da Ata - Fecha Ata
    if (event.target == modalAta) {
        modalAta.style.display = "none";
    }
    if (event.target == modalCad) {
        modalCad.style.display = "none";
    }
}

function abrirAta() {
    var modalAta = document.getElementById("Enviar-Ata");
    if (modalAta) {
        modalAta.style.display = "flex";
    } else {
        console.error("Erro: Não encontrei a div com id 'Enviar-Ata'");
    }
    fecharModal(); // Fecha a janela de membros, se estiver aberta
    fecharSolicitacao(); // Fecha a janela de nova solicitação, se estiver aberta
}
function fecharAta() {
      var modal = document.getElementById("Enviar-Ata");
    if (modal) {
        modal.style.display = "none";
    }
}
 function alertaAta(){
    alert("Ata enviada com sucesso!");
 }
 function alertaSolicitacao(){
    alert("Solicitação enviada com sucesso!");
 }
function alertaMembros(){
    alert("Membros adicionados com sucesso!");
}
// Função para abrir o modal de Cadastro
function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "flex";
}

// Função para fechar
function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}

// Função simulada de salvar
function salvarCadastro() {
    alert("Usuário cadastrado com sucesso!");
    fecharCadastro();
}


