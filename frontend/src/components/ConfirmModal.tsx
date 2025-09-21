import React from 'react'

interface ConfirmModalProps {
    isOpen: boolean
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmModal({
    isOpen,
    message,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onCancel}
        >
            <div
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
                onClick={e => e.stopPropagation()}
            >
                <p className="mb-4 text-gray-900 dark:text-gray-100">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
