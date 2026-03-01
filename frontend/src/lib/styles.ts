// Reusable Tailwind class strings — replaces @apply custom classes in CSS

export const styles = {
  btnPrimary:
    'bg-[#3B3FDD] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#2E32C4] active:bg-[#2226AB] transition-colors duration-150 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',

  btnOutline:
    'border-2 border-[#3B3FDD] text-[#3B3FDD] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#3B3FDD] hover:text-white transition-colors duration-150 inline-flex items-center justify-center gap-2',

  btnGhost:
    'text-gray-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors duration-150 inline-flex items-center justify-center gap-2',

  jobCard:
    'bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#3B3FDD]/30 transition-all duration-200 cursor-pointer h-full flex flex-col',

  tag: 'px-3 py-1 rounded-full text-xs font-medium border',

  fieldInput:
    'w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#3B3FDD] focus:ring-2 focus:ring-[#3B3FDD]/10 transition-colors placeholder:text-gray-400',

  fieldInputError:
    'w-full px-4 py-2.5 border border-red-300 rounded-lg text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-colors placeholder:text-gray-400',

  fieldLabel: 'block text-sm font-medium text-gray-700 mb-1.5',

  categoryTag: {
    Design:           'bg-teal-50   text-teal-700   border-teal-200',
    Marketing:        'bg-orange-50 text-orange-600 border-orange-200',
    Technology:       'bg-blue-50   text-blue-600   border-blue-200',
    Engineering:      'bg-violet-50 text-violet-600 border-violet-200',
    Business:         'bg-green-50  text-green-600  border-green-200',
    Finance:          'bg-yellow-50 text-yellow-600 border-yellow-200',
    Sales:            'bg-pink-50   text-pink-600   border-pink-200',
    'Human Resource': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  } as Record<string, string>,
}

export function getCategoryTag(category: string): string {
  return styles.categoryTag[category] ?? 'bg-gray-50 text-gray-600 border-gray-200'
}
