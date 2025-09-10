const lessons = [
    {
        id: 1,
        title: "Elementos HTML Básicos",
        completed: false,
        isPremium: false,
        xp: 100,
        steps: [
            {
                type: 'info',
                content: "Bem-vindo ao HTML! A tag `<h1>` é usada para criar o título principal de uma página. É a tag de título mais importante.",
                codeExample: `<h1>Meu Primeiro Título</h1>`
            },
            {
                type: 'info',
                content: "Para parágrafos de texto, usamos a tag `<p>`. Você pode ter quantos parágrafos quiser em uma página.",
                codeExample: `<p>Este é um parágrafo de exemplo.</p>\n<p>Este é outro parágrafo.</p>`
            },
            {
                type: 'challenge',
                challengeType: 'code',
                question: "Agora é sua vez! Crie um parágrafo que diga 'Olá, Mundo!'.",
                answer: "<p>Olá, Mundo!</p>"
            }
        ]
    },
    {
        id: 2,
        title: "Cores em CSS",
        completed: false,
        isPremium: false,
        xp: 100,
        steps: [
            {
                type: 'info',
                content: "CSS (Cascading Style Sheets) é usado para estilizar o HTML. A propriedade `color` muda a cor do texto de um elemento.",
                codeExample: `<p style="color: blue;">Este texto é azul.</p>`
            },
            {
                type: 'info',
                content: "As cores podem ser escritas por nome (como 'red', 'green') ou usando códigos hexadecimais, que começam com um `#`. Por exemplo, `#FF5733` é um tom de laranja.",
                codeExample: `<h1 style="color: #FF5733;">Título Laranja</h1>`
            },
            {
                type: 'challenge',
                challengeType: 'quiz',
                question: "Qual propriedade CSS é usada para alterar a cor do texto?",
                options: ["background-color", "font-color", "color", "text-color"],
                answer: "color"
            }
        ]
    },
     {
        id: 3,
        title: "Estrutura de Links",
        completed: false,
        isPremium: false,
        xp: 100,
        steps: [
            {
                type: 'info',
                content: "Links são fundamentais na web. Em HTML, criamos links com a tag `<a>`, que significa 'âncora'.",
                codeExample: `<a>Isso ainda não é um link.</a>`
            },
            {
                type: 'info',
                content: "Para que o link funcione, ele precisa do atributo `href`, que especifica o URL de destino.",
                codeExample: `<a href="https://www.google.com">Ir para o Google</a>`
            },
            {
                type: 'challenge',
                challengeType: 'quiz',
                question: "Qual atributo define o destino de um link na tag `<a>`?",
                options: ["src", "link", "target", "href"],
                answer: "href"
            }
        ]
    },
    {
        id: 4,
        title: "Introdução a JavaScript (Premium)",
        completed: false,
        isPremium: true,
        xp: 200,
        steps: [
            {
                type: 'info',
                content: "JavaScript é a linguagem que dá vida e interatividade às suas páginas web. É aqui que a mágica acontece!",
                codeExample: `alert("Olá, mundo!"); // Isso exibe uma mensagem`
            },
            {
                type: 'info',
                content: "Você pode adicionar scripts em um arquivo .js separado ou diretamente na tag `<script>` no seu HTML.",
                codeExample: `<body>\n <script>\n  // Seu código JavaScript aqui\n </script>\n</body>`
            },
            {
                type: 'challenge',
                challengeType: 'code',
                question: "Escreva o código JavaScript para exibir a mensagem 'Eu amo programar!'",
                answer: `alert('Eu amo programar!');`
            }
        ]
    }
];

let currentLessonId = null;
let currentStepIndex = 0;
let streak = 0;
let userXP = 0;
let isPremium = false;

const views = {
    dashboard: document.getElementById('dashboard-view'),
    lesson: document.getElementById('lesson-view'),
    completion: document.getElementById('completion-view'),
    premium: document.getElementById('premium-view')
};

function showView(viewName) {
    Object.values(views).forEach(view => view.style.display = 'none');
    views[viewName].style.display = 'block';
}

function calculateLevel(xp) {
    return Math.floor(xp / 100) + 1;
}

function updateProgress() {
    const completedLessons = lessons.filter(l => l.completed).length;
    const totalLessons = lessons.length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const currentLevel = calculateLevel(userXP);
    const xpForNextLevel = (currentLevel * 100);
    const xpInCurrentLevel = userXP - (currentLevel - 1) * 100;

    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').innerText = `${Math.round(progress)}% Completo`;
    document.getElementById('streak-counter').innerText = streak;
    document.getElementById('user-level').innerText = currentLevel;
    document.getElementById('user-level-text').innerText = currentLevel;
    document.getElementById('xp-bar').style.width = `${(xpInCurrentLevel / 100) * 100}%`;
    document.getElementById('xp-text').innerText = `${xpInCurrentLevel}/${xpForNextLevel} XP`;
}

