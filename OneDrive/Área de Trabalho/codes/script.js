function abrirModal() {
        document.getElementById("modalMembros").style.display = "flex";
    }

    // Função para esconder a janela
    function fecharModal() {
        document.getElementById("modalMembros").style.display = "none";
    }

    // Fecha se clicar fora da janelinha branca
    window.onclick = function(event) {
        var modal = document.getElementById("modalMembros");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }