import React, { FC, ReactElement } from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export const MainLogo: FC<Props> = ({
  width = 57,
  height = 60,
  className,
  color = "#fff",
}: Props): ReactElement => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 53 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M47.4403 33.8707C46.9045 34.5738 46.3334 35.2495 45.7292 35.8954C45.795 36.9867 45.4677 38.0656 44.8061 38.9384C44.1444 39.8112 43.1918 40.4207 42.1192 40.6575L35.48 42.1215C35.0105 42.2461 34.5306 42.3534 34.0402 42.4399L16.9118 46.2469C15.7652 46.499 14.5651 46.3064 13.5563 45.7084C12.5474 45.1103 11.8059 44.1517 11.4829 43.0282C9.6026 36.5284 8.40217 29.8527 7.90069 23.1074C7.81051 21.9253 7.48304 20.7732 6.93765 19.7192C6.39226 18.6653 5.64002 17.7309 4.72542 16.9712C4.11603 16.4984 3.67976 15.8393 3.48383 15.0954C2.09269 8.86585 12.0115 5.3219 20.5705 3.4288C26.302 2.16212 32.8994 1.32112 37.052 2.76431C37.5528 2.22441 38.0293 1.68451 38.471 1.13423C34.6453 -0.482 28.5208 -0.374713 20.1358 1.48032C8.3076 4.10021 2.02313 7.96948 1.39712 13.0189C0.0477137 15.0954 -0.233991 17.172 0.169439 18.9889C0.403379 19.9457 0.950245 20.7979 1.72404 21.4116C2.53723 22.0867 3.20681 22.9166 3.69353 23.8526C4.18025 24.7886 4.47431 25.8119 4.55848 26.8624C5.0645 33.6714 6.27778 40.41 8.17892 46.9702C8.57638 48.3338 9.48075 49.4956 10.7082 50.2195C11.9356 50.9434 13.394 51.1749 14.7868 50.8671L40.0012 45.2951C40.8497 45.1083 41.6429 44.7273 42.3178 44.1825C42.9927 43.6376 43.5308 42.9438 43.8894 42.1561C45.1951 41.5573 46.269 40.5511 46.9481 39.2901C47.6272 38.0291 47.8745 36.5821 47.6525 35.1686C47.5933 34.7221 47.5134 34.2964 47.4403 33.8707Z"
      fill={color}
    />
    <path
      d="M18.3012 43.5863C17.6327 43.1777 17.8327 42.4215 17.8327 42.4215L20.6417 36.0488C20.6417 36.0488 17.8251 25.8469 21.8845 17.4193C25.9438 8.99177 34.1481 2.96632 52.6683 3.31518C52.6683 3.31518 58.0753 40.6466 25.159 38.3907C25.159 38.3907 31.0425 20.205 39.2463 15.2137C39.2463 15.2137 32.6793 15.6846 23.0104 37.1193L20.0071 43.1777C19.6108 43.8361 18.9697 43.9949 18.3012 43.5863Z"
      fill={color}
    />
  </svg>
);