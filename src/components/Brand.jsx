const LOGO_SRC = '/assets/glogo.png'

export default function Brand({ small = false }) {
  return <a className={`brand ${small ? 'brand--small' : ''}`} href="#home" aria-label="GETAM Cine World homepage">
    <img className="brand-logo" src={LOGO_SRC} alt="GETAM Cine World" />
  </a>
}
