function navigateTo(page) {
    // Por enquanto, apenas mostra um alerta
    // Quando as páginas forem criadas, redirecionará para elas
    const pageNames = {
        'links.html': 'Links',
        'tutoriais.html': 'Tutoriais',
        'apks.html': 'Apks'
    };
    
    // Verifica se a página existe
    fetch(page, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = page;
            } else {
                alert(`A página ${pageNames[page]} será criada em breve!`);
            }
        })
        .catch(() => {
            alert(`A página ${pageNames[page]} será criada em breve!`);
        });
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

