import { NextRequest, NextResponse } from 'next/server'

import { routes } from './constants/routes'
import { createClient } from './lib/supabase/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = await createClient()

  const { data } = await supabase.auth.getClaims()

  const user = data?.claims
  const authRoutes = [routes.signIn, routes.signUp]
  const isAuthPage = authRoutes.includes(request.nextUrl.pathname)

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL(routes.signIn, request.url))
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL(routes.chat, request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
