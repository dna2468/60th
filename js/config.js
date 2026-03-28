/**
 * サイト全体の設定ファイル
 */
const SITE_CONFIG = {
    // 3Dカルーセル画像
    carouselImages: [
        "images/carousel/01.jpg",
        "images/carousel/02.jpg",
        "images/carousel/03.jpg",
        "images/carousel/04.jpg",
        "images/carousel/05.jpg",
        "images/carousel/06.jpg",
        "images/carousel/07.png",
        "images/carousel/08.jpg"
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