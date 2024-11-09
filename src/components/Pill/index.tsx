export type PillProps = {
  label:string
}

export const Pill = ({
  label
}:PillProps) => {
  return (
    <span className="unity-pill">{label}</span>
  )
}