// Tracks in "Teeblix's Design Vibez" (https://open.spotify.com/playlist/73ZmBB4LZ3vrUz0g95rR4R).
// Snapshot of the playlist; refresh with scripts/refresh-playlist.mjs.
export const PLAYLIST_NAME = "Teeblix's Design Vibez";
export const PLAYLIST_URL = "https://open.spotify.com/playlist/73ZmBB4LZ3vrUz0g95rR4R";

export interface Track {
  uri: string;
  title: string;
  artist: string;
  /** Spotify's 30-second clip for the track. */
  preview: string;
}

export const TRACKS: Track[] = [
  {
    "uri": "spotify:track:3CRDbSIZ4r5MsZ0YwxuEkn",
    "title": "Stressed Out",
    "artist": "Twenty One Pilots",
    "preview": "https://p.scdn.co/mp3-preview/d01bb6b4b9952d95d2609632474cda8e632e044d"
  },
  {
    "uri": "spotify:track:5mVfq3wn79JVdHQ7ZuLSCB",
    "title": "All In",
    "artist": "Nasty C, T.I.",
    "preview": "https://p.scdn.co/mp3-preview/1b73e769ba4ad1d2f5227de8fb8e22ea9d756870"
  },
  {
    "uri": "spotify:track:2CWLbhbetnGxB7JnOK3LNJ",
    "title": "Hey There (feat. Future)",
    "artist": "DeJ Loaf, Future",
    "preview": "https://p.scdn.co/mp3-preview/2152cd9a4b3e39d2e626fa278ddb79e85d999336"
  },
  {
    "uri": "spotify:track:1e5O3SrnSLWnj47I29Arj0",
    "title": "Eazy",
    "artist": "Nasty C",
    "preview": "https://p.scdn.co/mp3-preview/c1e52a623454b74271a52d3e4420b4d9d2c9525e"
  },
  {
    "uri": "spotify:track:6nLb9zVBJgNBNNyKS5VYG3",
    "title": "Pastor Pop Smoke",
    "artist": "STUDIO LYF, iamTresor",
    "preview": "https://p.scdn.co/mp3-preview/ebab85bf471e1e4360c250ebc6354bd7eac93f6a"
  },
  {
    "uri": "spotify:track:0VCKfuHfcNUEoRk135xhkb",
    "title": "Zone",
    "artist": "Nasty C, Tellaman",
    "preview": "https://p.scdn.co/mp3-preview/ac4144b605a0cc93edda961390733eab5841f0d2"
  },
  {
    "uri": "spotify:track:2T6IQZOIFICNmoFE6DfC61",
    "title": "Stalling (Bonus Track)",
    "artist": "Nasty C",
    "preview": "https://p.scdn.co/mp3-preview/0b49f49aa063d2499765f952304a19f9486c814e"
  },
  {
    "uri": "spotify:track:62X6VksvhFQn26NHIaEyTx",
    "title": "Temptations (feat. Manana)",
    "artist": "Nasty C, Manana",
    "preview": "https://p.scdn.co/mp3-preview/5f839618ba68cedc7de07c33679c40e81e861c88"
  },
  {
    "uri": "spotify:track:4VMiNOpnjRwSCwmHaUfOMM",
    "title": "Realer N Realer",
    "artist": "Future, Juice WRLD",
    "preview": "https://p.scdn.co/mp3-preview/f4cc4101642292df50576b958b3147183064781b"
  },
  {
    "uri": "spotify:track:6T7FXSuXykeGktMLGp8WgE",
    "title": "All My Life (feat. J. Cole)",
    "artist": "Lil Durk, J. Cole",
    "preview": "https://p.scdn.co/mp3-preview/91851052d68c541a387c478ee7991eebf34a40b8"
  },
  {
    "uri": "spotify:track:3B54sVLJ402zGa6Xm4YGNe",
    "title": "Unforgettable",
    "artist": "French Montana, Swae Lee",
    "preview": "https://p.scdn.co/mp3-preview/f8d5e3c37feb980e60cac2df4256250d4b5cf5b5"
  },
  {
    "uri": "spotify:track:57AlxjJrWpWg0vF7eGksir",
    "title": "Start Over (feat. NF)",
    "artist": "FLAME, NF",
    "preview": "https://p.scdn.co/mp3-preview/e748c351b3c9fc7fa66e96238b66ff5e337e40b1"
  },
  {
    "uri": "spotify:track:0pVhKHAruxCKZ0tNxwpiQO",
    "title": "LESS U KNOW",
    "artist": "Layto, Ryan Oakes",
    "preview": "https://p.scdn.co/mp3-preview/eb80f9e6982d0ff6da416eb8b3d88c617744fe8f"
  },
  {
    "uri": "spotify:track:7cVufRmSWo6ogfYyuAJC0w",
    "title": "Never With You Again",
    "artist": "Chri$tian Gate$",
    "preview": "https://p.scdn.co/mp3-preview/8c1c7c8e0c67e34105939ff134d8046f7316b730"
  },
  {
    "uri": "spotify:track:10xV5l9nhLvFpR8mqzs0bL",
    "title": "Numb",
    "artist": "Marshmello, Khalid",
    "preview": "https://p.scdn.co/mp3-preview/6e5fe36b5436d7e0355114f954f19b557cd81058"
  },
  {
    "uri": "spotify:track:09G9LfMjHSPvcFp78JT7yG",
    "title": "Alone",
    "artist": "Trevor Daniel",
    "preview": "https://p.scdn.co/mp3-preview/132688f5e01665947ca6631a09d9b62d0748ac0b"
  },
  {
    "uri": "spotify:track:6Tt9PBM6oWGwVnxyzuM84j",
    "title": "jaded",
    "artist": "sadeyes",
    "preview": "https://p.scdn.co/mp3-preview/e9e4c76aff51cae78e277718a9bc51d65224c73e"
  },
  {
    "uri": "spotify:track:2oeMjGwvO0mDjEYGxO1iLG",
    "title": "WHEN THE DEVIL CRIES",
    "artist": "347aidan",
    "preview": "https://p.scdn.co/mp3-preview/fc1df895271c5a795b522e4c96db5c6f3df1e5dc"
  },
  {
    "uri": "spotify:track:4MSmRBs920YvYh4eYdE8lD",
    "title": "falling apart (die young VIP)",
    "artist": "BODAH REVY",
    "preview": "https://p.scdn.co/mp3-preview/3ade6eff781626c8053d9c0ad4f8f5b533e3a26e"
  },
  {
    "uri": "spotify:track:15AGcabJTNLdLc01X3OoO9",
    "title": "starstruck",
    "artist": "Arden Jones",
    "preview": "https://p.scdn.co/mp3-preview/86602785e44960a0f0da4ebdb3a0175c12f65a56"
  },
  {
    "uri": "spotify:track:3TfJtvgXTC0BIsRGXD3SLz",
    "title": "On & On",
    "artist": "Thekidszn",
    "preview": "https://p.scdn.co/mp3-preview/5c7ea654703a32dbdc64a18893ecf273beefbbde"
  },
  {
    "uri": "spotify:track:1yP6g2Ka4CisR3i2cuIcjK",
    "title": "FEEL SOMETHING (feat. Marshmello)",
    "artist": "The Kid LAROI, Marshmello",
    "preview": "https://p.scdn.co/mp3-preview/063f8e45a7479e27caebfd39d5d4393c80efd23e"
  },
  {
    "uri": "spotify:track:2Lle3tbO97Dd4I3deOZ92g",
    "title": "She Likes My Tattoos",
    "artist": "Pardyalone",
    "preview": "https://p.scdn.co/mp3-preview/b2739d5a5dd78b95b54b84946253cab28ac5e5fd"
  },
  {
    "uri": "spotify:track:2iWDeE7fZyCsxAbqaiNCnM",
    "title": "Without You",
    "artist": "Ollie",
    "preview": "https://p.scdn.co/mp3-preview/902654ff1e72c7f6c143bb02290c7b51e4b3e9b7"
  },
  {
    "uri": "spotify:track:1r8ZCjfrQxoy2wVaBUbpwg",
    "title": "THOUSAND MILES",
    "artist": "The Kid LAROI",
    "preview": "https://p.scdn.co/mp3-preview/ae7d7a59dbcc52238713960cbc61ae955985d25c"
  },
  {
    "uri": "spotify:track:7KW1AtQKFToSoF1kmyk2wE",
    "title": "snowflake (feat. Jaden & Sarcastic Sounds)",
    "artist": "Powfu, Jaden, Sarcastic Sounds",
    "preview": "https://p.scdn.co/mp3-preview/815a2259a0f9a3a9563a45126e4ec8e6bfe0160d"
  },
  {
    "uri": "spotify:track:5XQkLMeRBFzb8zq3Gkr23N",
    "title": "A Place For Us",
    "artist": "Pardyalone",
    "preview": "https://p.scdn.co/mp3-preview/5af51e8c69783d60bb2a1006a5ba82a9e416f851"
  },
  {
    "uri": "spotify:track:5ypAP72387351HVZfZoWAO",
    "title": "Auburn Skies",
    "artist": "Ollie",
    "preview": "https://p.scdn.co/mp3-preview/547024f793220a12533a0c6d32f7b81dd268abc6"
  },
  {
    "uri": "spotify:track:1T4tQ4SSagbhAKpvcWg035",
    "title": "ay! (feat. Lil Wayne)",
    "artist": "mgk, Lil Wayne",
    "preview": "https://p.scdn.co/mp3-preview/56a6e78264b5832fccf507b298b9f3fd68cef1fc"
  },
  {
    "uri": "spotify:track:72fp5rYlQIZ3Dqtwq2uVy0",
    "title": "watch me miss (feat. Jomie)",
    "artist": "Powfu, Jomie",
    "preview": "https://p.scdn.co/mp3-preview/04e94bf5b7697b6b228efe2c279fff22f7f401df"
  },
  {
    "uri": "spotify:track:2dpaYNEQHiRxtZbfNsse99",
    "title": "Happier",
    "artist": "Marshmello, Bastille",
    "preview": "https://p.scdn.co/mp3-preview/a23fe33122a12a302b97c443ab82473ce55df8fd"
  },
  {
    "uri": "spotify:track:6FuGJB290AQMAHTfjOYVaK",
    "title": "Mood (Remix) feat. Justin Bieber, J Balvin & iann dior",
    "artist": "24kGoldn, Justin Bieber, J Balvin, iann dior",
    "preview": "https://p.scdn.co/mp3-preview/bfbb5296353e2597588364f16c112720b2a67a69"
  },
  {
    "uri": "spotify:track:4SVvpjmHsFKmXBcdsG5B84",
    "title": "Ride for Me",
    "artist": "B Young",
    "preview": "https://p.scdn.co/mp3-preview/7c5c9ead5b1d70b119696b89b1a2b59f5a0c3889"
  },
  {
    "uri": "spotify:track:67BtfxlNbhBmCDR2L2l8qd",
    "title": "MONTERO (Call Me By Your Name)",
    "artist": "Lil Nas X",
    "preview": "https://p.scdn.co/mp3-preview/8e15d9d90965a3f36a9174af1d3c62a5ea6b551f"
  },
  {
    "uri": "spotify:track:2kHrlDvECzPyjcbmSQNusl",
    "title": "F*ck Love",
    "artist": "Lund",
    "preview": "https://p.scdn.co/mp3-preview/7ac8a0f1af757b3dd8dbb3428bd786b794ef1be8"
  },
  {
    "uri": "spotify:track:6zFMeegAMYQo0mt8rXtrli",
    "title": "HOLIDAY",
    "artist": "Lil Nas X",
    "preview": "https://p.scdn.co/mp3-preview/b79453d395e3102f2ea7ccd14a13b7deba8f571b"
  },
  {
    "uri": "spotify:track:3KkXRkHbMCARz0aVfEt68P",
    "title": "Sunflower - Spider-Man: Into the Spider-Verse",
    "artist": "Post Malone, Swae Lee",
    "preview": "https://p.scdn.co/mp3-preview/801a664529525b366fa6fb8f6cacd5dd83928272"
  },
  {
    "uri": "spotify:track:6UelLqGlWMcVH1E5c4H7lY",
    "title": "Watermelon Sugar",
    "artist": "Harry Styles",
    "preview": "https://p.scdn.co/mp3-preview/d848490c8e2807443dfe1550dd4e89fbcb1d9f6f"
  },
  {
    "uri": "spotify:track:3Ofmpyhv5UAQ70mENzB277",
    "title": "Astronaut In The Ocean",
    "artist": "Masked Wolf",
    "preview": "https://p.scdn.co/mp3-preview/e89e477c2467c477031561ff801c055c5777de4f"
  },
  {
    "uri": "spotify:track:1v1oIWf2Xgh54kIWuKsDf6",
    "title": "Runaway",
    "artist": "AURORA",
    "preview": "https://p.scdn.co/mp3-preview/6ca36d5185d8a6f9fa1355d7f4d45f2a9922eb97"
  },
  {
    "uri": "spotify:track:23OXdR7YuUBVWh5hSnYJau",
    "title": "Chlorine",
    "artist": "Twenty One Pilots",
    "preview": "https://p.scdn.co/mp3-preview/08d5802772357860f04dfafedda7035bcc374bfa"
  },
  {
    "uri": "spotify:track:4Q2SJQAfMAiZHzJwkPdyzP",
    "title": "Nicotine",
    "artist": "Trevor Daniel",
    "preview": "https://p.scdn.co/mp3-preview/3e34146872ef29d340ea96aa25e99613dae48d9d"
  },
  {
    "uri": "spotify:track:1rtruNH8PeMYzqahfPwKcG",
    "title": "Anymore",
    "artist": "Trevor Daniel",
    "preview": "https://p.scdn.co/mp3-preview/5dbadc0f0360ffa63d196eca28a68074a88e38a6"
  },
  {
    "uri": "spotify:track:4diyebxP3d2kBRTfaHh6Sz",
    "title": "OMG",
    "artist": "Trevor Daniel",
    "preview": "https://p.scdn.co/mp3-preview/96d1161efb53fb3dfa76c212b525316ce37953d9"
  },
  {
    "uri": "spotify:track:5mAhdoBJmFt3dCqB5VvCgn",
    "title": "Falling",
    "artist": "Trevor Daniel",
    "preview": "https://p.scdn.co/mp3-preview/0d911f7650ed127fbbdd7ec6a44ec5d642d1896a"
  },
  {
    "uri": "spotify:track:03x2rVJRFUrvwlfxoHd9Mo",
    "title": "Just You and I",
    "artist": "Tom Walker",
    "preview": "https://p.scdn.co/mp3-preview/5637144be05c61bff30244133dac3912771d0cd9"
  },
  {
    "uri": "spotify:track:3cMAS9DjZHrAnKvPrTIw7Z",
    "title": "Wait for You (feat. Zoe Wees)",
    "artist": "Tom Walker, Zoe Wees",
    "preview": "https://p.scdn.co/mp3-preview/7f04a40e24f41dd6a569b36755faec80ba631397"
  },
  {
    "uri": "spotify:track:0zw8UN1hqvbq5YNyRcb4Sf",
    "title": "Night Rider",
    "artist": "Masked Wolf",
    "preview": "https://p.scdn.co/mp3-preview/fee08a36bae1bf07c887ec4d3227cb9d9b4cd6ff"
  },
  {
    "uri": "spotify:track:6N22FZs2ZhPBYi3b9XPajV",
    "title": "Still Don't Know My Name (From \"Euphoria: Season 1\" Soundtrack)",
    "artist": "Labrinth",
    "preview": "https://p.scdn.co/mp3-preview/215523248032ef0b529c4a722680dc2081f14f3f"
  },
  {
    "uri": "spotify:track:2RSHsoi04658QL5xgQVov3",
    "title": "Bad Liar",
    "artist": "Imagine Dragons",
    "preview": "https://p.scdn.co/mp3-preview/56413ec463879763e7f9f347f82675e2cff6654c"
  },
  {
    "uri": "spotify:track:2A9h3EvZynC0jeiLNcnoWB",
    "title": "Washed Up",
    "artist": "Cheat Codes",
    "preview": "https://p.scdn.co/mp3-preview/510cae8c1862e15180809eb466b6a772289bbda2"
  },
  {
    "uri": "spotify:track:2YpeDb67231RjR0MgVLzsG",
    "title": "Old Town Road (feat. Billy Ray Cyrus) - Remix",
    "artist": "Lil Nas X, Billy Ray Cyrus",
    "preview": "https://p.scdn.co/mp3-preview/6d51966d496e703bd512b63793235fafcaf7173b"
  },
  {
    "uri": "spotify:track:0izUjTuDrUy2FgQOSRALSU",
    "title": "Lockdown",
    "artist": "Original Koffee",
    "preview": "https://p.scdn.co/mp3-preview/d442dad9058e630ce9f778d1c390879d190b0221"
  },
  {
    "uri": "spotify:track:2Z8WuEywRWYTKe1NybPQEW",
    "title": "Ride",
    "artist": "Twenty One Pilots",
    "preview": "https://p.scdn.co/mp3-preview/b571ceecaadc03941bdf4e683ea26e4e6d3f7c17"
  },
  {
    "uri": "spotify:track:4fouWK6XVHhzl78KzQ1UjL",
    "title": "abcdefu",
    "artist": "GAYLE",
    "preview": "https://p.scdn.co/mp3-preview/42ebed4011e719bc978a39d8338d3133499d8e89"
  },
  {
    "uri": "spotify:track:27NovPIUIRrOZoCHxABJwK",
    "title": "INDUSTRY BABY (feat. Jack Harlow)",
    "artist": "Lil Nas X, Jack Harlow",
    "preview": "https://p.scdn.co/mp3-preview/54ec4be3d4710f882df7237e349c83849549dd99"
  },
  {
    "uri": "spotify:track:3CscS4sqTQcfoR8iEm2zQr",
    "title": "Uok",
    "artist": "Nasty C",
    "preview": "https://p.scdn.co/mp3-preview/750db1a8c2805c77aa64978cf03aed8f753a3159"
  },
  {
    "uri": "spotify:track:1iEYNd2YDWOEFF5BFrPmRJ",
    "title": "Desire",
    "artist": "DeJ Loaf",
    "preview": "https://p.scdn.co/mp3-preview/1ff4012512c970b0e9499f54f4fc9bd0d877323b"
  },
  {
    "uri": "spotify:track:5rEI52cUcqGXn1ZBGxQFQ2",
    "title": "Been On My Grind",
    "artist": "DeJ Loaf",
    "preview": "https://p.scdn.co/mp3-preview/9867ad794aa8145cdc81057fd367087288dd2a91"
  },
  {
    "uri": "spotify:track:1ISsiC4Fw6f96kZQegLGiJ",
    "title": "Oh Lord",
    "artist": "NF",
    "preview": "https://p.scdn.co/mp3-preview/b05c4b342324feba7da55af973510972f6877a0b"
  },
  {
    "uri": "spotify:track:1kO0nC4VnEjMBeJZI7g2T2",
    "title": "My Life",
    "artist": "NF",
    "preview": "https://p.scdn.co/mp3-preview/2e9b25e0f07699df1f7a6e189389ff4d139b6281"
  },
  {
    "uri": "spotify:track:3Yr0vIcfXq5MWdSDmZzKgk",
    "title": "Sunshine",
    "artist": "Asake",
    "preview": "https://p.scdn.co/mp3-preview/c02a48c1ed2ba71819fbbcdec99300f2d24ad721"
  },
  {
    "uri": "spotify:track:2CPKo4glbtzTZHZ9kheUaa",
    "title": "Talladega",
    "artist": "Nic D",
    "preview": "https://p.scdn.co/mp3-preview/43385978bc40d1639526634eb47eeacf28fa55ed"
  },
  {
    "uri": "spotify:track:5PdEiev2BkKiZtZFcNKjfM",
    "title": "Hate Myself",
    "artist": "NF",
    "preview": "https://p.scdn.co/mp3-preview/145d6483003ba43933464f2616ff0aa2f4e74039"
  },
  {
    "uri": "spotify:track:0RCgQNZ5SAjPukI3OXquFN",
    "title": "City of Angels",
    "artist": "gavn!",
    "preview": "https://p.scdn.co/mp3-preview/90324f82ea911f15d4bf62b50625aa8ee981b5a9"
  },
  {
    "uri": "spotify:track:1DoECePnMuLtpLQSCZqwtK",
    "title": "ill come back to you (feat. Sarcastic Sounds & Rxseboy)",
    "artist": "Powfu, Sarcastic Sounds, Rxseboy",
    "preview": "https://p.scdn.co/mp3-preview/c424cffb24c1a5950e928d6b988cdbfa7a5b0cbc"
  },
  {
    "uri": "spotify:track:7MN8RYSofZsFROBlEOAzXq",
    "title": "Past Life (with Selena Gomez)",
    "artist": "Trevor Daniel, Selena Gomez",
    "preview": "https://p.scdn.co/mp3-preview/f3c1247f067b62e4be6b37ffcd35cde79a0fef60"
  },
  {
    "uri": "spotify:track:5j2O2yeurM9fD2rgCPt7pD",
    "title": "Normal",
    "artist": "347aidan",
    "preview": "https://p.scdn.co/mp3-preview/3237b891011ffdfd9d191dcb1918cb9a64aa941e"
  },
  {
    "uri": "spotify:track:696DnlkuDOXcMAnKlTgXXK",
    "title": "ROXANNE",
    "artist": "Arizona Zervas",
    "preview": "https://p.scdn.co/mp3-preview/18dbed71a2ee41dec2edbecd76e2f67250675dc6"
  },
  {
    "uri": "spotify:track:6gOMC22VqEf8yWbFpJCfpC",
    "title": "Live Forever",
    "artist": "Kayode",
    "preview": "https://p.scdn.co/mp3-preview/61761b71cbad9001b430f32f276a3db9459ddf8d"
  },
  {
    "uri": "spotify:track:15og0pCEcTFWEXOFKdcJlU",
    "title": "Hate Me",
    "artist": "Ellie Goulding, Juice WRLD",
    "preview": "https://p.scdn.co/mp3-preview/8d53e9726efbc9a6c8acc1835476fd99d4f9b96b"
  }
];
