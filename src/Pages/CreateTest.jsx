import React, { useState } from "react";
import { X, CirclePlus, Trash2, CheckCircle, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTest() {
    const [questions, setQuestions] = useState([
        { text: "", options: [{ text: "Option 1", image: null }, { text: "Option 2", image: null }], correctOption: null, marks: 0, image: null },
    ]);

    const navigate = useNavigate();

    const notify = () => {
        if (questions.length < 1) {
            toast.warn("Please add at least 1 question.");
        } else {
            toast("Test Created Successfully.", {
                onClose: () => navigate('/adminpage')
            });
        }
    };

    // Function to add a new question
    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: [{ text: "Option 1", image: null }, { text: "Option 2", image: null }], correctOption: null, marks: 0, image: null }]);
    };

    // Function to update question text
    const updateQuestionText = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = value;
        setQuestions(updatedQuestions);
    };

    // Function to add an option to a specific question
    const addOption = (qIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.push({ text: `Option ${updatedQuestions[qIndex].options.length + 1}`, image: null });
        setQuestions(updatedQuestions);
    };

    // Function to remove an option from a specific question
    const removeOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options = updatedQuestions[qIndex].options
            .filter((_, i) => i !== oIndex)
            .map((option, i) => ({ ...option, text: `Option ${i + 1}` })); // Renumber options
        if (updatedQuestions[qIndex].correctOption === oIndex) {
            updatedQuestions[qIndex].correctOption = null; // Reset correct option if removed
        }
        setQuestions(updatedQuestions);
    };

    // Function to remove a question
    const removeQuestion = (qIndex) => {
        setQuestions(questions.filter((_, index) => index !== qIndex));
    };

    // Function to set the correct option for a question
    const selectCorrectOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].correctOption = oIndex;
        setQuestions(updatedQuestions);
    };

    const updateMarks = (index, value) => {
        const marks = value === "" ? 0 : parseInt(value, 10);
        const updatedQuestions = [...questions];
        updatedQuestions[index].marks = marks;
        setQuestions(updatedQuestions);
    };

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    // Function to handle image upload for a question or option
    const handleImageUpload = (e, qIndex, oIndex = null) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedQuestions = [...questions];
                if (oIndex === null) {
                    updatedQuestions[qIndex].image = reader.result;
                } else {
                    updatedQuestions[qIndex].options[oIndex].image = reader.result;
                }
                setQuestions(updatedQuestions);
            };
            reader.readAsDataURL(file);
        }
    };

    // Check if any question text is empty
    const isAnyQuestionEmpty = questions.some(q => q.text.trim() === "");

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Test Description Header */}
            <div className="">
                <div className="my-8 text-center">
                    <h2 className="bg-blue-600 text-white rounded py-4 px-6 w-fit mx-auto text-2xl font-semibold">
                        Enter Test Details
                    </h2>
                </div>

                {/* Test Input Fields */}
                <div className="space-y-8 ml-56">
                    <input
                        type="text"
                        placeholder="Test Name"
                        name="Name"
                        className="block w-[calc(100%-14rem)] bg-gray-300 p-5 rounded-lg text-xl"
                    />
                    <textarea
                        placeholder="Test Desc."
                        className="block w-[calc(100%-14rem)] bg-gray-300 p-5 rounded-lg text-xl h-24 resize-none"
                    ></textarea>
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Time and Date"
                            className="block w-[calc(50%-7rem)] bg-gray-300 p-5 rounded-lg text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Duration"
                            className="block w-[calc(50%-8rem)] bg-gray-300 p-5 text-xl rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between mr-56">
                        <span className="mr-4">Total Questions: {questions.length}</span>
                        <span className="">Total Marks: {totalMarks}</span>
                    </div>
                </div>

                {/* Questions Section */}
                <div className="mt-8 mx-56">
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="mb-6 p-4 bg-gray-200 rounded shadow-md text-xl">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Question {qIndex + 1} :-</span>
                                <div className="text-sm flex items-center gap-2">
                                    <label htmlFor="marks">Marks</label>
                                    <input
                                        type="number"
                                        value={q.marks === 0 ? "" : q.marks} // Show empty if 0, otherwise show marks
                                        onChange={(e) => updateMarks(qIndex, e.target.value)}
                                        className="border-b-2 border-gray-300 focus:border-blue-500 hover:border-blue-500 focus:outline-none w-16 py-1 px-2 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                    <Trash2
                                        size={20}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        onClick={() => removeQuestion(qIndex)}
                                    />
                                </div>
                            </div>

                            {/* Question Input with Image Icon */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={q.text}
                                    onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                                    placeholder="Enter your question here..."
                                    className="block w-full bg-gray-300 p-4 rounded pr-10"
                                    required
                                />
                                <label htmlFor={`question-upload-${qIndex}`} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-blue-500">
                                    <Image size={24} />
                                </label>
                                <input
                                    type="file"
                                    id={`question-upload-${qIndex}`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, qIndex)}
                                />
                                {q.image && (
                                    <div className="mt-2">
                                        <img src={q.image} alt={`Question ${qIndex + 1}`} className="w-32 h-32 object-cover rounded" />
                                    </div>
                                )}
                            </div>

                            {/* Options Section */}
                            <div className="space-y-2 mt-4">
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="relative flex items-center gap-2">
                                        {/* Tick Mark (Correct Answer Selector) */}
                                        <CheckCircle
                                            size={24}
                                            className={`cursor-pointer ${q.correctOption === oIndex ? "text-green-600" : "text-gray-400"
                                                } hover:text-green-700`}
                                            onClick={() => selectCorrectOption(qIndex, oIndex)}
                                        />

                                        {/* Option Input with Image Icon */}
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...questions];
                                                    updatedQuestions[qIndex].options[oIndex].text = e.target.value;
                                                    setQuestions(updatedQuestions);
                                                }}
                                                placeholder={option.text}
                                                className="block w-full bg-gray-300 p-3 rounded pr-10"
                                            />
                                            <label htmlFor={`option-upload-${qIndex}-${oIndex}`} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-blue-500">
                                                <Image size={24} />
                                            </label>
                                            <input
                                                type="file"
                                                id={`option-upload-${qIndex}-${oIndex}`}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, qIndex, oIndex)}
                                            />
                                            {option.image && (
                                                <div className="mt-2">
                                                    <img src={option.image} alt={`Option ${oIndex + 1}`} className="w-16 h-16 object-cover rounded" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Remove Option */}
                                        <X
                                            size={20}
                                            className="cursor-pointer text-red-500 hover:text-red-700"
                                            onClick={() => removeOption(qIndex, oIndex)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Add Option Button */}
                            <button onClick={() => addOption(qIndex)} className="mt-4 text-blue-600 text-lg">
                                Add Option
                            </button>
                        </div>
                    ))}

                    {/* Add Question Button */}
                    <div className="flex justify-center">
                        <CirclePlus
                            size={40}
                            className="cursor-pointer text-blue-600 hover:text-blue-800 mt-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                addQuestion();
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Create Test Button */}
            <div className="text-center mt-8">
                <button
                    className={`bg-blue-600 cursor-pointer hover:bg-blue-800 text-white py-3 text-lg px-6 rounded ${isAnyQuestionEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={notify}
                    disabled={isAnyQuestionEmpty}
                >
                    Create Test
                </button>
                <ToastContainer />
            </div>
        </div>
    );
}