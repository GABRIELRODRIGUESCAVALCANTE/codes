/* --- script.js ATUALIZADO E LIMPO --- */

/* =================================================================================
   1. BANCOS DE DADOS FICTÍCIOS
   ================================================================================= */

const bancoDeDadosCCDS = {
    "Mondubim": {
        "CCDS Mondubim 1 - Santa Rita": [
            { nome: "Carlos Almeida", cargo: "Presidente", telefone: "(85) 99999-1111" },
            { nome: "Ana Paula", cargo: "Secretária", telefone: "(85) 98888-2222" }
        ],
        "CCDS Mondubim 2 - Parque Santana": [
            { nome: "Roberto Costa", cargo: "Presidente", telefone: "(85) 97777-3333" },
            { nome: "Julia Lima", cargo: "Tesoureira", telefone: "(85) 96666-4444" }
        ]
    },
    "Centro": {
        "CCDS Centro Histórico": [
            { nome: "Mariana Souza", cargo: "Presidente", telefone: "(85) 95555-5555" },
            { nome: "Pedro Henrique", cargo: "Vice-Presidente", telefone: "(85) 94444-6666" },
            { nome: "Lucas Mendes", cargo: "Assessor", telefone: "(85) 93333-7777" }
        ]
    },
    "Barra do Ceará": {
        "CCDS Barra 1": [
            { nome: "Fernanda Alves", cargo: "Presidente", telefone: "(85) 92222-8888" }
        ]
    }
};

const bancoDeDadosAtas = {
    "CCDS Mondubim 1 - Santa Rita": [
        { id: 1, data: "12/02/2026", assunto: "Reunião Mensal", status: "Pendente" },
        { id: 2, data: "15/01/2026", assunto: "Planejamento Anual", status: "Aprovada" }
    ],
    "CCDS Centro Histórico": [
        { id: 3, data: "10/02/2026", assunto: "Segurança na Praça", status: "Pendente" }
    ]
};

const bancoSolicitacoes = [
    { id: 1, nome: "Maria das Dores", data: "12/02/2026", assunto: "Iluminação pública queimada na Rua B", status: "Pendente" },
    { id: 2, nome: "José Carlos", data: "10/02/2026", assunto: "Denúncia de som alto bar do Zé", status: "Em Andamento" },
    { id: 3, nome: "Ana Paula", data: "05/02/2026", assunto: "Solicitação de poda de árvore", status: "Concluído" },
    { id: 4, nome: "Roberto Firmino", data: "01/02/2026", assunto: "Informação sobre cadastro CCDS", status: "Concluído" }
];


/* =================================================================================
   2. CONTROLE DE JANELAS (ABRIR E FECHAR MODAIS)
   ================================================================================= */

// Função mestre que fecha tudo antes de abrir uma nova
function fecharTodasAsJanelas() {
    const ids = ["modalMembros", "nova-solicitacao", "Enviar-Ata", "modalCadastro", "modalVerSolicitacoes"];
    ids.forEach(id => {
        const div = document.getElementById(id);
        if(div) div.style.display = "none";
    });
}

// --- Funções de Abrir ---

function abrirModal() {
    fecharTodasAsJanelas();
    const modal = document.getElementById("modalMembros");
    if(modal) {
        modal.style.display = "flex";
        carregarBairrosNoSelect(); 
    }
}

function abrirSolicitacao() {
    fecharTodasAsJanelas();
    const modal = document.getElementById("nova-solicitacao");
    if(modal) modal.style.display = "flex";
}

function abrirAta() {
    fecharTodasAsJanelas();
    carregarBairrosAtas();
    const modal = document.getElementById("Enviar-Ata");
    if(modal) modal.style.display = "flex";
}

function abrirCadastro() {
    fecharTodasAsJanelas();
    const modal = document.getElementById("modalCadastro");
    if(modal) modal.style.display = "flex";
}

function abrirVerSolicitacoes() {
    fecharTodasAsJanelas();
    const modal = document.getElementById("modalVerSolicitacoes");
    if(modal) {
        modal.style.display = "flex";
        listarSolicitacoes(); 
    }
}

