import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

  let tests = [
    { id: 1, title: "Math Test" },
    { id: 2, title: "Science Test" },
    { id: 3, title: "History Test" },
    { id: 4, title: "Geography Test" },
    { id: 5, title: "English Test" },
    { id: 6, title: "Computer Science Test" },
    { id: 7, title: "Physics Test" },
    { id: 8, title: "Chemistry Test" },
    { id: 9, title: "Biology Test" },
    { id: 10, title: "Literature Test" },
    { id: 11, title: "Civics Test" },
    { id: 12, title: "Economics Test" },
    { id: 13, title: "Psychology Test" },
    { id: 14, title: "Philosophy Test" },
    { id: 15, title: "Music Theory Test" },
    { id: 16, title: "Art Appreciation Test" },
    { id: 17, title: "Sociology Test" },
    { id: 18, title: "Business Studies Test" },
    { id: 19, title: "Political Science Test" },
    { id: 20, title: "French Language Test" },
    { id: 21, title: "Spanish Language Test" },
    { id: 22, title: "German Language Test" },
    { id: 23, title: "Italian Language Test" },
    { id: 24, title: "Chinese Language Test" },
    { id: 25, title: "Japanese Language Test" },
    { id: 26, title: "Artificial Intelligence Test" },
    { id: 27, title: "Data Structures and Algorithms Test" },
    { id: 28, title: "Machine Learning Test" },
    { id: 29, title: "Deep Learning Test" },
    { id: 30, title: "Natural Language Processing Test" }
  ];
    

// GET API - Fetch all tests
app.get("/api/tests", async (req, res) => {
  try {
    
    const result = tests; 
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
