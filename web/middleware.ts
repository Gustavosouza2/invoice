import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const token = req.cookies.get('token')

  const publicRoutes = ['/login']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Skip session verification for static assets and API routes
    if (pathname.includes('/api/') || pathname.includes('/_next/')) {
      return NextResponse.next()
    }

    try {
      const supabase = await createSupabaseServerClient()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session) {
        const response = NextResponse.redirect(new URL('/login', req.url))
        response.cookies.delete('token')
        response.cookies.delete('userData')
        return response
      }
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
