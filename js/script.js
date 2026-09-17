document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarUl = document.querySelector('.navbar ul');

    if (menuToggle && navbarUl) {
        menuToggle.addEventListener('click', function() {
            navbarUl.classList.toggle('active');
        });

        const menuLinks = document.querySelectorAll('.navbar ul a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navbarUl.classList.remove('active');
            });
        });
    }

    // Efeito Header ao Rolar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Formulário de Contato
    const contatoForm = document.querySelector('.contato-form');
    const nomeInput = document.querySelector('#nome');
    const emailInput = document.querySelector('#email');
    const assuntoInput = document.querySelector('#assunto');
    const mensagemInput = document.querySelector('#mensagem');
    const feedbackMsg = document.querySelector('#mensagem-feedback');

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    if (contatoForm) {
        contatoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const assunto = assuntoInput.value.trim();
            const mensagem = mensagemInput.value.trim();

            feedbackMsg.className = 'feedback-msg';
            feedbackMsg.textContent = '';

            if (nome === '' || email === '' || assunto === '' || mensagem === '') {
                feedbackMsg.textContent = 'Por favor, preencha todos os campos do formulário!';
                feedbackMsg.classList.add('erro');
                return;
            }

            if (!validarEmail(email)) {
                feedbackMsg.textContent = 'Por favor, insira um e-mail válido (exemplo: nome@dominio.com)!';
                feedbackMsg.classList.add('erro');
                return;
            }

            const btnSubmit = contatoForm.querySelector('button[type="submit"]');
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;

            // Disparo via EmailJS
            emailjs.sendForm('service_gmail', 'template_5exy6s6', this)
                .then(function() {
                    feedbackMsg.textContent = 'Mensagem enviada com sucesso! Verifique sua caixa de entrada.';
                    feedbackMsg.classList.add('sucesso');
                    contatoForm.reset();
                }, function(error) {
                    feedbackMsg.textContent = 'Erro ao enviar a mensagem. Tente novamente mais tarde.';
                    feedbackMsg.classList.add('erro');
                    console.error('Erro EmailJS:', error);
                })
                .finally(function() {
                    btnSubmit.textContent = 'Enviar Mensagem';
                    btnSubmit.disabled = false;
                });
        });
    }
});