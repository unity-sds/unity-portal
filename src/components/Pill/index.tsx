export type PillProps = {
  label:string
}

export const Pill = ({
  label
}:PillProps) => {
  return (
    <span className="mdps-pill">{label}</span>
  )
}