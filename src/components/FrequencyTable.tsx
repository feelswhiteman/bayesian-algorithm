import React, { ReactElement } from "react";
import Data from "../types/Data";

interface TableProps {
    data: Data[];
}

interface MoodCounts {
    [key: string]: number;
}

const FrequencyTable: React.FC<TableProps> = ({ data }): ReactElement => {
    const moodCounts: MoodCounts = {};

    data.forEach((item) => {
        const { mood, attendance } = item;

        if (!moodCounts[mood]) {
            moodCounts[mood] = 0;
        }

        if (attendance === "Так") {
            moodCounts[mood]++;
        }
    });

    const totalYesCount: number = Object.values(moodCounts).reduce((acc, count) => acc + count, 0);

    return (
        <div>
            <h2>Частотна таблиця</h2>
            <table>
                <thead>
                    <tr>
                        <th>Відвідування пар</th>
                        <th>Так</th>
                        <th>Ні</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(moodCounts).map((mood) => (
                        <tr key={mood}>
                            <th>{mood}</th>
                            <td>{moodCounts[mood]}</td>
                            <td>{data.filter(item => item.mood === mood).length - (moodCounts[mood] || 0)}</td>
                        </tr>
                    ))}
                    <tr>
                        <th>Всього</th>
                        <td>{totalYesCount}</td>
                        <td>{data.length - totalYesCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FrequencyTable;
