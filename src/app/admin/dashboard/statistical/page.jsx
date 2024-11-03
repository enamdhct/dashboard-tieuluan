'use client'
import React, { useEffect } from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'

export default function page() {

  return (
    <div>
      <TitleTab text={'Thống kê'}></TitleTab>
      <Table></Table>
    </div>
  )
}
