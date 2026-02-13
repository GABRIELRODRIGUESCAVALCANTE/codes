/* --- script.js --- */

// 1. FUNÇÕES PARA A JANELA DE MEMBROS
function abrirModal() {
    fecharSolicitacao();
    fecharAta();
    fecharCadastro();
    document.getElementById("modalMembros").style.display = "flex";
}

function fecharModal() {
    var modal = document.getElementById("modalMembros");
    if(modal) modal.style.display = "none";
}

// 2. FUNÇÕES PARA A JANELA DE NOVA SOLICITAÇÃO
function abrirSolicitacao() {
    fecharModal();
    fecharAta();
    fecharCadastro();
    
    var modal = document.getElementById("nova-solicitacao");
    if (modal) {
        modal.style.display = "flex";
    }
}

function fecharSolicitacao() {
    var modal = document.getElementById("nova-solicitacao");
    if (modal) {
        modal.style.display = "none";
    }
}

// 3. FUNÇÕES PARA A JANELA DE ATA
function abrirAta() {
    fecharModal();
    fecharSolicitacao();
    fecharCadastro();

    var modalAta = document.getElementById("Enviar-Ata");
    if (modalAta) {
        modalAta.style.display = "flex";
    }
}

function fecharAta() {
    var modal = document.getElementById("Enviar-Ata");
    if (modal) {
        modal.style.display = "none";
    }
}

// 4. FUNÇÕES PARA A JANELA DE CADASTRO
function abrirCadastro() {
    fecharModal();
    fecharSolicitacao();
    fecharAta();
    
    var modal = document.getElementById("modalCadastro");
    if(modal) modal.style.display = "flex";
}

function fecharCadastro() {
    var modal = document.getElementById("modalCadastro");
    if(modal) modal.style.display = "none";
}

// 5. ALERTA E SALVAMENTO SIMULADO
function alertaAta(){
    alert("Ata enviada com sucesso!");
    fecharAta();
}
function alertaSolicitacao(){
    alert("Solicitação enviada com sucesso!");
    fecharSolicitacao();
}
function alertaMembros(){
    alert("Membros adicionados com sucesso!");
}
function salvarCadastro() {
    alert("Usuário cadastrado com sucesso!");
    fecharCadastro();
}

// 6. CONTROLO GERAL DE CLIQUES (Fechar ao clicar fora)
window.onclick = function(event) {
    var modalMembros = document.getElementById("modalMembros");
    var modalSolicitacao = document.getElementById("nova-solicitacao");
    var modalAta = document.getElementById("Enviar-Ata");
    var modalCad = document.getElementById("modalCadastro");

    if (event.target == modalMembros) {
        modalMembros.style.display = "none";
    }
    if (event.target == modalSolicitacao) {
        modalSolicitacao.style.display = "none";
    }
    if (event.target == modalAta) {
        modalAta.style.display = "none";
    }
    if (event.target == modalCad) {
        modalCad.style.display = "none";
    }
}

/* --- SISTEMA DE BUSCA DE CEP (VERSÃO MODERNA - FETCH) --- */
function pesquisarCep() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            // Preenche com "..." enquanto carrega
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            // Tenta buscar na API
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(conteudo => {
                    if (!("erro" in conteudo)) {
                        // SUCESSO: Preenche automático
                        document.getElementById('rua').value = conteudo.logradouro;
                        document.getElementById('bairro').value = conteudo.bairro;
                        document.getElementById('cidade').value = conteudo.localidade;
                        document.getElementById('uf').value = conteudo.uf;
                        document.getElementById('numero').focus();
                    } else {
                        // ERRO: CEP não encontrado -> Libera para digitar
                        limparFormularioCep();
                        alert("CEP não encontrado automaticamente. Por favor, preencha o endereço manualmente.");
                        document.getElementById('rua').focus(); // Joga o foco para a pessoa digitar
                    }
                })
                .catch(error => {
                    // ERRO DE REDE -> Libera para digitar
                    limparFormularioCep();
                    console.log(error);
                    alert("Não foi possível buscar o CEP. Por favor, preencha manualmente.");
                    document.getElementById('rua').focus();
                });
        } else {
            limparFormularioCep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limparFormularioCep();
    }
}

function limparFormularioCep() {
    // Limpa os campos para o usuário poder escrever do zero
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}
