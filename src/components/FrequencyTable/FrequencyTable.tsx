import React, { ReactElement } from "react";
import Data from "../../types/Data";

interface TableProps {
    data: Data[];
}

const FrequencyTable: React.FC<TableProps> = ({ data }): ReactElement => {
    return (
        <>
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
        </>
    );
};

export default FrequencyTable;
