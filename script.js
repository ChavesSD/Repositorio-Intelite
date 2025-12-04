function navigateTo(page) {
    // Redireciona diretamente para a página
    // Funciona tanto com arquivos locais (file://) quanto com servidor web (http://)
    window.location.href = page;
}

// Adiciona animação de entrada aos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

