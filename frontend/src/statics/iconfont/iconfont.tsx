import { createGlobalStyle } from 'styled-components';

export const IconFontGlobalStyle = createGlobalStyle`
    @font-face {font-family: "iconfont";
        src: url('./iconfont.eot?t=1588037321859'); /* IE9 */
        src: url('./iconfont.eot?t=1588037321859#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAATsAAsAAAAACZwAAASdAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqGOIVDATYCJAMUCwwABCAFhG0HShtRCMgekiSBUAkUACiAglVyPHy/9jv37dv9imiDJJoYMj6dRCKqVK8kKZkS+CUz3TP5z/ebegmVPFIXaupIbRI5iJMBE0/nqjR8ze1b898f4H8OlzZtg81vtV3mGBSVZWmCge3N83mggwLjA7pleNVB7sZpAk3jksk2a5txoJDp6sB1p3pGBRQJi1xBDnV9VbAyixdQqqcn+T3As/f9+AOLoSApC/rMrf0aLSj/dPsYiNj+2+w4CCDtzwV2HQUWAJm4LvScQoLMAkRTTjlYBZTf6pL06fY+9/3Qj4H/gRQr0jUND7mXP7xEVHRNG2NXs5lPN0sSaXOxSYG1QzGT4DswK+G8VtJEL7qJXaDjJvBUkiz17j44GOSiqI+0Apf65vitWOtPrdy+epUPvsw18Ta5Ys3anb7E8tU+y1Sow2cFaEdaFHHlVYkaHCRsITUbZXb7kEsi6pSQA8G1q0BBH0mixpMr/C5KMlpUUySH5kply/sJzd27Ri1ppIYvIoru6LYLjhqVPb0rwtB1Ad2qs8q5QDOaHXTOA9kARQ2gc4qJY7vA427l3Ksy2Y1NJO2iz7JVq7f7r5SI04PKm3f9Y9eu2UGvmOODb5Soi1LR2Zu+u0X8nJgPuNpZqeyplCbZY9fY8Vtiuyhm4Mtsy+f6MysHQms85vXWrlit2qG9XuMm1XyygqcXrai5BnesVq2o7Z33rkYhBN5r2u0pz8+X62q7t2uvuU8RWj/TYA+T1lt9cFpdC7DJ9+6V22Knzt+Tgqy+d68l8cjo/OocWmDe6uaw3VcjQ8AmKrMFFK2WnjpJWCclchXI8uvXl9tKhLEiy6OdKkYkDsYSp07sDulSPp83Tr55s3ycISQiW0H986BD1z2Or34M3f6rq+yG0jZCXqnWl0oOv5d54Xp+msxxLZVNIPWuQ5RN5YVvh1LC3UDf30Exv2LCQPZLoxMTQsdOSNkSS03vXJIzLWc2ZoyzVbuGvp7zHuV9qaKsZrTP6LFj64g5bR3/1Y03psYxMR1baD3dVk5Or9qcPW02XjUrsk23EKt2aAx72eBYHaFgWjP7+o3nC0+eZHy++4waOmyUDxgD6J6c0h9A0UHKAejy0MA6EflSLg3O3m5mD3Mv/le0Mvi4v/M2Lvs/Wd5O8tVogaWflymDCsQKRa5byiyJiiWe1GoUKO34eHyJL8nQxYFBz/vRjYBrCXUjESQ1Y1Com0Bm7AKUWpagUrcCTfPq1rcM4SAiNzBnOoLQ7yAkvd6h0O8+MmOfQWnUN6j0BwJN2+G9Y8tU6NEqDqoEqMXUYzG9hrXQpl1A/fpOyIw0qbi43KOQkOP1cSwjNT2dr4MWyPUxhx/FZAoCjdEca8Zq0XnQZGIxK8caoEZI1QmCtTAtjS56UKqGNQPUBg6kIoC0MGpjYfQ0WBa0012AZj7fCWKMZKLCVTSVBUkQh6fvHZMhVToAWaexgJrOpT9vFEYmgYCmxtE4LDNMLXZBJiPDwliLhxlAGoJUuhYpq0JppB0N1aSOrzNfY+m/3VI/pIwUReQoo9I8HKmyjNU7Bzjx7Eh+JCuvUDmO0cNxegAAAAAA') format('woff2'),
        url('./iconfont.woff?t=1588037321859') format('woff'),
        url('./iconfont.ttf?t=1588037321859') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url('./iconfont.svg?t=1588037321859#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`