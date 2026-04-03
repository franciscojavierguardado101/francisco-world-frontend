export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const textColor = variant === 'dark' ? '#ffffff' : '#0a0a0a';
  const subColor = variant === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
  const ghostColor = variant === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

  return (
    <svg
      viewBox="0 0 220 52"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Francisco Guardado"
      role="img"
    >
      <text
        x="0"
        y="44"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="52"
        fontWeight="700"
        fill={ghostColor}
        style={{ userSelect: 'none' }}
      >
        FG
      </text>
      <text
        x="0"
        y="28"
        fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-0.04em"
        style={{ userSelect: 'none' }}
      >
        Francisco Guardado
      </text>
      <rect x="0" y="34" width="50" height="2" rx="1" fill="#1DB954" />
      <text
        x="0"
        y="48"
        fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="8"
        fill={subColor}
        letterSpacing="0.2em"
        style={{ userSelect: 'none' }}
      >
        FULL STACK DEV OPS ARTIST
      </text>
    </svg>
  );
}
