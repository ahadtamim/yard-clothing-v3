'use client'
import React from 'react'
import { useConfig } from '@payloadcms/ui'
import * as XLSX from 'xlsx'

export const ExportButton: React.FC = () => {
  const { config } = useConfig()

  const downloadMonthlyReport = async () => {
    // 1. Fetch current month's orders from the API
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    
    const response = await fetch(`/api/orders?where[createdAt][greater_than_equal]=${firstDay}`)
    const data = await response.json()

    if (!data.docs || data.docs.length === 0) {
      alert('No orders found for this month.')
      return
    }

    // 2. Format data for Excel
    const reportData = data.docs.map((order: any) => ({
      'Order ID': order.orderID,
      'Date': new Date(order.createdAt).toLocaleDateString(),
      'Customer': order.customerName,
      'Phone': order.phone,
      'Email': order.email,
      'Total Amount': order.totalAmount,
      'Status': order.status,
    }))

    // 3. Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(reportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Monthly Sales')

    // 4. Trigger Download
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