function renderDashboard() {
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = '';

    document.getElementById('premium-ad-card').style.display = isPremium ? 'none' : 'flex';

    let previousLessonCompleted = true;

    lessons.forEach(lesson => {
        const isLocked = !previousLessonCompleted || (lesson.isPremium && !isPremium);
        
        const lessonCard = document.createElement('button');
        lessonCard.className = `w-full text-left p-4 rounded-lg border-2 transition-transform transform hover:scale-105 flex items-center justify-between`;
        
        let cardClasses = 'bg-white border-stone-200';
        if (lesson.completed) {
            cardClasses = 'lesson-card-completed';
        } else if(isLocked) {
            cardClasses = 'lesson-card-locked';
        }

        lessonCard.classList.add(...cardClasses.split(' '));

        let icon = lesson.completed ? '✅' : (isLocked ? '🔒' : '📖');
        if (lesson.isPremium && !isPremium) {
            icon = '💎';
        }

        const iconSpan = document.createElement('span');
        iconSpan.className = "text-2xl mr-4";
        iconSpan.innerText = icon;

        const titleSpan = document.createElement('span');
        titleSpan.className = "font-bold";
        titleSpan.innerText = lesson.title;

        const arrowSpan = document.createElement('span');
        arrowSpan.className = "text-xl font-bold text-amber-600 opacity-70";
        arrowSpan.innerHTML = "&gt;";

        const textDiv = document.createElement('div');
        textDiv.appendChild(iconSpan);
        textDiv.appendChild(titleSpan);

        lessonCard.appendChild(textDiv);
        lessonCard.appendChild(arrowSpan);
        
        if (!isLocked) {
            lessonCard.onclick = () => startLesson(lesson.id);
        } else {
            lessonCard.disabled = true;
        }
        
        lessonsContainer.appendChild(lessonCard);
        
        if (!lesson.completed) {
            previousLessonCompleted = false;
        }
    });

    updateProgress();
}

function startLesson(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson.isPremium && !isPremium) {
        return;
    }
    currentLessonId = lessonId;
    currentStepIndex = 0;
    showView('lesson');
    renderStep();
}

function renderStep() {
    const lesson = lessons.find(l => l.id === currentLessonId);
    const step = lesson.steps[currentStepIndex];

    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-content').innerText = step.content || '';
    
    const codeExampleEl = document.getElementById('lesson-code-example');
    if (step.codeExample) {
        codeExampleEl.innerHTML = `<div class="code-block">${step.codeExample.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`;
    } else {
        codeExampleEl.innerHTML = '';
    }

    const challengeArea = document.getElementById('challenge-area');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    
    challengeArea.innerHTML = '';
    checkAnswerBtn.style.display = 'none';
    nextStepBtn.style.display = 'inline-block';
    document.getElementById('feedback-message').innerText = '';

    if (step.type === 'challenge') {
        checkAnswerBtn.style.display = 'inline-block';
        nextStepBtn.style.display = 'none';
        challengeArea.innerHTML = `<h3 class="font-bold mb-2">${step.question}</h3>`;

        if (step.challengeType === 'code') {
            challengeArea.innerHTML += `<textarea id="code-answer" class="w-full p-2 border rounded-md font-mono bg-stone-50" rows="3"></textarea>`;
        } else if (step.challengeType === 'quiz') {
            let optionsHTML = '<div class="space-y-2">';
            step.options.forEach(option => {
                optionsHTML += `
                    <div>
                        <input type="radio" id="${option}" name="quiz" value="${option}" class="mr-2">
                        <label for="${option}">${option}</label>
                    </div>
                `;
            });
            optionsHTML += '</div>';
            challengeArea.innerHTML += optionsHTML;
        }
    }

    document.getElementById('prev-step-btn').style.visibility = currentStepIndex > 0 ? 'visible' : 'hidden';
    document.getElementById('step-indicator').innerText = `Passo ${currentStepIndex + 1} de ${lesson.steps.length}`;
}

function navigateStep(direction) {
    const lesson = lessons.find(l => l.id === currentLessonId);
    const newIndex = currentStepIndex + direction;

    if (newIndex >= 0 && newIndex < lesson.steps.length) {
        currentStepIndex = newIndex;
        renderStep();
    }
}

function checkAnswer() {
    const lesson = lessons.find(l => l.id === currentLessonId);
    const step = lesson.steps[currentStepIndex];
    const feedback = document.getElementById('feedback-message');
    let isCorrect = false;

    if (step.challengeType === 'code') {
        const userAnswer = document.getElementById('code-answer').value.trim();
        const correctAnswer = step.answer;
        if (userAnswer.replace(/\s+/g, ' ').toLowerCase() === correctAnswer.replace(/\s+/g, ' ').toLowerCase()) {
            isCorrect = true;
        }
    } else if (step.challengeType === 'quiz') {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption && selectedOption.value === step.answer) {
            isCorrect = true;
        }
    }
    
    if (isCorrect) {
        feedback.innerText = 'Correto! Bom trabalho.';
        feedback.className = 'text-center mt-4 h-5 text-green-600';
        if (!lesson.completed) {
            userXP += lesson.xp;
        }
        lesson.completed = true;
        streak++;
        setTimeout(() => {
           showView('completion');
        }, 1000);
    } else {
        feedback.innerText = 'Tente novamente!';
        feedback.className = 'text-center mt-4 h-5 text-red-600';
    }
}

function goHome() {
    showView('dashboard');
    renderDashboard();
}

function showPremiumView() {
    showView('premium');
}

function buyPremium() {
    isPremium = true;
    document.getElementById('premium-feedback').innerText = "Compra de Premium concluída! Recarregando para aplicar as alterações.";
    setTimeout(() => {
        goHome();
    }, 2000);
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    goHome();
});
