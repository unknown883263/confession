emailjs.init('KoLuQZFqhETGLdif4');
const questions = [
    "What's your favorite hobby?",
    "What's your bigget fear?",
    "What's your favorite food?",
    "What's your dream vacation destination?",
    "Do you prefer Cats or dogs?",
    "Do you like reading?",
    "When did we first met?",
    "What do you think of me?",
    "If we are in a relationship, what can you say?",
    "Do you have a crush on me?"
  ];
  
  const answers = [];
  const app = document.getElementById('app');
  
  questions.forEach((q, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
    <div class="question-container">
            <div class="question-box">
      <h2>Question ${index + 1}</h2>
      <p>${q}</p>
      ${
        index < questions.length - 1
          ? `<input type="text" id="answer${index}" placeholder="Your answer">
             <button onclick="nextSlide(${index})">Next</button>`
          : `<button onclick="finalAnswer(true)">Yes</button>
             <button onclick="finalAnswer(false)">No</button>`
      }
    `;
    app.appendChild(slide);
  });
  
  const resultSlide = document.createElement('div');
  resultSlide.className = 'slide';
  resultSlide.id = 'resultSlide';
  app.appendChild(resultSlide);
  
  let currentSlide = 0;
  
  function nextSlide(index) {
    const input = document.getElementById(`answer${index}`);
    answers[index] = input.value || "";
    currentSlide++;
    app.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  function finalAnswer(hasCrush) {
    answers[9] = hasCrush ? "Yes" : "No";
    sendConfessionEmail(answers); // Send email with answers
    currentSlide++;
    app.style.transform = `translateX(-${currentSlide * 100}%)`;
  
    const resultText = hasCrush
      ? "<h2>🥹 I like you too! 😳💖</h2><p>That took a lot of courage.</p>"
      : "<h2>That's okay! At least we're friends 😊</h2><p>I just wanted to know. Thanks for answering!</p>";
  
    document.getElementById('resultSlide').innerHTML = `
    <div class="question-container">
            <div class="question-box">
      ${resultText}
      <h3>Your Answers:</h3>
      <ul style="text-align:left; max-width:400px;">
        ${answers.slice(0, 9).map((a, i) => `<li><strong>Q${i + 1}:</strong> ${a}</li>`).join('')}
      </ul>
    `;
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const currentInput = document.querySelector(`#answer${currentSlide}`);
      const nextBtn = document.querySelector(`.slide:nth-child(${currentSlide + 1}) button`);
      
      if (currentInput && nextBtn) {
        nextBtn.click(); // simulate clicking the Next button
      }
    }
  });

  // Function to send email with the answers
function sendConfessionEmail(answers) {
    const emailData = {
        to_email: "fakezplays1@gmail.com", // Person B's email address
        subject: "Confession from Person A",
        body: `
            Here are the answers from Person A:
            - Favorite hobby: ${answers[0]}
            - Biggest fear: ${answers[1]}
            - Favorite food: ${answers[2]}
            - Dream vacation destination: ${answers[3]}
            - Cats or dogs: ${answers[4]}
            - Do you like reading?: ${answers[5]}
            - When did we first meet?: ${answers[6]}
            - What do you think of me?: ${answers[7]}
            - If we were in a relationship: ${answers[8]}
            - Do you have a crush on me?: ${answers[9]}
        `
    };

    // Send the email using EmailJS
    emailjs.send('service-sdk8k9j', 'template_m2rdvo', emailData)
        .then(function(response) {
            console.log("Email sent successfully", response);
        }, function(error) {
            console.error("Email sending failed", error);
        });
}

  