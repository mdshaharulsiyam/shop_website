import React, { useEffect, useRef } from 'react'

type Props = {
  onCredential: (credential: string) => void
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  size?: 'large' | 'medium' | 'small'
}

const GoogleLoginButton: React.FC<Props> = ({ onCredential, text = 'signin_with', size = 'large' }) => {
  const btnRef = useRef<HTMLDivElement | null>(null)
  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (!clientId) {
      // eslint-disable-next-line no-console
      console.warn('VITE_GOOGLE_CLIENT_ID is not set')
      return
    }

    const existing = document.getElementById('google-identity') as HTMLScriptElement | null
    const load = () => {
      if (!(window as any).google || !(window as any).google.accounts) return
      const google = (window as any).google
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (resp: any) => {
          if (resp?.credential) onCredential(resp.credential)
        },
      })
      if (btnRef.current) {
        btnRef.current.innerHTML = ''
        google.accounts.id.renderButton(btnRef.current, {
          theme: 'outline',
          size,
          width: 320,
          text,
          shape: 'pill',
          logo_alignment: 'left',
        })
      }
    }

    if (existing) {
      if ((window as any).google) load()
      else existing.addEventListener('load', load, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.id = 'google-identity'
    script.onload = load
    document.head.appendChild(script)

    return () => {
      // no cleanup needed for GIS script
    }
  }, [clientId, onCredential, size, text])

  return (
    <div ref={btnRef} />
  )
}

export default GoogleLoginButton
