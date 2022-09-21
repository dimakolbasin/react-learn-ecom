import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="124" />
    <rect x="0" y="276" rx="10" ry="10" width="280" height="32" />
    <rect x="0" y="327" rx="10" ry="10" width="280" height="88" />
    <rect x="124" y="430" rx="10" ry="10" width="152" height="45" />
    <rect x="-1" y="445" rx="10" ry="10" width="92" height="30" />
  </ContentLoader>
)

export default PizzaSkeleton
