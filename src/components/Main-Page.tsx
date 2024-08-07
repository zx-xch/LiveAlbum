/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/FBidyLX0uM6
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Prata } from 'next/font/google'
import { Fraunces } from 'next/font/google'

prata({
  subsets: ['latin'],
  display: 'swap',
})

fraunces({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export const MainPage: any = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/placeholder.svg?height=1080&width=1920')` }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <blockquote className="text-3xl font-bold mb-4">"Music is the universal language of mankind."</blockquote>
          <div className="text-lg">
            <p className="mb-2">- Henry Wadsworth Longfellow</p>
            <p>Album: Poetic Quotes</p>
            <p>Artist: Inspirational Poets</p>
          </div>
        </div>
      </div>
    </div>
  )
}
