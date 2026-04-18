import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  // 1. Fetch the Navigation Links (your existing data)
  const headerData = await getCachedGlobal('header', 1)()
  
  // 2. Fetch the Site Settings (where the logo is stored)
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  // 3. Pass both to the Client Component
  return <HeaderClient data={headerData} settings={siteSettings} />
}