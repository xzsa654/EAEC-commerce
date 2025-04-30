<h1>除錯日誌</h1>

# 4/29 手機版白屏問題

fix：從 App.tsx 開始一個一個找，找超久好死不死是 Layout 最後一個 Footer，
裡面實驗性 API 手機 chrome & safari 都不支援

# 4/28 NavBar 的 DropDown 不受到 HeroUI theme 鉤子影響

fix： 整個重構成 React 該有的樣子，不再白目用 querySelect

# 04/20 gsap 首頁的尾部動畫在較長的葉面轉址回來會結束再不同位置

fix：暫無解決，等之後將那段 code 全部重構。
