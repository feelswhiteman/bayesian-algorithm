import React, { ReactElement } from "react";
import Data from "../types/Data";

interface TableProps {
    data: Data[];
}

interface MoodCounts {
    [key: string]: number;
}

const LikelihoodTable: React.FC<TableProps> = ({ data }): ReactElement => {
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

    const totalYesCount: number = Object.values(moodCounts).reduce(
        (acc, count) => acc + count,
        0
    );

    return (
        <div>
            <h2>Таблиця правдоподібності</h2>
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
                            <td>
                                {data.filter((item) => item.mood === mood)
                                    .length - (moodCounts[mood] || 0)}
                            </td>
                            {/* yes count + no count / data.length */}
                            <td>
                                {moodCounts[mood] +
                                    data.filter((item) => item.mood === mood)
                                        .length -
                                    (moodCounts[mood] || 0) +
                                    "/" +
                                    data.length}
                            </td>
                            <td>
                                {(
                                    (moodCounts[mood] +
                                        data.filter(
                                            (item) => item.mood === mood
                                        ).length -
                                        (moodCounts[mood] || 0)) /
                                    data.length
                                ).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th>Всього</th>
                        <td>{totalYesCount}</td>
                        <td>{data.length - totalYesCount}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>{totalYesCount + "/" + data.length}</td>
                        <td>
                            {data.length - totalYesCount + "/" + data.length}
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>{(totalYesCount / data.length).toFixed(2)}</td>
                        <td>
                            {(
                                (data.length - totalYesCount) /
                                data.length
                            ).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LikelihoodTable;
