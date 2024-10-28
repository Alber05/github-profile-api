import { useState } from 'react'

export default function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const firstIndex = (currentPage - 1) * itemsPerPage
  const lastIndex = firstIndex + itemsPerPage

  const page = data.slice(firstIndex, lastIndex)

  return { page, setCurrentPage, currentPage, itemsPerPage }
}
