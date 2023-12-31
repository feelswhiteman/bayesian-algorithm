import React, { ReactElement } from "react";
import "./DataTable.css";

interface Data {
    mood: string;
    attendance: string;
}

interface TableProps {
    data: Data[];
}

const DataTable: React.FC<TableProps> = ({data}): ReactElement => {
    return (
        <div>
        <h2>Таблиця даних</h2>
            <table>
                <thead>
                    <tr>
                        <th>Настрій</th>
                        <th>Відвідування пар</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item["mood"]}</td>
                            <td>{item["attendance"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
