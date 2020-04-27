import { createGlobalStyle } from 'styled-components';

export const IconFontGlobalStyle = createGlobalStyle`
    @font-face {font-family: "iconfont";
      src: url('./iconfont.eot?t=1587973778705'); /* IE9 */
      src: url('./iconfont.eot?t=1587973778705#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAQcAAsAAAAACEwAAAPQAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqEEINaATYCJAMQCwoABCAFhG0HPRtBB8gehXHDXUKJxeTK/dEfD1/7/c7dt99wS6KRoXq1RCKZNKJXEoTupfFLZrqXwNB7vtfmMXnGTXqwlqSDikvqdGkGyMHXQMf//xwzXVqD5bfZXDJaR3sDHCXQQKPqiuwO6AD92G4Yu4nyIA4TaDCiI9VqWQ0JPGRgVCDOTKwWeKR0cg05VJXlkoVZPICSarpTXwXAPf/5+ANJ4UFSKoCJmwelBlDw6fMiHBv5f6RtigD88SzQllFgFpCJo1LbDiyMzcI0OL/jYh5QVZX49HmW9iL8vyjYi6wK/+VRSIIoA4VNYE6SFifGx7xYniYySXyHC26gMIOqmPcI+AIAN+TDkiwNeHlUu4nwlCH0/JATikqWaVEkJYmaouTPC6bmTdmyWJcnK4rmXUTRF9/yInEL0bXb/Bh8aVgX7RFiCtAQDXV88nXVKI1mFL84h9q7EdxuIqacUakuRoq0LAbNXbhoXegChTokEReuqPsuWbyemT85iFyhaE4o2UcuBG8SyaNiRov3PKLk31HiFbn1Ypm8KDaIYiI5d+S8KaHsglHZBXkHD1CO4e35QmzeuXPziBhT9di8eKPCvu2l1tTB/ZuiOhP3pg5Wr1qlHgzZEoeI5D8T1JnyW21LbiGf/7pi2ZxXT6mLdKY8xeV3nlM4lxGvcl2K49rRJu+eRHVB1pNeGuFKePDviFYfW8WAlIcqNzaKaT200+rWmnFNs1PHpk6CljYjS7yjZx0N7B94sjC/dEDQgEGDyqnJ9Y3/dVXnx7RhWzWuZkxMfQE9rnhVythJZPHE5vXGGbDEpSrmQaVrSTMPti6pew/LsawDB9igd0H9e/XuHwQcQEVRxwoA+OdooB+G/anBwdvD7z97++Z89SCuuOnj6o7Zkvc/g378v8Zvzf+9/JY12RUCfc62CPM8e7aWGCWhQQN+aooO98ZwdAOxJVR1vghJxTAUqkaRGTsLJY3moKxqARrMKF/eqBMPE7mGaeMECG12QNLiHQptriEz9i6U9HgLZW2BQYOtCNyw0XiY8GIeaQVkgLpB0KTn7AwyCnhQ3ITYflYtnxRyCo14pykIE+MSsslyZEf8GFOc/dkkQWAgw3M2WCYch6xWDjp4zoz0QpxREBxZ8fFM2RfF6TkbwK3gIVoCxADSGQQy0ePYMbSxAM99fxOE1Y+VFl9T1WGlITwnU+9QojgJLZDlMnurqmt5xqk/VhKBgAExeBwbqEywIFYY40CO8n5miJ4gjrFHxCFLvFSPaSuLm19he8Jd0ADclCNFETlKyudcP2c/Tl2odR1oQoNNAAA=') format('woff2'),
      url('./iconfont.woff?t=1587973778705') format('woff'),
      url('./iconfont.ttf?t=1587973778705') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('./iconfont.svg?t=1587973778705#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`