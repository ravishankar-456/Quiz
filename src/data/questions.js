export const QUIZ_QUESTIONS = {
  GK: {
    Easy: [
      { id: 1, question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'], correct: 1 },
      { id: 2, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
      { id: 3, question: 'What is the largest continent?', options: ['Africa', 'Europe', 'Asia', 'Australia'], correct: 2 },
      { id: 4, question: 'How many oceans are there?', options: ['3', '4', '5', '6'], correct: 2 },
      { id: 5, question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], correct: 2 },
    ],
    Medium: [
      { id: 6, question: 'Who wrote the Indian Constitution?', options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel'], correct: 1 },
      { id: 7, question: 'What is the currency of Japan?', options: ['Won', 'Yen', 'Rupee', 'Dollar'], correct: 1 },
      { id: 8, question: 'Which country has the most population?', options: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
      { id: 9, question: 'What is the deepest ocean trench?', options: ['Mariana Trench', 'Tonga Trench', 'Kuril Trench', 'Mindanao Trench'], correct: 0 },
      { id: 10, question: 'Who was the first Prime Minister of India?', options: ['Sardar Patel', 'Jawaharlal Nehru', 'Lal Bahadur Shastri', 'Indira Gandhi'], correct: 1 },
    ],
    Hard: [
      { id: 11, question: 'What is the smallest country in the world by area?', options: ['Monaco', 'Vatican City', 'Liechtenstein', 'San Marino'], correct: 1 },
      { id: 12, question: 'Who was the first President of the USA?', options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'James Madison'], correct: 1 },
      { id: 13, question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correct: 2 },
      { id: 14, question: 'Who was the author of "1984"?', options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'J.R.R. Tolkien'], correct: 1 },
      { id: 15, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2 },
    ],
  },
  Tech: {
    Easy: [
      { id: 16, question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Home Transfer Text Protocol', 'Hyper Transfer Text Process'], correct: 0 },
      { id: 17, question: 'Which language is primarily used for web development?', options: ['Python', 'JavaScript', 'C++', 'Java'], correct: 1 },
      { id: 18, question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Coded Style Sheets'], correct: 1 },
      { id: 19, question: 'What does SQL stand for?', options: ['Structured Query Language', 'Standard Query Language', 'Styled Query Language', 'Simple Query Language'], correct: 0 },
      { id: 20, question: 'Which of these is a programming language?', options: ['HTML', 'CSS', 'JavaScript', 'XML'], correct: 2 },
    ],
    Medium: [
      { id: 21, question: 'What is React?', options: ['A database', 'A JavaScript library', 'A server', 'A language'], correct: 1 },
      { id: 22, question: 'Which data structure uses LIFO (Last In First Out)?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1 },
      { id: 23, question: 'What does API stand for?', options: ['Application Programming Interface', 'Application Process Integration', 'Advanced Programming Interface', 'Application Programming Integration'], correct: 0 },
      { id: 24, question: 'Which is NOT a version control system?', options: ['Git', 'SVN', 'Mercurial', 'Node'], correct: 3 },
      { id: 25, question: 'What is the purpose of a router in web development?', options: ['To handle network traffic', 'To navigate between pages', 'To store data', 'To manage databases'], correct: 1 },
    ],
    Hard: [
      { id: 26, question: 'What is the time complexity of Binary Search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2 },
      { id: 27, question: 'What does REST stand for?', options: ['Repeatable State Transfer', 'Representational State Transfer', 'Remote State Transfer', 'Relative State Transfer'], correct: 1 },
      { id: 28, question: 'Which design pattern is used to create objects without specifying their exact classes?', options: ['Singleton', 'Factory', 'Observer', 'Adapter'], correct: 1 },
      { id: 29, question: 'What is the purpose of middleware in Express.js?', options: ['To handle requests/responses', 'To store data', 'To create UI', 'To manage databases'], correct: 0 },
      { id: 30, question: 'What does CRUD stand for?', options: ['Create, Read, Update, Deploy', 'Create, Read, Update, Delete', 'Copy, Read, Update, Delete', 'Create, Retrieve, Update, Delete'], correct: 1 },
    ],
  },
  Sports: {
    Easy: [
      { id: 31, question: 'How many players are in a cricket team on the field?', options: ['9', '10', '11', '12'], correct: 2 },
      { id: 32, question: 'Which country won the first FIFA World Cup?', options: ['Germany', 'Italy', 'Uruguay', 'Brazil'], correct: 2 },
      { id: 33, question: 'How many sets are typically played in tennis?', options: ['2', '3', '4', '5'], correct: 1 },
      { id: 34, question: 'In basketball, how many points is a three-pointer worth?', options: ['1', '2', '3', '4'], correct: 2 },
      { id: 35, question: 'What is the maximum break in snooker?', options: ['100', '147', '180', '200'], correct: 1 },
    ],
    Medium: [
      { id: 36, question: 'How many times has India won the ICC Cricket World Cup?', options: ['1', '2', '3', '4'], correct: 2 },
      { id: 37, question: 'Who won the most Grand Slam titles in tennis?', options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Margaret Court'], correct: 3 },
      { id: 38, question: 'In which sport is the Stanley Cup awarded?', options: ['Basketball', 'Ice Hockey', 'Football', 'Soccer'], correct: 1 },
      { id: 39, question: 'How many holes are in a standard golf course?', options: ['9', '18', '36', '72'], correct: 1 },
      { id: 40, question: 'In which year was the first Olympic Games held?', options: ['1900', '1896', '1890', '1888'], correct: 1 },
    ],
    Hard: [
      { id: 41, question: 'What is the Ashes trophy awarded for in cricket?', options: ['ODI between India and Pakistan', 'Test series between England and Australia', 'T20 tournament', 'Champions League'], correct: 1 },
      { id: 42, question: 'How many rings are on the Olympic flag?', options: ['4', '5', '6', '7'], correct: 1 },
      { id: 43, question: 'What is the height of a basketball hoop from the ground?', options: ['8 feet', '10 feet', '12 feet', '15 feet'], correct: 1 },
      { id: 44, question: 'In which country is Wimbledon located?', options: ['USA', 'France', 'England', 'Australia'], correct: 2 },
      { id: 45, question: 'Who has won the most Olympic gold medals?', options: ['Mark Spitz', 'Michael Phelps', 'Usain Bolt', 'Carl Lewis'], correct: 1 },
    ],
  },
  Aptitude: {
    Easy: [
      { id: 46, question: 'If 2x = 10, what is x?', options: ['3', '4', '5', '6'], correct: 2 },
      { id: 47, question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correct: 2 },
      { id: 48, question: 'If a book costs $50 and you get 20% discount, what is the final price?', options: ['$40', '$45', '$50', '$55'], correct: 0 },
      { id: 49, question: 'What is the next number in the series: 2, 4, 6, 8, ?', options: ['9', '10', '11', '12'], correct: 1 },
      { id: 50, question: 'If you have 3 apples and get 2 more, then give away 1, how many do you have?', options: ['3', '4', '5', '6'], correct: 1 },
    ],
    Medium: [
      { id: 51, question: 'What is the average of 10, 20, 30, 40?', options: ['20', '25', '30', '35'], correct: 2 },
      { id: 52, question: 'If 5 workers can build a wall in 10 days, how many days will it take 10 workers?', options: ['5', '10', '15', '20'], correct: 0 },
      { id: 53, question: 'What is 25% of 400?', options: ['80', '100', '120', '150'], correct: 1 },
      { id: 54, question: 'If a car travels 60 km/h, how far will it travel in 5 hours?', options: ['200 km', '250 km', '300 km', '350 km'], correct: 2 },
      { id: 55, question: 'What is the next number in the series: 1, 1, 2, 3, 5, 8, ?', options: ['10', '11', '12', '13'], correct: 2 },
    ],
    Hard: [
      { id: 56, question: 'If x² - 5x + 6 = 0, what are the roots?', options: ['2, 3', '1, 6', '2, 4', '3, 4'], correct: 0 },
      { id: 57, question: 'What is the LCM of 12, 18, and 24?', options: ['36', '48', '72', '96'], correct: 2 },
      { id: 58, question: 'If a profit of 20% is made by selling an article for $600, what is the cost price?', options: ['$400', '$450', '$500', '$550'], correct: 2 },
      { id: 59, question: 'In a box of 20 balls, 5 are red and 7 are blue. If you pick one ball randomly, what is the probability it is red or blue?', options: ['0.4', '0.5', '0.6', '0.7'], correct: 2 },
      { id: 60, question: 'What is the ratio 15:30 in its simplest form?', options: ['1:2', '1:3', '2:3', '3:5'], correct: 0 },
    ],
  },
  Reasoning: {
    Easy: [
      { id: 61, question: 'If all birds can fly and penguins are birds, what can we conclude?', options: ['Penguins are not birds', 'Penguins can fly', 'Some penguins cannot fly', 'Nothing can be concluded'], correct: 1 },
      { id: 62, question: 'What comes next in the series: A, B, C, D, ?', options: ['E', 'F', 'G', 'H'], correct: 0 },
      { id: 63, question: 'If John is taller than Mary and Mary is taller than Peter, who is the tallest?', options: ['John', 'Mary', 'Peter', 'Cannot be determined'], correct: 0 },
      { id: 64, question: 'What is the opposite of "good"?', options: ['Bad', 'Evil', 'Negative', 'Poor'], correct: 0 },
      { id: 65, question: 'If a man is facing north and turns 90 degrees clockwise, which direction is he facing?', options: ['North', 'South', 'East', 'West'], correct: 2 },
    ],
    Medium: [
      { id: 66, question: 'If red means stop and green means go, what might yellow mean?', options: ['Go faster', 'Caution', 'Stop immediately', 'Turn left'], correct: 1 },
      { id: 67, question: 'In a family, if X is the father of Y and Y is the father of Z, what relation is X to Z?', options: ['Father', 'Grandfather', 'Uncle', 'Brother'], correct: 1 },
      { id: 68, question: 'What is the next number: 2, 3, 5, 7, 11, ?', options: ['12', '13', '14', '15'], correct: 1 },
      { id: 69, question: 'If some lions are dangerous and all dangerous things should be avoided, what can we conclude?', options: ['All lions should be avoided', 'Some lions should be avoided', 'Lions are not dangerous', 'Nothing can be concluded'], correct: 1 },
      { id: 70, question: 'How many times does the hour hand move in a full day?', options: ['1', '2', '12', '24'], correct: 2 },
    ],
    Hard: [
      { id: 71, question: 'If A means +, B means -, C means ×, D means ÷, then what is 20 C 2 B 6 A 3 D 3?', options: ['37', '39', '41', '43'], correct: 2 },
      { id: 72, question: 'In a class of 30 students, 15 like math, 20 like science, and 8 like both. How many like neither?', options: ['2', '3', '4', '5'], correct: 2 },
      { id: 73, question: 'If ROSE is coded as 6782, STALE is coded as 12345, then how is TASTE coded?', options: ['12782', '12375', '12352', '12735'], correct: 2 },
      { id: 74, question: 'How many handshakes happen when 5 people meet each other once?', options: ['5', '10', '15', '20'], correct: 1 },
      { id: 75, question: 'If you arrange the word "EDUCATION" alphabetically, what is the 5th letter?', options: ['A', 'C', 'D', 'I'], correct: 1 },
    ],
  },
};

export const CATEGORIES = ['GK', 'Tech', 'Sports', 'Aptitude', 'Reasoning'];
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const getQuestionsByCategory = (category, difficulty) => {
  return QUIZ_QUESTIONS[category]?.[difficulty] || [];
};

export const getRandomQuestions = (category, difficulty, limit = 10) => {
  const questions = getQuestionsByCategory(category, difficulty);
  return questions.sort(() => Math.random() - 0.5).slice(0, limit);
};
