import { LucideIcon, LucideProps } from 'lucide-react'

export type Icon = keyof LucideIcon

export const Icons = {
  home: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.00001 13H4.00001V15V20C4.00001 21.103 4.89701 22 6.00001 22H18C19.103 22 20 21.103 20 20V15V13H21C21.404 13 21.77 12.756 21.924 12.383C22.079 12.009 21.993 11.579 21.707 11.293L12.707 2.293C12.316 1.902 11.684 1.902 11.293 2.293L2.29301 11.293C2.00701 11.579 1.92101 12.009 2.07601 12.383C2.23001 12.756 2.59601 13 3.00001 13ZM12 4.414L18 10.414V15L18.001 20H6.00001V15V12V10.414L12 4.414Z"
        fill="#fafafaaf"
      />
      <path
        d="M12 18C15.703 18 16.901 14.461 16.95 14.311L15.05 13.69C15.042 13.713 14.269 16 12 16C9.762 16 8.98 13.779 8.949 13.684L7.05 14.311C7.099 14.461 8.297 18 12 18Z"
        fill="#fafafaaf"
      />
    </svg>
  ),
  customer: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10ZM21 21V20C21 16.141 17.859 13 14 13H10C6.14 13 3 16.141 3 20V21H5V20C5 17.243 7.243 15 10 15H14C16.757 15 19 17.243 19 20V21H21Z"
        fill="#fafafaaf"
      />
    </svg>
  ),
  orders: (props: LucideProps) => (
    <svg
      width="20"
      fill="none"
      height="20"
      viewBox="0 0 39 38"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_7_12136)">
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.90259 23H30.5026V24.5C30.5026 25.5609 30.0811 26.5783 29.331 27.3284C28.5808 28.0786 27.5634 28.5 26.5026 28.5H11.9026C10.8417 28.5 9.8243 28.0786 9.07416 27.3284C8.32401 26.5783 7.90259 25.5609 7.90259 24.5V23Z"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M27.8026 16.9H30.4027C30.805 16.8866 31.2058 16.9543 31.5814 17.099C31.957 17.2437 32.2997 17.4626 32.5889 17.7425C32.8782 18.0224 33.1081 18.3577 33.2651 18.7284C33.4221 19.099 33.5029 19.4975 33.5026 19.9C33.5026 20.7222 33.176 21.5106 32.5947 22.092C32.0133 22.6734 31.2248 23 30.4027 23H8.00264C7.60012 23.0002 7.20169 22.9194 6.83104 22.7625C6.46039 22.6055 6.12509 22.3755 5.84517 22.0862C5.56525 21.797 5.34639 21.4544 5.20165 21.0788C5.0569 20.7032 4.98922 20.3023 5.00264 19.9C4.98867 19.5023 5.05674 19.1059 5.20256 18.7356C5.34838 18.3653 5.56886 18.029 5.85027 17.7476C6.13168 17.4662 6.46798 17.2457 6.83827 17.0999C7.20857 16.9541 7.60491 16.886 8.00264 16.9H16.8027"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M33.5026 14.9C33.4951 15.4275 33.2795 15.9307 32.9027 16.3C32.7273 16.4963 32.5111 16.6517 32.2692 16.7554C32.0273 16.8591 31.7657 16.9084 31.5026 16.9H26.3027L22.9027 20.8L19.5026 16.9H6.90266C6.6445 16.9004 6.38897 16.8481 6.15168 16.7464C5.91439 16.6448 5.7003 16.4958 5.5225 16.3086C5.3447 16.1215 5.20691 15.9 5.11753 15.6579C5.02815 15.4157 4.98905 15.1578 5.00263 14.9C4.98905 14.6422 5.02815 14.3843 5.11753 14.1422C5.20691 13.9 5.3447 13.6785 5.5225 13.4914C5.7003 13.3042 5.91439 13.1553 6.15168 13.0536C6.38897 12.9519 6.6445 12.8996 6.90266 12.9H31.5026C32.0331 12.9 32.5418 13.1107 32.9169 13.4858C33.292 13.8609 33.5026 14.3696 33.5026 14.9Z"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5026 4H22.0026C24.2834 4 26.4709 4.90606 28.0837 6.51888C29.6965 8.13169 30.6026 10.3191 30.6026 12.6H7.90259C7.90259 10.3191 8.80863 8.13169 10.4214 6.51888C12.0343 4.90606 14.2217 4 16.5026 4Z"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.6027 8.5L14.8027 9.8"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M24.4026 8L25.7026 9.39999"
        />
        <path
          strokeWidth="2"
          stroke="#F8F2F2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.4026 8.59999L19.8026 7.29999"
        />
      </g>
      <defs>
        <filter
          x="-1"
          y="0"
          width="40"
          height="40"
          id="filter0_d_7_12136"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7_12136"
          />
          <feBlend
            mode="normal"
            result="shape"
            in="SourceGraphic"
            in2="effect1_dropShadow_7_12136"
          />
        </filter>
      </defs>
    </svg>
  ),
  menu: (props: LucideProps) => (
    <svg
      width="20"
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM5 4C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5ZM7 7.96948C7 7.4172 7.44772 6.96948 8 6.96948H16C16.5523 6.96948 17 7.4172 17 7.96948C17 8.52177 16.5523 8.96948 16 8.96948H8C7.44772 8.96948 7 8.52177 7 7.96948ZM7 11.9695C7 11.4172 7.44772 10.9695 8 10.9695H16C16.5523 10.9695 17 11.4172 17 11.9695C17 12.5218 16.5523 12.9695 16 12.9695H8C7.44772 12.9695 7 12.5218 7 11.9695ZM7 15.9695C7 15.4172 7.44772 14.9695 8 14.9695H16C16.5523 14.9695 17 15.4172 17 15.9695C17 16.5218 16.5523 16.9695 16 16.9695H8C7.44772 16.9695 7 16.5218 7 15.9695Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#fafafaaf"
      />
    </svg>
  ),
}
