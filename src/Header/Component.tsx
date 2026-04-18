import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

/**
 * Header Server Component
 * Fetches global navigation and site-wide settings (Logo, Brand Name)
 */
export async function Header() {
  // 1. Fetch the Navigation Links
  // Ensure 'header' matches your Global slug in Payload
  const headerData = await getCachedGlobal('header', 1)()
  
  // 2. Fetch the Site Settings
  // This is where your Yard Logo (Media) and Branding should be stored
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  // 3. Pass both to the Client Component for rendering
  // HeaderClient will handle the sticky behavior and mobile menu
  return <HeaderClient data={headerData} settings={siteSettings} />
}