// --- Funções de Fechar (Individuais) ---
function fecharModal() { document.getElementById("modalMembros").style.display = "none"; }
function fecharSolicitacao() { document.getElementById("nova-solicitacao").style.display = "none"; }
function fecharAta() { document.getElementById("Enviar-Ata").style.display = "none"; }
function fecharCadastro() { document.getElementById("modalCadastro").style.display = "none"; }
function fecharVerSolicitacoes() { document.getElementById("modalVerSolicitacoes").style.display = "none"; }

// --- Alertas ---
function alertaSolicitacao() {
    alert("Solicitação enviada com sucesso!");
    fecharSolicitacao();
}


/* =================================================================================
   3. LÓGICA DE MEMBROS (FILTROS E TABELA)
   ================================================================================= */

function carregarBairrosNoSelect() {
    const selectBairro = document.getElementById("filtro-bairro");
    if(!selectBairro) return; 
    selectBairro.innerHTML = '<option value="">-- Escolha o Bairro --</option>';
    for (let bairro in bancoDeDadosCCDS) {
        let option = document.createElement("option");
        option.value = bairro;
        option.text = bairro;
        selectBairro.appendChild(option);
    }
}

function carregarOpcoesCCDS() {
    const bairroSelecionado = document.getElementById("filtro-bairro").value;
    const selectCCDS = document.getElementById("filtro-ccds");
    const tbody = document.getElementById("corpo-tabela");

    selectCCDS.innerHTML = '<option value="">-- Escolha o CCDS --</option>';
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Selecione um CCDS...</td></tr>';

    if (bairroSelecionado && bancoDeDadosCCDS[bairroSelecionado]) {
        selectCCDS.disabled = false;
        const listaCCDS = bancoDeDadosCCDS[bairroSelecionado];
        for (let nomeCCDS in listaCCDS) {
            let option = document.createElement("option");
            option.value = nomeCCDS;
            option.text = nomeCCDS;
            selectCCDS.appendChild(option);
        }
    } else {
        selectCCDS.disabled = true;
    }
}

