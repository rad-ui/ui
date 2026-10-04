'use client'

import React from "react"

// Labeled grid: one row per `rows` entry, one column per `columns` entry.
// `renderCell(row, column)` returns the component instance for that combination.
const Matrix = ({ rows, columns, renderCell, align = "center" }) => (
    <div className="overflow-x-auto">
        <table className="border-collapse">
            {columns.some((column) => column.label) ? (
                <thead>
                    <tr>
                        <th scope="col" className="w-0 pb-2" />
                        {columns.map((column) => (
                            <th key={column.key} scope="col" className="whitespace-nowrap pb-2 pr-6 text-left font-mono text-xs font-normal text-gray-950">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
            ) : null}
            <tbody>
                {rows.map((row) => (
                    <tr key={row.key}>
                        <th scope="row" className="whitespace-nowrap py-1.5 pr-6 text-left font-mono text-xs font-normal text-gray-950">
                            {row.label}
                        </th>
                        {columns.map((column) => (
                            <td key={column.key} className={`py-1.5 pr-6 ${align === "top" ? "align-top" : "align-middle"}`}>
                                {renderCell(row, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export const toAxis = (values) => values.map((value) => ({ key: String(value), label: String(value), value }))

export default Matrix
