// components/SizeModal.tsx
import React from 'react';

interface SizeModalProps {
    open: boolean;
    onClose: () => void;
}

export function SizeModal({ open, onClose }: SizeModalProps) {
    if (!open) return null;

    const sizeData = [
        ['SIZE', 'S', 'M', 'L', 'XL', '2XL'],
        ['SHOULDER', '13', '13.5', '14', '14.5', '15'],
        ['CHEST', '18', '19', '20', '21', '22'],
        ['Waist', '16', '17', '18', '19', '20'],
        ['HIPS', '19', '20', '21', '22', '23'],
        ['GHERA', '20', '21', '22', '23', '24'],
        ['ARMHOLE', '8', '8.5', '9', '9.5', '10'],
        ['SLEEVE', '17', '17.5', '18', '18.5', '19'],
        ['MORI', '9', '9.5', '10', '10.5', '10.5'],
        ['BUST SIZE', '34', '36', '38', '40', '42'],
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-3xl w-full overflow-auto max-h-[80vh] p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Size Guide Chart
                </h2>
                <table className="w-full text-center border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            {sizeData[0].map((size, i) => (
                                <th key={i} className="p-3 border border-gray-300 dark:border-gray-700 font-semibold">{size}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sizeData.slice(1).map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
                                {row.map((cell, j) => (
                                    <td key={j} className={`py-2 px-3 border border-gray-300 dark:border-gray-700 ${j === 0 ? 'font-semibold text-left pl-4' : ''}`}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
