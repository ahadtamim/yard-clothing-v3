{/* FINAL CLEAN FOOTER */}
<footer className="bg-black text-white pt-20 pb-10 px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
    <div>
      <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Support</h4>
      <p className="text-sm">WhatsApp / Call:</p>
      <p className="text-xl font-bold tracking-tighter">+880 1XXX-XXXXXX</p>
      <Link href="#" className="text-blue-400 text-xs mt-4 inline-block hover:underline">
        Follow us on Facebook
      </Link>
    </div>
    
    <div className="md:text-right">
      <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Policies</h4>
      <ul className="space-y-2 text-xs uppercase tracking-widest text-gray-300">
        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
        <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
        <li><Link href="/returns" className="hover:text-white">Return & Refund Policy</Link></li>
      </ul>
    </div>
  </div>

  <div className="border-t border-white/10 pt-8 text-center">
    <p className="text-[9px] uppercase tracking-[0.5em] text-gray-500">
      © 2026 Yard Clothing. All Rights Reserved.
    </p>
  </div>
</footer>