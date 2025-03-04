import React, { useState } from "react";
import { X, CirclePlus, Trash2, CheckCircle, Image } from "lucide-react"; // Importing icons
import { Link } from "react-router-dom";
export default function CreateTest() {
    const [questions, setQuestions] = useState([
        { text: "", options: ["Option 1", "Option 2"], correctOption: null, marks: 0 },
    ]);


    // Function to add a new question
    const addQuestion = () => {
        setQuestions([...questions, { text: "", options: ["Option 1", "Option 2"], correctOption: null, marks: 0 }]);
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
        updatedQuestions[qIndex].options.push(`Option ${updatedQuestions[qIndex].options.length + 1}`);
        setQuestions(updatedQuestions);
    };

    // Function to remove an option from a specific question
    const removeOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options = updatedQuestions[qIndex].options
            .filter((_, i) => i !== oIndex)
            .map((_, i) => `Option ${i + 1}`); // Renumber options
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

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Test Description Header */}
            <div className="my-8 text-center">
                <h2 className="bg-blue-600 text-white rounded py-2 px-6 w-fit mx-auto text-lg font-semibold">
                    Test Details
                </h2>
            </div>


            {/* Test Input Fields */}
            <div className="space-y-8 ml-56 ">

                <input type="text" placeholder="Test Name" name="Name" className="block w-[calc(100%-14rem)] bg-gray-300 p-2 rounded" />
                <textarea placeholder="Test Desc." className="block w-[calc(100%-14rem)] bg-gray-300 p-2 rounded h-24 resize-none"></textarea>
                <div className="flex flex-wrap gap-4">
                    <input type="text" placeholder="Time and Date" className="block w-[calc(50%-7rem)] bg-gray-300 p-2 rounded" />
                    <input type="text" placeholder="Duration" className="block w-[calc(50%-8rem)] bg-gray-300 p-2 rounded" />
                </div>
                <div className="flex justify-between mr-56">
                    <span className="mr-4">Total Questions: {questions.length}</span>
                    <span className="">Total Marks: {totalMarks}</span>

                </div>
            </div>

            {/* Questions Section */}
            <div className="mt-8 mx-56">
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-6 p-4 bg-gray-200 rounded shadow-md">
                        <div className="flex justify-between items-center mb-4">

                            <span className="font-semibold">Question {qIndex + 1} :-</span>
                            <div className="text-sm flex items-center gap-2">
                                <label htmlFor="marks">Marks</label>
                                <input
                                    type="number"
                                    value={q.marks === 0 ? "" : q.marks}  // Show empty if 0, otherwise show marks
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
                                className="block w-full bg-gray-300 p-2 rounded pr-10"
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
                                            placeholder={option}
                                            className="block w-full bg-gray-300 p-2 rounded pr-10"
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
                        <button onClick={() => addOption(qIndex)} className="mt-4 text-blue-600 text-sm">
                            Add Option
                        </button>
                    </div>
                ))}

                {/* Add Question Button */}
                <div className="flex justify-center">
                    <CirclePlus
                        size={40}
                        className="cursor-pointer text-blue-600 hover:text-blue-800 mt-4"
                        onClick={addQuestion}
                    />
                </div>
            </div>

            {/* Create Test Button */}
            <div className="text-center mt-8">
                <Link to="/"> <button className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white py-2 px-6 rounded">Create Test</button>
                </Link>
            </div>
        </div>
    );
}
