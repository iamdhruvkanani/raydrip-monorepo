// components/SizeModal.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PencilRuler, ArrowRight } from 'lucide-react';

interface SizeModalProps {
    open: boolean;
    onClose: () => void;
}

const sizeData = [
    ['SIZE', 'S', 'M', 'L', 'XL', '2XL'],
    ['SHOULDER', '13', '13.5', '14', '14.5', '15'],
    ['BUST', '34', '36', '38', '40', '42'],
    ['WAIST', '16', '17', '18', '19', '20'],
    ['HIPS', '19', '20', '21', '22', '23'],
    ['SLEEVE', '17', '17.5', '18', '18.5', '19'],
    ['LENGTH', '42', '43', '44', '45', '46'],
];

export function SizeModal({ open, onClose }: SizeModalProps) {
    const [measurements, setMeasurements] = useState({ bust: '' });
    const [compareSize, setCompareSize] = useState('M');
    const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

    const recommendSize = useMemo(() => {
        const bust = parseFloat(measurements.bust);
        if (isNaN(bust)) return null;
        if (bust < 35) return 'S';
        if (bust < 37) return 'M';
        if (bust < 39) return 'L';
        if (bust < 41) return 'XL';
        return '2XL';
    }, [measurements.bust]);

    if (!open) return null;

    const convertCell = (cell: string, isHeader: boolean) => {
        if (unit === 'inches' || isHeader) return cell;
        // Only convert if cell is a valid number
        return !isNaN(Number(cell)) ? (parseFloat(cell) * 2.54).toFixed(1) : cell;
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <PencilRuler className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Kurti Size Guide</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use the chart below to measure and find your size</p>
                        </div>
                    </div>
                    <button
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Mobile scroll hint */}
                    <div className="lg:hidden mb-2 text-xs text-gray-500 flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" /> Scroll right for sizes
                    </div>

                    {/* Body Diagram & Measurement Input */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <img
                                src="/kurti_body_chart_2.png"
                                alt="Kurti Body Measurement Diagram"
                                className="w-full max-w-md mx-auto my-6 rounded-xl shadow-md"
                            />
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Measure: shoulder, bust, sleeve, and length for best kurti fit.
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <input
                                type="number"
                                placeholder={`Bust (${unit === 'inches' ? 'in' : 'cm'})`}
                                value={measurements.bust}
                                onChange={(e) =>
                                    setMeasurements({ ...measurements, bust: e.target.value })
                                }
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none"
                            />
                            {recommendSize && (
                                <div className="text-center mt-2">
                                    <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-medium">
                                        Recommended Size: {recommendSize}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => setUnit(unit === 'inches' ? 'cm' : 'inches')}
                                className="text-center text-sm mt-1 text-blue-600 hover:underline"
                            >
                                View in {unit === 'inches' ? 'cm' : 'inches'}
                            </button>
                        </div>
                    </div>

                    {/* Compare and Table */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium">Compare:</span>
                        <select
                            value={compareSize}
                            onChange={(e) => setCompareSize(e.target.value)}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg"
                        >
                            {sizeData[0].slice(1).map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Size Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    {sizeData[0].map((size, i) => (
                                        <th
                                            key={i}
                                            className={`py-3 px-4 text-left font-medium text-sm ${i === 0
                                                ? 'text-gray-900 dark:text-white'
                                                : 'text-gray-600 dark:text-gray-300 text-center'
                                                } ${size === compareSize ? 'bg-yellow-100 dark:bg-yellow-800' : ''}`}
                                        >
                                            {size}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                <AnimatePresence>
                                    {sizeData.slice(1).map((row, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            {row.map((cell, j) => (
                                                <td
                                                    key={j}
                                                    className={`py-3 px-4 text-sm ${j === 0
                                                        ? 'font-medium text-gray-900 dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-300 text-center font-mono'
                                                        }`}
                                                >
                                                    {j === 0
                                                        ? cell
                                                        : (
                                                            <>
                                                                <span className="text-xs text-gray-400 mr-1">"</span>
                                                                {convertCell(cell, false)}
                                                            </>
                                                        )
                                                    }
                                                </td>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        All measurements are approximate. If you’re between sizes, size up for a more comfortable fit.
                    </div>
                </div>
            </div>
        </div>
    );
}
