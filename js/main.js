
$(window).on("load",function(){
    /*--------------------- carregamento -----------------------*/
    $(".preloader").fadeOut("slow");
});


$(document).ready(function() {
    /*--------------------- navbar encolher ------------------*/
    $(window).on("scroll",function(){
        if($(this).scrollTop() > 90){
            $(".navbar").addClass("navbar-shrink");
        }
        else{
            $(".navbar").removeClass("navbar-shrink");
        }
    }); 

    /*--------------------- video popup -----------------------*/
    const videoSrc = $("#player-1").attr("src");
    $(".video-play-btn, .video-popup").on("click", function(){
        if($(".video-popup").hasClass("open")){
            $(".video-popup").removeClass("open");
            $("#player-1").attr("src","");
        }
        else{
            $(".video-popup").addClass("open");
            if($("#player-1").attr("src")==''){
                $("#player-1").attr("src",videoSrc);
            }
        }
    });

    /*---------------------- features carousel ----------------- */

    $('.features-carousel').owlCarousel({
        loop:true,
        margin:0,
        autoplay:false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    });

     /*---------------------- exemplo carousel ----------------- */

     $('.screenshots-carousel').owlCarousel({
        loop:false,
        margin:0,
        responsiveClass:false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:4,
            }
        }
    });


    /*---------------------- equipe carousel ----------------- */

    $('.team-carousel').owlCarousel({
        loop:false,
        margin:0,
        responsiveClass:false,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    });
    /*---------------------- scroll das paginas - Scrollit ---------------- */
    $.scrollIt({
        topOffset: -50
    });

    /*---------------------- NAVBAR COLLAPSE                -- ---------------- */
    $(".nav-link").on("click", function(){
        $(".navbar-collapse").collapse("hide");
    });

    /*---------------------- ativar dark mode ---------------- */
    function toggleTheme(){
        if(localStorage.getItem("recolors-theme") !== null){
            if(localStorage.getItem("recolors-theme") === "dark"){
                $("body").addClass("dark");
            }
            else{
                $("body").removeClass("dark");
            }
        }
        updateIcon();
    }
    toggleTheme();

    $(".toggle-theme").on("click",function(){
        $("body").toggleClass("dark");
        if($("body").hasClass("dark")){
            localStorage.setItem("recolors-theme","dark")
        }
        else{
            localStorage.setItem("recolors-theme","light")
        }
        updateIcon();
    });
    function updateIcon(){
        if($("body").hasClass("dark")){
            $(".toggle-theme i").removeClass("fa-moon");
            $(".toggle-theme i").addClass("fa-sun");
        }
        else{
            $(".toggle-theme i").removeClass("fa-sun");
            $(".toggle-theme i").addClass("fa-moon");
        }
    }






    /*---------------------- Alteração de Imagem ---------------- */
    const imagePaths = [
        '6_orange_darkgreen.jpg',
        '8_orange_darkgreen.jpg',
        '29_orange_darkgreen.jpg',
        '57_orange_darkgreen.jpg',
        '5_green_yellow_red.jpg',
        '15_green_yellow_red.jpg',
        '16_green_yellow_red.jpg',
        '73_green_yellow_red.jpg',
        '2_orange_green.jpg',
        '6_orange_green.jpg',
        '45_orange_green.jpg',
        '97_orange_green.jpg',
        '26_orange_black.jpg',
        '35_orange_black.jpg',
        '42_orange_black.jpg',
        '96_orange_black.jpg',
    ];
    
    const optionsPerImage = [
        ['Número 6', 'Número 5'],
        ['Número 3', 'Número 8'],
        ['Número 29', 'Número 70'],
        ['Número 57', 'Número 35'],
        ['Número 2', 'Número 5'],
        ['Número 17', 'Número 15'],
        ['Número 16', 'Vazio/Outro'],
        ['Vazio/Outro', 'Número 73'],
        ['Vazio/Outro', 'Número 2'],
        ['Número 6', 'Vazio/Outro'],
        ['Vazio/Outro', 'Número 45'],
        ['Número 97', 'Vazio/Outro'],
        ['Número 6', 'Número 26'],
        ['Número 35', 'Número 5'],
        ['Número 42', 'Número 4'],
        ['Número 96', 'Número 9'],
    ];
    
    const correctAnswers = [
        'Número 6',
        'Número 8',
        'Número 29',
        'Número 57',
        'Número 5',
        'Número 15',
        'Número 16',
        'Número 73',
        'Número 2',
        'Número 6',
        'Número 45',
        'Número 97',
        'Número 26',
        'Número 35',
        'Número 42',
        'Número 96',
    ];
    
    let currentImageIndex = 0;
    let userAnswers = [];
    let groupErrors = [0, 0, 0, 0];
    
    const groupNames = [
        'Deuteranopia',
        'Protanopia',
        'Tritanopia',
        'Acromatopsia',
      ];
      
      let groupErrorMessages = [
        'Você não possui traços de',
        'Você possui traços leves de',
        'Você possui traços moderados de',
        'Você possui traços graves de',
        'Você possui traços máximos de',
      ];
      
      function getGroupErrorIntensity(groupIndex) {
        const errorsInGroup = groupErrors[groupIndex];
        const lastImageInGroup = (groupIndex + 1) * 4 - 1;
      
        const isLastImageCorrect =
          userAnswers[lastImageInGroup] === correctAnswers[lastImageInGroup];
      
        // Verificar se todas as respostas no grupo estão incorretas
        const allAnswersIncorrect = groupErrors[groupIndex] === 4;
      
        if (errorsInGroup === 0 && isLastImageCorrect) {
          return `Você conseguiu identificar todos os números exibidos no teste. A probabilidade de você ter algum problema de visão é muito baixa. Caso esteja tendo algum problema na visão que não foi identificado no teste, é recomendado ir a um especialista. Também pode usar nossa extensão como auxílio durante sua navegação.`;
        } else if (errorsInGroup === 1 && isLastImageCorrect) {
          return groupErrorMessages[1];
        } else if (errorsInGroup === 2 && isLastImageCorrect) {
          return groupErrorMessages[2];
        } else if (errorsInGroup >= 3 && errorsInGroup < 4 && isLastImageCorrect) {
          return groupErrorMessages[3];
        } else if (errorsInGroup >= 4 || !isLastImageCorrect) {
          return groupErrorMessages[4];
        } else if (allAnswersIncorrect) {
          return 'Todas as respostas estão incorretas neste grupo.';
        }
      }
      function showGroupErrorMessage(groupIndex) {
        const errorIntensity = getGroupErrorIntensity(groupIndex);
        const errorMessageElement = document.getElementById(`error-message-group-${groupIndex + 1}`);
        errorMessageElement.innerHTML = `<strong>${errorIntensity} ${groupNames[groupIndex]}.</strong>`;
      }
      
      function changeImage(chosenOption) {
        if (currentImageIndex >= imagePaths.length) {
          showTestCompletion();
          return;
        }
      
        const testImage = document.getElementById('test-img');
        testImage.src = 'img/Teste/' + imagePaths[currentImageIndex];
      
        const currentGroupIndex = Math.floor(currentImageIndex / 4);
        if (currentImageIndex % 4 !== 0) {
          const previousGroupIndex = Math.floor((currentImageIndex - 1) / 4);
          if (userAnswers[currentImageIndex - 1] !== correctAnswers[currentImageIndex - 1]) {
            groupErrors[currentGroupIndex] += 1;
          } else {
            groupErrors[currentGroupIndex] = groupErrors[previousGroupIndex];
          }
        }
      
        updateButtons();
      
        currentImageIndex++;
        updateProgress(); // Atualize a barra de progresso
      }
      
      function updateButtons() {
        const optionsForImage = optionsPerImage[currentImageIndex];
      
        $(".btn-1").each(function (index) {
          const button = $(this);
          const optionForImage = optionsForImage[index];
      
          button.text(optionForImage);
      
          if (userAnswers[currentImageIndex] === optionForImage) {
            button.addClass("selected");
          } else {
            button.removeClass("selected");
          }
        });
      }
      
      function getDiagnosisMessage() {
        const maxErrors = Math.max(...groupErrors);
        const groupIndexWithMaxErrors = groupErrors.indexOf(maxErrors);
      
        if (maxErrors === 0) {
          return `Você conseguiu identificar todos os números exibidos no teste. A probabilidade de você ter algum problema de visão é muito baixa. Caso esteja tendo algum problema na visão que não foi identificado no teste, é recomendado ir a um especialista. Também pode usar nossa extensão como auxílio durante sua navegação.`;
        }
      
        return `${groupErrorMessages[maxErrors]} ${groupNames[groupIndexWithMaxErrors]}.`.replace('Diagnóstico:', '');
      }
      
      function showTestCompletion() {
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = '<strong>Resultados:</strong><br>';
      
        let anyIncorrectAnswer = false;
      
        for (let groupIndex = 0; groupIndex < 4; groupIndex++) {
          for (let i = groupIndex * 4; i < (groupIndex + 1) * 4; i++) {
            const userAnswer = userAnswers[i];
            const isCorrect = correctAnswers[i] === userAnswer;
            const resultText = isCorrect ? 'Correta' : 'Incorreta';
            resultsElement.innerHTML += `Pergunta ${i + 1}: ${userAnswer} - ${resultText}<br>`;
      
            if (!isCorrect) {
              anyIncorrectAnswer = true;
            }
          }
        }
      
        let maxErrors = -1;
        let groupIndexWithMaxErrors = -1;
      
        for (let groupIndex = 0; groupIndex < 4; groupIndex++) {
          if (groupErrors[groupIndex] > maxErrors) {
            maxErrors = groupErrors[groupIndex];
            groupIndexWithMaxErrors = groupIndex;
          }
        }
      
        if (groupIndexWithMaxErrors !== -1 && anyIncorrectAnswer) {
          showGroupErrorMessage(groupIndexWithMaxErrors);
        }
        
        // Adicione a verificação para o caso de todos os erros
        if (maxErrors === 16) { // Número total de perguntas
          const errorMessageElement = document.getElementById('diagnosis-container');
          errorMessageElement.innerHTML = "Você foi diagnosticado com traços muito fortes de daltonismo. Use nossa extensão para cobrir os problemas durante sua navegação Web, porém, é altamente recomendado consultar um profissional para começar o melhor tratamento para o seu caso.";
          // Também pode redirecionar para outra página, se desejar.
        } else {
          localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
          localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
          localStorage.setItem('groupErrors', JSON.stringify(groupErrors));
          localStorage.setItem('groupDiagnosis', groupNames[groupIndexWithMaxErrors]);
          localStorage.setItem('diagnosis', getDiagnosisMessage());
      
          window.location.href = 'resultado.html';
        }
      }
      
      $(".btn-1").on("click", function () {
        const buttonText = $(this).text();
        userAnswers[currentImageIndex - 1] = buttonText;
        changeImage(buttonText);
      });
      
      function updateProgressBar() {
        const maxErrors = Math.max(...groupErrors);
        const totalQuestions = correctAnswers.length;
        const progressPercentage = ((totalQuestions - maxErrors) / totalQuestions) * 100;
      
        const progressBar = document.getElementById("progress-bar");
        progressBar.style.width = progressPercentage + "%";
      }
      
      function updateProgress() {
        updateProgressBar();
      }
      
      document.addEventListener("DOMContentLoaded", function () {
        updateProgress();
      });
      
      changeImage();
    
});
