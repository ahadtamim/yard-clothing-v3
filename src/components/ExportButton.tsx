'use client'
import React from 'react'

export const ExportButton: React.FC = () => {
  const downloadMonthlyReport = async () => {
    // 1. Fetch current month's orders
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    
    const response = await fetch(`/api/orders?where[createdAt][greater_than_equal]=${firstDay}`)
    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      alert('No orders found for this month.')
      return
    }

    // 2. DYNAMIC IMPORT (This fixes the Vercel Build Error)
    // Inside the download function:
    const XLSX = await import('xlsx')

    // 3. Format data for Excel
    const reportData = data.docs.map((order: any) => ({
      'Order ID': order.orderID,
      'Date': new Date(order.createdAt).toLocaleDateString(),
      'Customer': order.customerName,
      'Phone': order.phone,
      'Email': order.email,
      'Total Amount': order.totalAmount,
      'Status': order.status,
    }))

    // 4. Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(reportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Sales')

    // 5. Trigger Download
    const monthName = now.toLocaleString('default', { month: 'long' })
    XLSX.writeFile(workbook, `Yard_Clothing_Sales_${monthName}_${now.getFullYear()}.xlsx`)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={downloadMonthlyReport}
        type="button"
        style={{
          padding: '10px 15px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          fontWeight: 'bold'
        }}
      >
        Download Monthly Excel
      </button>
    </div>
  )
}