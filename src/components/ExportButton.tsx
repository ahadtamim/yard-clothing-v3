'use client'
import React from 'react'

export const ExportButton: React.FC = () => {
  const downloadMonthlyReport = async () => {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    
    const response = await fetch(`/api/orders?where[createdAt][greater_than_equal]=${firstDay}`)
    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      alert('No orders found for this month.')
      return
    }

    const XLSX = await import('xlsx')
    const reportData = data.docs.map((order: any) => ({
      'Order ID': order.orderID,
      'Date': new Date(order.createdAt).toLocaleDateString(),
      'Customer': order.customerName,
      'Total Amount': order.totalAmount,
    }))

    const worksheet = XLSX.utils.json_to_sheet(reportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Sales')
    XLSX.writeFile(workbook, `Yard_Sales_${now.getFullYear()}.xlsx`)
  }

  return (
    <button onClick={downloadMonthlyReport} type="button" style={{ /* your styles */ }}>
      Download Monthly Excel
    </button>
  )
}