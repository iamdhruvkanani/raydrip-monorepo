// components/Pagination.tsx
'use client'

import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="max-w-md mx-auto px-4"> {/* Limits width and adds horizontal padding */}
            <nav
                className="flex justify-between items-center my-12 space-x-2 select-none"
                aria-label="Pagination"
                style={{ boxSizing: 'border-box' }}
            >
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="min-w-[70px] px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-text-primary-light dark:text-text-primary-dark hover:bg-accent-gold-light dark:hover:bg-accent-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Previous
                </button>

                <div className="flex flex-grow justify-center space-x-2 overflow-x-auto no-scrollbar">
                    {pages.map(page => {
                        const isActive = page === currentPage
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                aria-current={isActive ? 'page' : undefined}
                                className={`min-w-[40px] px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 transition ${isActive
                                        ? 'bg-accent-gold-light dark:bg-accent-gold-dark text-text-primary-light dark:text-text-primary-dark font-semibold'
                                        : 'text-text-primary-light dark:text-text-primary-dark hover:bg-accent-gold-light dark:hover:bg-accent-gold-dark'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="min-w-[70px] px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-text-primary-light dark:text-text-primary-dark hover:bg-accent-gold-light dark:hover:bg-accent-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </nav>
        </div>


    )
}
