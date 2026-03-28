/**
 * サイト全体の設定ファイル
 */
const SITE_CONFIG = {
    // 3Dカルーセル画像
    carouselImages: [
        "https://i.gyazo.com/7b3cf139b39d36ab37201fab1af70d08.jpg",
        "https://i.gyazo.com/97d6f85b69c33fbfb01b6d2a645685cb.jpg",
        "https://i.gyazo.com/3a7446c2216037a84fbd455d643cfac3.jpg",
        "https://i.gyazo.com/e084a288d16a3a3a2af666f0afe22257.jpg",
        "https://i.gyazo.com/b94b5321b8bec317c57fe45e4b7decd9.jpg",
        "https://i.gyazo.com/d98a211a9d565a8a005670ce5a29cbd1.jpg",
        "https://i.gyazo.com/00f66847cc8769ce3f945d57fcbb22e1.png",
        "https://i.gyazo.com/fc934236ebde36f761f36045e3f05792.jpg"
    ],

    autoSpeed: { pc: 0.1, sp: 0.08 },
    radius: { pc: 1150, sp: 500 },

    /* --- ご祝儀・協賛データ --- */
    
    // 現在の協賛金総額（手動更新）
    // ※スプレッドシートから読み取る場合は、main.jsでこの値を上書きするロジックを追加します
    totalAmount: 1580000, 

    // 特別協賛（ゴールド）リスト
    goldSponsors: [
        "株式会社〇〇不動産",
        "税理士法人 △△会計",
        "山田 太郎",
        "鈴木 一郎",
        "佐藤 花子",
        "株式会社 メイセイ建設"
    ],

    // 一般協賛（シルバー）リスト
    silverSponsors: [
        "田中 次郎", "高橋 三郎", "伊藤 四郎", "渡辺 五郎",
        "山本 六郎", "中村 七郎", "小林 八郎", "加藤 九郎",
        "吉田 十郎", "山田 一子", "佐々木 二子", "山口 三子",
        "松本 四子", "井上 五子", "木村 六子", "林 七子",
        "清水 八子", "山崎 九子", "池田 十子", "橋本 十一子"
    ]
};