function listarMembrosNaTabela() {
    const bairro = document.getElementById("filtro-bairro").value;
    const ccds = document.getElementById("filtro-ccds").value;
    const tbody = document.getElementById("corpo-tabela");
    tbody.innerHTML = "";

    if (bairro && ccds && bancoDeDadosCCDS[bairro][ccds]) {
        const membros = bancoDeDadosCCDS[bairro][ccds];
        membros.forEach(membro => {
            let row = `
                <tr>
                    <td>${membro.nome}</td>
                    <td>${membro.cargo}</td>
                    <td>${membro.telefone}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhum membro encontrado.</td></tr>';
    }
}


/* =================================================================================
   4. LÓGICA DE ATAS
   ================================================================================= */

function carregarBairrosAtas() {
    const selectBairro = document.getElementById("filtro-bairro-ata");
    if(!selectBairro) return;
    selectBairro.innerHTML = '<option value="">-- Escolha o Bairro --</option>';
    for (let bairro in bancoDeDadosCCDS) {
        let option = document.createElement("option");
        option.value = bairro;
        option.text = bairro;
        selectBairro.appendChild(option);
    }
}

function carregarOpcoesCCDSAtas() {
    const bairro = document.getElementById("filtro-bairro-ata").value;
    const selectCCDS = document.getElementById("filtro-ccds-ata");
    const tbody = document.getElementById("lista-atas-corpo");
    
    selectCCDS.innerHTML = '<option value="">-- Escolha o CCDS --</option>';
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Aguardando seleção...</td></tr>';
    
    if (bairro && bancoDeDadosCCDS[bairro]) {
        selectCCDS.disabled = false;
        for (let nomeCCDS in bancoDeDadosCCDS[bairro]) {
            let option = document.createElement("option");
            option.value = nomeCCDS;
            option.text = nomeCCDS;
            selectCCDS.appendChild(option);
        }
    } else {
        selectCCDS.disabled = true;
    }
}

function listarAtas() {
    const ccdsSelecionado = document.getElementById("filtro-ccds-ata").value;
    const tbody = document.getElementById("lista-atas-corpo");
    tbody.innerHTML = "";
    
    if (ccdsSelecionado && bancoDeDadosAtas[ccdsSelecionado]) {
        const atas = bancoDeDadosAtas[ccdsSelecionado];
        atas.forEach(ata => {
            let linha = `
                <tr>
                    <td>
                        <strong>${ata.data}</strong><br>
                        <small>${ata.assunto}</small>
                    </td>
                    <td>${ata.status}</td>
                    <td style="text-align: center;">
                        <button class="btn-acao btn-visualizar" onclick="acaoAta('Visualizar', '${ata.assunto}')">👁️</button>
                        <button class="btn-acao btn-aprovar" onclick="acaoAta('Aprovar', '${ata.assunto}')">✅</button>
                        <button class="btn-acao btn-reprovar" onclick="acaoAta('Reprovar', '${ata.assunto}')">❌</button>
                    </td>
                </tr>`;
            tbody.innerHTML += linha;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhuma ata encontrada.</td></tr>';
    }
}

function acaoAta(acao, assunto) {
    if (acao === 'Visualizar') alert(`Abrindo PDF: ${assunto}`);
    else if (acao === 'Aprovar') confirm(`Aprovar ata "${assunto}"?`) && alert("Aprovada!");
    else if (acao === 'Reprovar') prompt("Motivo da reprovação:");
}


/* =================================================================================
   5. LÓGICA DE VER SOLICITAÇÕES
   ================================================================================= */

function listarSolicitacoes() {
    const filtro = document.getElementById("filtro-status-solicitacao").value;
    const tbody = document.getElementById("lista-solicitacoes-corpo");
    tbody.innerHTML = "";

    bancoSolicitacoes.forEach(sol => {
        if (filtro !== "todos" && sol.status !== filtro) return;

        let corBadge = "badge-pendente";
        if(sol.status === "Em Andamento") corBadge = "badge-andamento";
        if(sol.status === "Concluído") corBadge = "badge-concluido";

        let linha = `
            <tr>
                <td>
                    <strong>${sol.nome}</strong><br>
                    <small style="color:#666;">${sol.data}</small>
                </td>
                <td>${sol.assunto}</td>
                <td><span class="badge ${corBadge}">${sol.status}</span></td>
                <td style="text-align: center;">
                    <button class="btn-acao btn-visualizar" onclick="verDetalheSolicitacao(${sol.id})">👁️</button>
                </td>
            </tr>`;
        tbody.innerHTML += linha;
    });

    if(tbody.innerHTML === "") {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhuma solicitação encontrada.</td></tr>';
    }
}

function verDetalheSolicitacao(id) {
    const solicitacao = bancoSolicitacoes.find(s => s.id === id);
    if(solicitacao) {
        alert(`DETALHES:\nNome: ${solicitacao.nome}\nData: ${solicitacao.data}\nStatus: ${solicitacao.status}\nDescrição: ${solicitacao.assunto}`);
    }
}


/* =================================================================================
   6. LÓGICA DE CEP (BRASIL API v2)
   ================================================================================= */

function pesquisarCep() {
    // Limpa o CEP (deixa só números)
    var cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep !== "" && /^[0-9]{8}$/.test(cep)) {
        // Feedback visual
        document.getElementById('rua').value = "...";
        document.getElementById('bairro').value = "...";
        document.getElementById('cidade').value = "...";
        document.getElementById('uf').value = "...";

        fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then(res => { 
                if(!res.ok) throw new Error(); 
                return res.json(); 
            })
            .then(conteudo => {
                document.getElementById('rua').value = conteudo.street;
                document.getElementById('bairro').value = conteudo.neighborhood;
                document.getElementById('cidade').value = conteudo.city;
                document.getElementById('uf').value = conteudo.state;
                document.getElementById('numero').focus();
            })
            .catch(() => {
                limparFormularioCep();
                document.getElementById('rua').placeholder = "CEP não encontrado. Digite a rua...";
                document.getElementById('rua').focus();
            });
    } else {
        limparFormularioCep();
    }
}

function limparFormularioCep() {
    const campos = ['rua', 'bairro', 'cidade', 'uf'];
    campos.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.value = "";
            el.placeholder = "";
        }
    });
}


/* =================================================================================
   7. GERAL - FECHAR AO CLICAR FORA
   ================================================================================= */
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = "none";
    }
}