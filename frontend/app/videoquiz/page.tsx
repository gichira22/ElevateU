"use client";
import { useState } from "react";
import ReactPlayer from "react-player";

// Sample data for topics, videos, and related questions
const data = [
  {
    topic: "Technology",
    imageUrl: "/technology.png",
    videoUrl: "https://www.youtube.com/watch?v=_X4fWov8iuw",
    questions: [
      { question: "What is the main focus of the video?", options: ["AI", "Blockchain", "VR", "IoT"], correctAnswer: "AI" },
      { question: "Which company was mentioned?", options: ["Google", "Microsoft", "Apple", "Amazon"], correctAnswer: "Apple" },
    ],
  },
  {
    topic: "Environment",
    imageUrl: "/environment.jpg",
    videoUrl: "https://www.youtube.com/watch?v=jubd4B71j1U",
    questions: [
      { question: "What is the primary environmental issue discussed?", options: ["Pollution", "Deforestation", "Climate Change", "Water Scarcity"], correctAnswer: "Climate Change" },
      { question: "What solution is proposed?", options: ["Recycling", "Renewable Energy", "Water Conservation", "Carbon Capture"], correctAnswer: "Renewable Energy" },
    ],
  },
  {
    topic: "Mathematics",
    imageUrl: "/Math.png",
    videoUrl: "https://www.youtube.com/watch?v=ZQElzjCsl9o",
    questions: [
      { question: "What is the main topic covered?", options: ["Algebra", "Calculus", "Geometry", "Statistics"], correctAnswer: "Algebra" },
      { question: "Which theorem is discussed?", options: ["Pythagorean", "Euclidean", "Fermat's Last", "Binomial"], correctAnswer: "Pythagorean" },
    ],
  },
  {
    topic: "English",
    imageUrl: "/english.jpeg",
    videoUrl: "https://www.youtube.com/watch?v=zbkaAQefZAo",
    questions: [
      { question: "What is the main theme of the video?", options: ["Grammar", "Literature", "Writing", "Vocabulary"], correctAnswer: "Grammar" },
      { question: "Which author is mentioned?", options: ["Shakespeare", "Austen", "Orwell", "Hemingway"], correctAnswer: "Shakespeare" },
    ],
  },
];

const VideoQuiz = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [retryMessage, setRetryMessage] = useState(""); // Track retry message

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsVideoFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers({});
    setQuizComplete(false);
    setRetryMessage(""); // Reset retry message
  };

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
  };

  const handleAnswerSelect = (option) => {
    const correct = selectedTopic.questions[currentQuestion].correctAnswer;
    if (option === correct) {
      setScore(score + 20); // 5 questions, 20% per correct answer
    }

    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: option,
    });

    // Move to the next question or finish the quiz
    if (currentQuestion + 1 < selectedTopic.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = score + (option === correct ? 20 : 0); // Update score if last answer was correct
      setScore(finalScore);
      setQuizComplete(true); // Mark quiz as complete
      if (finalScore < 70) {
        setRetryMessage("Please select another topic.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-light-blue-50 p-8">
      {/* Topic Selection */}
      {selectedTopic === null ? (
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8 text-golden-brown">Select the topic of study</h1>
          <div className="grid grid-cols-2 gap-6">
            {data.map((topicData, index) => (
              <div key={index} className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
                <button
                  className="text-xl font-bold bg-blue-500 text-white rounded-lg shadow p-4 mb-4 hover:bg-blue-600 w-full"
                  onClick={() => handleTopicSelect(topicData)}
                >
                  {topicData.topic}
                </button>
                <img
                  src={topicData.imageUrl}
                  alt={topicData.topic}
                  className="w-40 h-40 object-cover mb-4 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Video Player */}
          {selectedTopic && !isVideoFinished && (
            <div className="w-full max-w-4xl mx-auto p-4">
              <ReactPlayer
                url={selectedTopic.videoUrl}
                controls
                width="100%"
                height="480px"
                onEnded={handleVideoEnd}
              />
            </div>
          )}

          {/* Quiz Section */}
          {isVideoFinished && !quizComplete && (
            <div className="w-full max-w-2xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-center">
                Question {currentQuestion + 1} of {selectedTopic.questions.length}
              </h2>
              <p className="mt-4 text-lg text-yellow-500 font-bold">{selectedTopic.questions[currentQuestion].question}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {selectedTopic.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="p-4 text-center bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-bold">Score: {score}%</p>
              </div>
            </div>
          )}

          {/* Completion Message */}
          {quizComplete && (
            <div className="w-full max-w-2xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
              {retryMessage ? (
                <>
                  <h2 className="text-xl font-bold text-center text-red-500">{retryMessage}</h2>
                  <div className="mt-4 text-center">
                    <p className="text-lg font-bold">Please select another topic:</p>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      {data.map((topicData, index) => (
                        <div key={index} className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
                          <button
                            className="text-xl font-bold bg-blue-500 text-white rounded-lg shadow p-4 mb-4 hover:bg-blue-600 w-full"
                            onClick={() => handleTopicSelect(topicData)}
                          >
                            {topicData.topic}
                          </button>
                          <img
                            src={topicData.imageUrl}
                            alt={topicData.topic}
                            className="w-40 h-40 object-cover mb-4 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-center text-green-500">Thank you for completing the video!</h2>
                  <p className="text-lg text-center">Your final score is {score}%</p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoQuiz;
