import DataTable from "./components/DataTable";
import FrequencyTable from "./components/FrequencyTable";
import LikelihoodTable from "./components/LikelihoodTable";
import "./App.css";
import { useState } from "react";

interface Data {
    mood: string;
    attendance: "Так" | "Ні";
}

interface MoodCounts {
    [key: string]: number;
}

const var1: Data[] = [
    { mood: "Веселий", attendance: "Так" },
    { mood: "Добрий", attendance: "Ні" },
    { mood: "Плаксивий", attendance: "Ні" },
    { mood: "Плаксивий", attendance: "Так" },
    { mood: "Веселий", attendance: "Ні" },
    { mood: "Плаксивий", attendance: "Так" },
    { mood: "Добрий", attendance: "Ні" },
    { mood: "Веселий", attendance: "Ні" },
    { mood: "Веселий", attendance: "Так" },
    { mood: "Добрий", attendance: "Ні" },
    { mood: "Плаксивий", attendance: "Так" },
    { mood: "Добрий", attendance: "Ні" },
    { mood: "Добрий", attendance: "Так" },
    { mood: "Веселий", attendance: "Так" },
    { mood: "Плаксивий", attendance: "Ні" },
    { mood: "Добрий", attendance: "Так" },
    { mood: "Веселий", attendance: "Ні" },
    { mood: "Добрий", attendance: "Так" },
    { mood: "Добрий", attendance: "Ні" },
];

console.log(var1);

function App() {
    const [moodInput, setMoodInput] = useState("");
    const [attendanceInput, setAttendanceInput] = useState("Так");

    const [problemMoodInput, setProblemMoodInput] = useState("");
    const [problemAttendanceInput, setProblemAttendanceInput] = useState("Так");

    const [inputValues, setInputValues] = useState<Data[]>([]);

    const uniqueMoods = [...new Set(inputValues.map((item) => item.mood))];
    const moodCounts: MoodCounts = {};
    const totalMoodCounts: MoodCounts = {};

    inputValues.forEach((item) => {
        const { mood, attendance } = item;

        if (!moodCounts[mood]) {
            moodCounts[mood] = 0;
        }

        if (!totalMoodCounts[mood]) {
            totalMoodCounts[mood] = 0;
        }

        if (attendance === "Так") {
            moodCounts[mood]++;
        }

        totalMoodCounts[mood]++;
    });

    const totalYesCount: number = Object.values(moodCounts).reduce(
        (acc, count) => acc + count,
        0
    );
    const totalNoCount: number = inputValues.length - totalYesCount;

    const handleAddRow = () => {
        if (attendanceInput !== "Так" && attendanceInput !== "Ні") return;
        const inputData: Data = {
            mood: moodInput,
            attendance: attendanceInput,
        };
        // setMoodInput("");
        setInputValues([...inputValues, inputData]);
        setProblemMoodInput(inputData.mood);
    };

    const PMoodAttend =
        moodCounts[problemMoodInput] /
        (problemAttendanceInput === "Так" ? totalYesCount : totalNoCount);

    const PMood = totalMoodCounts[problemMoodInput] / inputValues.length;

    const PAttend =
        (problemAttendanceInput === "Так" ? totalYesCount : totalNoCount) /
        inputValues.length;

    const PAttendMood = (PMoodAttend * PAttend) / PMood;

    return (
        <>
            <button className="add-button" onClick={() => setInputValues(var1)}>
                Варіант №1
            </button>
            <div className="grid">
                <div>
                    <p>Настрій</p>
                    <input
                        type="text"
                        value={moodInput}
                        onChange={(e) => setMoodInput(e.target.value)}
                        placeholder="Enter text"
                    />
                </div>
                <div>
                    <p>Відвідування пар</p>
                    <select
                        value={attendanceInput}
                        onChange={(e) => setAttendanceInput(e.target.value)}
                        name="dataSelected"
                        id="attendance"
                    >
                        <option value="Так">Так</option>
                        <option value="Ні">Ні</option>
                    </select>
                </div>
            </div>
            <button className="add-button" onClick={handleAddRow}>
                Додати
            </button>
            <div className="table-grid">
                <DataTable data={inputValues}></DataTable>
                <div className="split-rows">
                    <FrequencyTable data={inputValues}></FrequencyTable>
                    <LikelihoodTable data={inputValues}></LikelihoodTable>
                    <div style={{textAlign: "left"}}>
                        <h2>Задача</h2>
                        <span>
                            P(
                            <select
                                style={{ width: "60px" }}
                                value={problemAttendanceInput}
                                onChange={(e) =>
                                    setProblemAttendanceInput(e.target.value)
                                }
                                name="taskAttendanceSelected"
                            >
                                <option value="Так">Так</option>
                                <option value="Ні">Ні</option>
                            </select>
                            |
                            <select
                                style={{ width: "140px" }}
                                value={problemMoodInput}
                                onChange={(e) =>
                                    setProblemMoodInput(e.target.value)
                                }
                                name="taskMoodSelected"
                            >
                                {uniqueMoods.map((mood, index) => (
                                    <option key={index} value={mood}>
                                        {mood}
                                    </option>
                                ))}
                            </select>
                            ) = P({problemMoodInput}|{problemAttendanceInput}) *
                            P ({problemAttendanceInput}) / P({problemMoodInput})
                        </span>
                        <br />
                        <span>
                            P({problemMoodInput}|{problemAttendanceInput}) ={" "}
                            {moodCounts[problemMoodInput]} /{" "}
                            {problemAttendanceInput === "Так"
                                ? totalYesCount
                                : totalNoCount}{" "}
                            = {PMoodAttend.toFixed(2)}
                        </span>
                        <br />
                        <span>
                            P({problemMoodInput}) ={" "}
                            {totalMoodCounts[problemMoodInput]} /{" "}
                            {inputValues.length} = {PMood.toFixed(2)}
                        </span>
                        <br />
                        <span>
                            P({problemAttendanceInput}) ={" "}
                            {problemAttendanceInput === "Так"
                                ? totalYesCount
                                : totalNoCount}{" "}
                            / {inputValues.length} = {PAttend.toFixed(2)}
                        </span>
                        <br />
                        <span>
                            P({problemAttendanceInput}|{problemMoodInput}) ={" "}
                            {PMoodAttend.toFixed(2)} * {PAttend.toFixed(2)} / {PMood.toFixed(2)} ={" "}
                            {PAttendMood.toFixed(2)}
                        </span>
                        <br />
                        <span>
                            Значить що {problemMoodInput} студент буде
                            відвідувати пари з вірогідністю {PAttendMood * 100}%
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
